-- Migration: 20261110000001_phase1_initial_schema.sql
-- Description: Core schema for Multi-Tenant Coaching Academy Growth Platform (Phase 1)
-- Authors: Senior Software Architect & Database Engineer
-- Conformance: PHASE_1_FINAL_BASELINE.md, DEC-01, DEC-02, DEC-12, TSK-DB-001, security.md

-- ============================================================================
-- 1. Institutes Table (Root Tenant Entity & Branch Hierarchy)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.institutes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    parent_institute_id UUID REFERENCES public.institutes(id) ON DELETE CASCADE, -- Extensible multi-branch hierarchy (DEC-12)
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
CREATE INDEX IF NOT EXISTS idx_institutes_parent ON public.institutes(parent_institute_id);

-- ============================================================================
-- 2. Public User Profiles Table (Synchronized with auth.users)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    phone TEXT,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);

-- Trigger: Automatically sync new auth.users into public.users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users (id, email, full_name)
    VALUES (
        NEW.id,
        lower(trim(NEW.email)),
        COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1))
    )
    ON CONFLICT (id) DO UPDATE 
    SET email = EXCLUDED.email,
        full_name = COALESCE(EXCLUDED.full_name, public.users.full_name),
        updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp;

REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Trigger: Guard user immutable fields (cannot modify id or email via client update)
CREATE OR REPLACE FUNCTION public.prevent_user_immutable_fields()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.id != OLD.id THEN
        RAISE EXCEPTION 'User ID is immutable.';
    END IF;
    IF lower(trim(NEW.email)) != lower(trim(OLD.email)) THEN
        RAISE EXCEPTION 'User email cannot be updated directly. Email is managed by authentication provider.';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp;

REVOKE ALL ON FUNCTION public.prevent_user_immutable_fields() FROM PUBLIC, anon, authenticated;

DROP TRIGGER IF EXISTS trg_prevent_user_immutable_fields ON public.users;
CREATE TRIGGER trg_prevent_user_immutable_fields
    BEFORE UPDATE ON public.users
    FOR EACH ROW EXECUTE FUNCTION public.prevent_user_immutable_fields();

-- ============================================================================
-- 3. Institute Memberships Table (Multi-Tenancy Join & RBAC)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.institute_memberships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    institute_id UUID NOT NULL REFERENCES public.institutes(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('OWNER', 'ADMIN', 'COUNSELLOR', 'MARKETER', 'FACULTY')),
    status TEXT NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'INVITED', 'SUSPENDED')),
    is_default BOOLEAN DEFAULT true NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    UNIQUE (institute_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_memberships_institute ON public.institute_memberships(institute_id);
CREATE INDEX IF NOT EXISTS idx_memberships_user ON public.institute_memberships(user_id);
CREATE INDEX IF NOT EXISTS idx_memberships_role ON public.institute_memberships(institute_id, role);

-- Concurrency-safe unique partial index enforcing single active OWNER workspace per user (DEC-02 MVP Rule)
CREATE UNIQUE INDEX IF NOT EXISTS idx_single_active_owner_per_user 
ON public.institute_memberships (user_id) 
WHERE role = 'OWNER' AND status = 'ACTIVE';

-- Invariant Trigger: Ensure institute always retains at least one active OWNER
CREATE OR REPLACE FUNCTION public.check_institute_owner_invariants()
RETURNS TRIGGER AS $$
DECLARE
    v_active_owners INTEGER;
BEGIN
    -- If demoting, suspending, or deleting an ACTIVE OWNER
    IF (TG_OP = 'DELETE' AND OLD.role = 'OWNER' AND OLD.status = 'ACTIVE') OR
       (TG_OP = 'UPDATE' AND OLD.role = 'OWNER' AND OLD.status = 'ACTIVE' AND (NEW.role != 'OWNER' OR NEW.status != 'ACTIVE')) THEN
       
        SELECT COUNT(*) INTO v_active_owners
        FROM public.institute_memberships
        WHERE institute_id = OLD.institute_id
          AND role = 'OWNER'
          AND status = 'ACTIVE'
          AND id != OLD.id;
          
        IF v_active_owners < 1 THEN
            RAISE EXCEPTION 'Cannot demote, suspend, or delete the last active OWNER of an institute.';
        END IF;
    END IF;

    IF TG_OP = 'DELETE' THEN
        RETURN OLD;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp;

REVOKE ALL ON FUNCTION public.check_institute_owner_invariants() FROM PUBLIC, anon, authenticated;

DROP TRIGGER IF EXISTS trg_institute_owner_invariants ON public.institute_memberships;
CREATE TRIGGER trg_institute_owner_invariants
    BEFORE UPDATE OR DELETE ON public.institute_memberships
    FOR EACH ROW EXECUTE FUNCTION public.check_institute_owner_invariants();

-- ============================================================================
-- 4. Employee Invitations Table (Secure Tokenized Onboarding)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.institute_invitations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    institute_id UUID NOT NULL REFERENCES public.institutes(id) ON DELETE CASCADE,
    invited_by UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('ADMIN', 'COUNSELLOR', 'MARKETER', 'FACULTY')),
    token TEXT UNIQUE NOT NULL,
    status TEXT NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'ACCEPTED', 'EXPIRED', 'REVOKED')),
    expires_at TIMESTAMPTZ NOT NULL DEFAULT (now() + INTERVAL '7 days'),
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_invitations_token ON public.institute_invitations(token);
CREATE INDEX IF NOT EXISTS idx_invitations_email ON public.institute_invitations(email);
CREATE INDEX IF NOT EXISTS idx_invitations_institute ON public.institute_invitations(institute_id);

