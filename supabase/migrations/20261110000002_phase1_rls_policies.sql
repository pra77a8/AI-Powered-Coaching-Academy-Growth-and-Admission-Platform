-- Migration: 20261110000002_phase1_rls_policies.sql
-- Description: Multi-Tenant Row Level Security (RLS) policies for Phase 1
-- Authors: Senior Software Architect & Security Lead

-- 1. Security Definer Helper: Return list of institutes caller belongs to
CREATE OR REPLACE FUNCTION public.get_user_institutes(p_user_id UUID)
RETURNS TABLE (institute_id UUID) AS $$
    SELECT m.institute_id 
    FROM public.institute_memberships m 
    WHERE m.user_id = p_user_id 
      AND m.status = 'ACTIVE';
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- 2. Security Definer Helper: Return caller's role in a specific institute
CREATE OR REPLACE FUNCTION public.get_user_role(p_user_id UUID, p_institute_id UUID)
RETURNS TEXT AS $$
    SELECT m.role 
    FROM public.institute_memberships m 
    WHERE m.user_id = p_user_id 
      AND m.institute_id = p_institute_id 
      AND m.status = 'ACTIVE'
    LIMIT 1;
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- ============================================================================
-- 3. Enable RLS on all Phase 1 Tables
-- ============================================================================
ALTER TABLE public.institutes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.institute_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- 4. Policies for `institutes` Table
-- ============================================================================
-- A. Public can read basic institute profile by slug for the inquiry intake page (/inquire/[slug])
CREATE POLICY rls_institutes_public_read ON public.institutes
FOR SELECT
USING (true);

-- B. Members can view their full institute record
CREATE POLICY rls_institutes_member_select ON public.institutes
FOR SELECT
TO authenticated
USING (id IN (SELECT get_user_institutes(auth.uid())));

-- C. Only OWNER or ADMIN can update their institute profile
CREATE POLICY rls_institutes_owner_update ON public.institutes
FOR UPDATE
TO authenticated
USING (
    id IN (SELECT get_user_institutes(auth.uid()))
    AND public.get_user_role(auth.uid(), id) IN ('OWNER', 'ADMIN')
);

-- Note: Institute insertions are handled via the atomic RPC `create_institute_with_owner()`

-- ============================================================================
-- 5. Policies for `users` Profile Table
-- ============================================================================
-- Users can view their own profile
CREATE POLICY rls_users_self_select ON public.users
FOR SELECT
TO authenticated
USING (id = auth.uid());

-- Users can update their own profile
CREATE POLICY rls_users_self_update ON public.users
FOR UPDATE
TO authenticated
USING (id = auth.uid());

-- Institute members can view fellow team members' names and emails
CREATE POLICY rls_users_team_select ON public.users
FOR SELECT
TO authenticated
USING (
    id IN (
        SELECT m.user_id 
        FROM public.institute_memberships m 
        WHERE m.institute_id IN (SELECT get_user_institutes(auth.uid()))
    )
);

-- ============================================================================
-- 6. Policies for `institute_memberships` Table
-- ============================================================================
-- Members can view team memberships of their own institute
CREATE POLICY rls_memberships_select ON public.institute_memberships
FOR SELECT
TO authenticated
USING (institute_id IN (SELECT get_user_institutes(auth.uid())));

-- Only OWNER or ADMIN can insert new team memberships (or service role)
CREATE POLICY rls_memberships_insert ON public.institute_memberships
FOR INSERT
TO authenticated
WITH CHECK (
    institute_id IN (SELECT get_user_institutes(auth.uid()))
    AND public.get_user_role(auth.uid(), institute_id) IN ('OWNER', 'ADMIN')
);

-- Only OWNER can update membership roles
CREATE POLICY rls_memberships_update ON public.institute_memberships
FOR UPDATE
TO authenticated
USING (
    institute_id IN (SELECT get_user_institutes(auth.uid()))
    AND public.get_user_role(auth.uid(), institute_id) = 'OWNER'
);

-- Only OWNER or ADMIN can delete/remove team members (cannot delete OWNER)
CREATE POLICY rls_memberships_delete ON public.institute_memberships
FOR DELETE
TO authenticated
USING (
    institute_id IN (SELECT get_user_institutes(auth.uid()))
    AND public.get_user_role(auth.uid(), institute_id) IN ('OWNER', 'ADMIN')
    AND role != 'OWNER'
);

-- ============================================================================
-- 7. Policies for `courses` Table
-- ============================================================================
-- Public can view active courses on the inquiry page
CREATE POLICY rls_courses_public_select ON public.courses
FOR SELECT
USING (is_active = true);

-- Members can view all courses in their institute
CREATE POLICY rls_courses_member_select ON public.courses
FOR SELECT
TO authenticated
USING (institute_id IN (SELECT get_user_institutes(auth.uid())));

-- Only OWNER or ADMIN can insert, update, or delete courses
CREATE POLICY rls_courses_owner_admin_all ON public.courses
FOR ALL
TO authenticated
USING (
    institute_id IN (SELECT get_user_institutes(auth.uid()))
    AND public.get_user_role(auth.uid(), institute_id) IN ('OWNER', 'ADMIN')
);

-- ============================================================================
-- 8. Policies for `subscriptions` Table
-- ============================================================================
-- Only OWNER or ADMIN can view their subscription status
CREATE POLICY rls_subscriptions_owner_select ON public.subscriptions
FOR SELECT
TO authenticated
USING (
    institute_id IN (SELECT get_user_institutes(auth.uid()))
    AND public.get_user_role(auth.uid(), institute_id) IN ('OWNER', 'ADMIN')
);

