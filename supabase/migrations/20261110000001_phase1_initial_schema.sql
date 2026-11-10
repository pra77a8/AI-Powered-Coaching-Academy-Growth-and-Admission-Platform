-- Migration: 20261110000001_phase1_initial_schema.sql
-- Description: Core schema for Multi-Tenant Coaching Academy Growth Platform (Phase 1)
-- Authors: Senior Software Architect & Database Engineer

-- 1. Institutes Table (Root Tenant Entity)
CREATE TABLE IF NOT EXISTS public.institutes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL CHECK (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$' AND length(slug) BETWEEN 3 AND 48),
    phone TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    logo_url TEXT,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Index for vanity slug lookups on public inquiry pages (/inquire/[slug])
CREATE INDEX IF NOT EXISTS idx_institutes_slug ON public.institutes(slug);

-- 2. Public User Profiles Table (Synchronized with auth.users)
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    phone TEXT,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Trigger: Automatically sync new auth.users into public.users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users (id, email, full_name)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1))
    )
    ON CONFLICT (id) DO UPDATE 
    SET email = EXCLUDED.email,
        full_name = COALESCE(EXCLUDED.full_name, public.users.full_name),
        updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 3. Institute Memberships Table (RBAC & Multi-Tenancy Join)
-- Note: Per DEC-02 for MVP, a user has exactly one active institute membership (UNIQUE(user_id))
CREATE TABLE IF NOT EXISTS public.institute_memberships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    institute_id UUID NOT NULL REFERENCES public.institutes(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('OWNER', 'ADMIN', 'COUNSELLOR', 'MARKETER', 'FACULTY')),
    status TEXT NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'INVITED', 'SUSPENDED')),
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    UNIQUE (user_id) -- Enforces 1 active institute per user account during MVP
);

CREATE INDEX IF NOT EXISTS idx_memberships_institute ON public.institute_memberships(institute_id);
CREATE INDEX IF NOT EXISTS idx_memberships_user ON public.institute_memberships(user_id);

-- 4. Courses Table (Academic offerings per institute)
CREATE TABLE IF NOT EXISTS public.courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    institute_id UUID NOT NULL REFERENCES public.institutes(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    exam_category TEXT NOT NULL CHECK (exam_category IN ('JEE', 'NEET', 'MHT_CET', 'UPSC', 'FOUNDATION', 'OTHER')),
    base_fee NUMERIC(10,2) NOT NULL DEFAULT 0.00 CHECK (base_fee >= 0),
    is_active BOOLEAN DEFAULT true NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_courses_institute ON public.courses(institute_id);

-- 5. Subscriptions Table (SaaS Entitlement per Institute)
CREATE TABLE IF NOT EXISTS public.subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    institute_id UUID UNIQUE NOT NULL REFERENCES public.institutes(id) ON DELETE CASCADE,
    plan_tier TEXT NOT NULL DEFAULT 'STARTER' CHECK (plan_tier IN ('STARTER', 'GROWTH', 'PROFESSIONAL')),
    razorpay_subscription_id TEXT UNIQUE,
    status TEXT NOT NULL DEFAULT 'TRIAL' CHECK (status IN ('TRIAL', 'ACTIVE', 'PAST_DUE', 'RESTRICTED', 'CANCELLED')),
    current_period_start TIMESTAMPTZ NOT NULL DEFAULT now(),
    current_period_end TIMESTAMPTZ NOT NULL DEFAULT (now() + INTERVAL '14 days'),
    grace_until TIMESTAMPTZ DEFAULT (now() + INTERVAL '21 days'),
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 6. Atomic Institute Creation RPC (Prevents Orphaned Institute Records)
CREATE OR REPLACE FUNCTION public.create_institute_with_owner(
    p_name TEXT,
    p_slug TEXT,
    p_phone TEXT,
    p_city TEXT,
    p_state TEXT,
    p_logo_url TEXT DEFAULT NULL,
    p_default_course TEXT DEFAULT NULL,
    p_exam_category TEXT DEFAULT 'OTHER'
)
RETURNS UUID AS $$
DECLARE
    v_institute_id UUID;
    v_user_id UUID;
    v_clean_slug TEXT;
BEGIN
    v_user_id := auth.uid();
    IF v_user_id IS NULL THEN
        RAISE EXCEPTION 'Authentication required: caller must be an authenticated user.';
    END IF;

    -- Clean and validate slug
    v_clean_slug := lower(trim(p_slug));
    IF v_clean_slug IN ('admin', 'api', 'auth', 'login', 'signup', 'dashboard', 'inquire', 'pricing', 'terms', 'privacy', 'billing', 'contact') THEN
        RAISE EXCEPTION 'The slug % is reserved for platform system routes.', v_clean_slug;
    END IF;

    -- Check if user already owns an institute
    IF EXISTS (SELECT 1 FROM public.institute_memberships WHERE user_id = v_user_id) THEN
        RAISE EXCEPTION 'User already has an active institute workspace.';
    END IF;

    -- Step 1: Insert Institute
    INSERT INTO public.institutes (name, slug, phone, city, state, logo_url)
    VALUES (p_name, v_clean_slug, p_phone, p_city, p_state, p_logo_url)
    RETURNING id INTO v_institute_id;

    -- Step 2: Bind Caller as OWNER
    INSERT INTO public.institute_memberships (institute_id, user_id, role, status)
    VALUES (v_institute_id, v_user_id, 'OWNER', 'ACTIVE');

    -- Step 3: Provision 14-Day Free Trial Subscription
    INSERT INTO public.subscriptions (
        institute_id, plan_tier, status, current_period_start, current_period_end, grace_until
    )
    VALUES (
        v_institute_id, 'STARTER', 'TRIAL', now(), now() + INTERVAL '14 days', now() + INTERVAL '21 days'
    );

    -- Step 4: Optionally provision first initial course
    IF p_default_course IS NOT NULL AND length(trim(p_default_course)) > 0 THEN
        INSERT INTO public.courses (institute_id, name, exam_category, base_fee)
        VALUES (v_institute_id, trim(p_default_course), p_exam_category, 0.00);
    END IF;

    RETURN v_institute_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