-- ============================================================================
-- 5. Courses Table (Academic offerings per institute)
-- ============================================================================
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

-- ============================================================================
-- 6. Subscriptions Table (SaaS Entitlement per Institute)
-- ============================================================================
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

CREATE INDEX IF NOT EXISTS idx_subscriptions_institute ON public.subscriptions(institute_id);

-- ============================================================================
-- 7. Atomic Institute Creation RPC (DEC-01 & DEC-02 Conformance)
-- ============================================================================
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
    IF v_clean_slug IN ('admin', 'api', 'auth', 'login', 'signup', 'dashboard', 'inquire', 'pricing', 'terms', 'privacy', 'billing', 'contact', 'settings') THEN
        RAISE EXCEPTION 'The slug "%" is reserved for platform system routes.', v_clean_slug;
    END IF;

    -- Check if user already owns an active institute (DEC-02 MVP Rule, also backed by unique partial index)
    IF EXISTS (
        SELECT 1 FROM public.institute_memberships 
        WHERE user_id = v_user_id AND role = 'OWNER' AND status = 'ACTIVE'
    ) THEN
        RAISE EXCEPTION 'User already owns an active institute workspace.';
    END IF;

    -- Step 1: Insert Institute
    INSERT INTO public.institutes (name, slug, phone, city, state, logo_url)
    VALUES (trim(p_name), v_clean_slug, trim(p_phone), trim(p_city), trim(p_state), p_logo_url)
    RETURNING id INTO v_institute_id;

    -- Step 2: Bind Caller as OWNER
    INSERT INTO public.institute_memberships (institute_id, user_id, role, status, is_default)
    VALUES (v_institute_id, v_user_id, 'OWNER', 'ACTIVE', true);

    -- Step 3: Provision 14-Day Free Trial Subscription
    INSERT INTO public.subscriptions (
        institute_id, plan_tier, status, current_period_start, current_period_end, grace_until
    )
    VALUES (
        v_institute_id, 'STARTER', 'TRIAL', now(), now() + INTERVAL '14 days', now() + INTERVAL '21 days'
    );

    -- Step 4: Optionally provision initial course
    IF p_default_course IS NOT NULL AND length(trim(p_default_course)) > 0 THEN
        INSERT INTO public.courses (institute_id, name, exam_category, base_fee)
        VALUES (v_institute_id, trim(p_default_course), p_exam_category, 0.00);
    END IF;

    RETURN v_institute_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp;

REVOKE ALL ON FUNCTION public.create_institute_with_owner(TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.create_institute_with_owner(TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT) TO authenticated;

-- ============================================================================
-- 8. Hardened Employee Invitation Acceptance RPC
-- ============================================================================
CREATE OR REPLACE FUNCTION public.accept_employee_invitation(
    p_token TEXT
)
RETURNS UUID AS $$
DECLARE
    v_invitation RECORD;
    v_user_id UUID;
    v_user_email TEXT;
BEGIN
    v_user_id := auth.uid();
    IF v_user_id IS NULL THEN
        RAISE EXCEPTION 'Authentication required: caller must be an authenticated user.';
    END IF;

    -- Derive and normalize caller's authenticated email
    v_user_email := lower(trim(COALESCE(auth.jwt() ->> 'email', (SELECT email FROM public.users WHERE id = v_user_id))));
    IF v_user_email IS NULL OR length(v_user_email) = 0 THEN
        RAISE EXCEPTION 'Caller email could not be determined from authentication session.';
    END IF;

    -- Validate and lock invitation token using row-level locking
    SELECT * INTO v_invitation 
    FROM public.institute_invitations 
    WHERE token = trim(p_token)
      AND status = 'PENDING' 
      AND expires_at > now()
    FOR UPDATE;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Invalid, expired, or already accepted invitation token.';
    END IF;

    -- Strict email verification
    IF lower(trim(v_invitation.email)) != v_user_email THEN
        RAISE EXCEPTION 'Invitation email does not match authenticated user email.';
    END IF;

    -- Prevent accepting if already an active member of this institute
    IF EXISTS (
        SELECT 1 FROM public.institute_memberships 
        WHERE institute_id = v_invitation.institute_id 
          AND user_id = v_user_id 
          AND status = 'ACTIVE'
    ) THEN
        RAISE EXCEPTION 'User is already an active member of this institute.';
    END IF;

    -- Prevent overwriting or demoting an existing OWNER
    IF EXISTS (
        SELECT 1 FROM public.institute_memberships 
        WHERE institute_id = v_invitation.institute_id 
          AND user_id = v_user_id 
          AND role = 'OWNER'
    ) THEN
        RAISE EXCEPTION 'Cannot demote or overwrite an existing OWNER membership with an employee invitation.';
    END IF;

    -- Prevent an existing active OWNER from accepting an employee invitation to another institute (MVP Rule)
    IF EXISTS (
        SELECT 1 FROM public.institute_memberships 
        WHERE user_id = v_user_id 
          AND role = 'OWNER' 
          AND status = 'ACTIVE'
    ) THEN
        RAISE EXCEPTION 'User already owns an active institute workspace.';
    END IF;

    -- Create or update membership
    INSERT INTO public.institute_memberships (
        institute_id, user_id, role, status, is_default
    )
    VALUES (
        v_invitation.institute_id, v_user_id, v_invitation.role, 'ACTIVE', false
    )
    ON CONFLICT (institute_id, user_id) DO UPDATE
    SET role = EXCLUDED.role,
        status = 'ACTIVE',
        updated_at = now();

    -- Mark invitation as accepted atomically
    UPDATE public.institute_invitations
    SET status = 'ACCEPTED'
    WHERE id = v_invitation.id;

    RETURN v_invitation.institute_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp;

REVOKE ALL ON FUNCTION public.accept_employee_invitation(TEXT) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.accept_employee_invitation(TEXT) TO authenticated;

-- ============================================================================
-- 9. Dedicated Profile Update RPC (Safe Profile Self-Update)
-- ============================================================================
CREATE OR REPLACE FUNCTION public.update_my_profile(
    p_full_name TEXT,
    p_phone TEXT DEFAULT NULL
)
RETURNS public.users AS $$
DECLARE
    v_updated_user public.users;
BEGIN
    IF auth.uid() IS NULL THEN
        RAISE EXCEPTION 'Authentication required.';
    END IF;

    IF p_full_name IS NULL OR length(trim(p_full_name)) < 2 THEN
        RAISE EXCEPTION 'Full name must be at least 2 characters.';
    END IF;

    UPDATE public.users
    SET full_name = trim(p_full_name),
        phone = CASE WHEN p_phone IS NOT NULL AND length(trim(p_phone)) > 0 THEN trim(p_phone) ELSE NULL END,
        updated_at = now()
    WHERE id = auth.uid()
    RETURNING * INTO v_updated_user;

    RETURN v_updated_user;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp;

REVOKE ALL ON FUNCTION public.update_my_profile(TEXT, TEXT) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.update_my_profile(TEXT, TEXT) TO authenticated;
