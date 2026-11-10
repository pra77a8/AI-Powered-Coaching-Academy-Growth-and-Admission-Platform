-- Migration: 20261110000002_phase1_rls_policies.sql
-- Description: Multi-Tenant Row Level Security (RLS) policies for Phase 1
-- Authors: Senior Software Architect & Security Lead
-- Conformance: PHASE_1_FINAL_BASELINE.md, DEC-01, DEC-02, DEC-12, TSK-DB-002, security.md

-- ============================================================================
-- 1. Security Definer Helpers (Fixed search_path to prevent search_path poisoning)
-- ============================================================================

-- Helper A: Check if authenticated user has active membership in an institute
CREATE OR REPLACE FUNCTION public.has_active_membership(p_institute_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 
        FROM public.institute_memberships 
        WHERE user_id = auth.uid() 
          AND institute_id = p_institute_id 
          AND status = 'ACTIVE'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE SET search_path = public, pg_temp;

-- Helper B: Return table of institute IDs where authenticated caller has active membership
CREATE OR REPLACE FUNCTION public.get_user_institutes(p_user_id UUID)
RETURNS TABLE (institute_id UUID) AS $$
    SELECT m.institute_id 
    FROM public.institute_memberships m 
    WHERE m.user_id = p_user_id 
      AND m.status = 'ACTIVE';
$$ LANGUAGE sql SECURITY DEFINER STABLE SET search_path = public, pg_temp;

-- Helper C: Return caller's role in a specific institute
CREATE OR REPLACE FUNCTION public.get_user_role(p_user_id UUID, p_institute_id UUID)
RETURNS TEXT AS $$
    SELECT m.role 
    FROM public.institute_memberships m 
    WHERE m.user_id = p_user_id 
      AND m.institute_id = p_institute_id 
      AND m.status = 'ACTIVE'
    LIMIT 1;
$$ LANGUAGE sql SECURITY DEFINER STABLE SET search_path = public, pg_temp;

-- Revoke default public execute and grant only to authenticated role
REVOKE EXECUTE ON FUNCTION public.has_active_membership(UUID) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.has_active_membership(UUID) TO authenticated;

REVOKE EXECUTE ON FUNCTION public.get_user_institutes(UUID) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_user_institutes(UUID) TO authenticated;

REVOKE EXECUTE ON FUNCTION public.get_user_role(UUID, UUID) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_user_role(UUID, UUID) TO authenticated;

-- ============================================================================
-- 2. Enable RLS on all Six Core Tables
-- ============================================================================
ALTER TABLE public.institutes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.institute_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.institute_invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- 3. Policies for `institutes` Table
-- ============================================================================
DROP POLICY IF EXISTS rls_institutes_public_read ON public.institutes;
DROP POLICY IF EXISTS rls_institutes_member_select ON public.institutes;
DROP POLICY IF EXISTS rls_institutes_owner_update ON public.institutes;

-- A. Public can read basic institute profile by slug for the inquiry intake page (/inquire/[slug])
CREATE POLICY rls_institutes_public_read ON public.institutes
FOR SELECT
USING (true);

-- B. Members can view their full institute record
CREATE POLICY rls_institutes_member_select ON public.institutes
FOR SELECT
TO authenticated
USING (public.has_active_membership(id));

-- C. Only OWNER or ADMIN can update their institute profile
CREATE POLICY rls_institutes_owner_update ON public.institutes
FOR UPDATE
TO authenticated
USING (
    public.has_active_membership(id)
    AND public.get_user_role(auth.uid(), id) IN ('OWNER', 'ADMIN')
)
WITH CHECK (
    public.has_active_membership(id)
    AND public.get_user_role(auth.uid(), id) IN ('OWNER', 'ADMIN')
);

-- Note: Institute insertions are handled exclusively via the atomic RPC `create_institute_with_owner()`

-- ============================================================================
-- 4. Policies for `users` Profile Table
-- ============================================================================
DROP POLICY IF EXISTS rls_users_self_select ON public.users;
DROP POLICY IF EXISTS rls_users_self_update ON public.users;
DROP POLICY IF EXISTS rls_users_team_select ON public.users;

-- Users can view their own profile
CREATE POLICY rls_users_self_select ON public.users
FOR SELECT
TO authenticated
USING (id = auth.uid());

-- Users can update their own permitted profile fields (cannot change id or email)
CREATE POLICY rls_users_self_update ON public.users
FOR UPDATE
TO authenticated
USING (id = auth.uid())
WITH CHECK (id = auth.uid());

-- Institute members can view fellow team members' names and contact details within the same institute
CREATE POLICY rls_users_team_select ON public.users
FOR SELECT
TO authenticated
USING (
    id IN (
        SELECT m.user_id 
        FROM public.institute_memberships m 
        WHERE public.has_active_membership(m.institute_id)
    )
);

-- ============================================================================
-- 5. Policies for `institute_memberships` Table
-- ============================================================================
DROP POLICY IF EXISTS rls_memberships_select ON public.institute_memberships;
DROP POLICY IF EXISTS rls_memberships_insert ON public.institute_memberships;
DROP POLICY IF EXISTS rls_memberships_update ON public.institute_memberships;
DROP POLICY IF EXISTS rls_memberships_delete ON public.institute_memberships;

-- Active members can view team memberships of their own institute
CREATE POLICY rls_memberships_select ON public.institute_memberships
FOR SELECT
TO authenticated
USING (public.has_active_membership(institute_id));

-- Only OWNER or ADMIN can insert new team memberships
CREATE POLICY rls_memberships_insert ON public.institute_memberships
FOR INSERT
TO authenticated
WITH CHECK (
    public.has_active_membership(institute_id)
    AND public.get_user_role(auth.uid(), institute_id) IN ('OWNER', 'ADMIN')
);

-- Only OWNER can update membership roles or status
CREATE POLICY rls_memberships_update ON public.institute_memberships
FOR UPDATE
TO authenticated
USING (
    public.has_active_membership(institute_id)
    AND public.get_user_role(auth.uid(), institute_id) = 'OWNER'
)
WITH CHECK (
    public.has_active_membership(institute_id)
    AND public.get_user_role(auth.uid(), institute_id) = 'OWNER'
);

-- Only OWNER or ADMIN can remove team members (cannot delete OWNER)
CREATE POLICY rls_memberships_delete ON public.institute_memberships
FOR DELETE
TO authenticated
USING (
    public.has_active_membership(institute_id)
    AND public.get_user_role(auth.uid(), institute_id) IN ('OWNER', 'ADMIN')
    AND role != 'OWNER'
);

-- ============================================================================
-- 6. Policies for `institute_invitations` Table
-- ============================================================================
DROP POLICY IF EXISTS rls_invitations_select ON public.institute_invitations;
DROP POLICY IF EXISTS rls_invitations_insert ON public.institute_invitations;
DROP POLICY IF EXISTS rls_invitations_update ON public.institute_invitations;
DROP POLICY IF EXISTS rls_invitations_delete ON public.institute_invitations;

-- OWNER and ADMIN can view all invitations issued by their institute
CREATE POLICY rls_invitations_select ON public.institute_invitations
FOR SELECT
TO authenticated
USING (
    public.has_active_membership(institute_id)
    AND public.get_user_role(auth.uid(), institute_id) IN ('OWNER', 'ADMIN')
);

-- Only OWNER and ADMIN can issue new invitations for their institute
CREATE POLICY rls_invitations_insert ON public.institute_invitations
FOR INSERT
TO authenticated
WITH CHECK (
    public.has_active_membership(institute_id)
    AND public.get_user_role(auth.uid(), institute_id) IN ('OWNER', 'ADMIN')
    AND invited_by = auth.uid()
);

-- Only OWNER and ADMIN can revoke or update invitation status
CREATE POLICY rls_invitations_update ON public.institute_invitations
FOR UPDATE
TO authenticated
USING (
    public.has_active_membership(institute_id)
    AND public.get_user_role(auth.uid(), institute_id) IN ('OWNER', 'ADMIN')
)
WITH CHECK (
    public.has_active_membership(institute_id)
    AND public.get_user_role(auth.uid(), institute_id) IN ('OWNER', 'ADMIN')
);

-- Only OWNER can delete invitation records permanently
CREATE POLICY rls_invitations_delete ON public.institute_invitations
FOR DELETE
TO authenticated
USING (
    public.has_active_membership(institute_id)
    AND public.get_user_role(auth.uid(), institute_id) = 'OWNER'
);

-- ============================================================================
-- 7. Policies for `courses` Table
-- ============================================================================
DROP POLICY IF EXISTS rls_courses_public_select ON public.courses;
DROP POLICY IF EXISTS rls_courses_member_select ON public.courses;
DROP POLICY IF EXISTS rls_courses_owner_admin_insert ON public.courses;
DROP POLICY IF EXISTS rls_courses_owner_admin_update ON public.courses;
DROP POLICY IF EXISTS rls_courses_owner_admin_delete ON public.courses;

-- Public can view active courses on public inquiry landing pages (/inquire/[slug])
CREATE POLICY rls_courses_public_select ON public.courses
FOR SELECT
USING (is_active = true);

-- Active members of any role can view all courses (active and inactive) in their institute
CREATE POLICY rls_courses_member_select ON public.courses
FOR SELECT
TO authenticated
USING (public.has_active_membership(institute_id));

-- Only OWNER or ADMIN can insert courses
CREATE POLICY rls_courses_owner_admin_insert ON public.courses
FOR INSERT
TO authenticated
WITH CHECK (
    public.has_active_membership(institute_id)
    AND public.get_user_role(auth.uid(), institute_id) IN ('OWNER', 'ADMIN')
);

-- Only OWNER or ADMIN can update courses
CREATE POLICY rls_courses_owner_admin_update ON public.courses
FOR UPDATE
TO authenticated
USING (
    public.has_active_membership(institute_id)
    AND public.get_user_role(auth.uid(), institute_id) IN ('OWNER', 'ADMIN')
)
WITH CHECK (
    public.has_active_membership(institute_id)
    AND public.get_user_role(auth.uid(), institute_id) IN ('OWNER', 'ADMIN')
);

-- Only OWNER can delete courses
CREATE POLICY rls_courses_owner_delete ON public.courses
FOR DELETE
TO authenticated
USING (
    public.has_active_membership(institute_id)
    AND public.get_user_role(auth.uid(), institute_id) = 'OWNER'
);

-- ============================================================================
-- 8. Policies for `subscriptions` Table
-- ============================================================================
DROP POLICY IF EXISTS rls_subscriptions_owner_admin_select ON public.subscriptions;
DROP POLICY IF EXISTS rls_subscriptions_no_client_insert ON public.subscriptions;
DROP POLICY IF EXISTS rls_subscriptions_no_client_update ON public.subscriptions;
DROP POLICY IF EXISTS rls_subscriptions_no_client_delete ON public.subscriptions;

-- Only OWNER or ADMIN can view their institute's subscription status
CREATE POLICY rls_subscriptions_owner_admin_select ON public.subscriptions
FOR SELECT
TO authenticated
USING (
    public.has_active_membership(institute_id)
    AND public.get_user_role(auth.uid(), institute_id) IN ('OWNER', 'ADMIN')
);

-- Direct client modification of subscriptions is strictly prohibited.
-- Creation occurs in `create_institute_with_owner()` (SECURITY DEFINER).
-- Billing status updates occur via Razorpay Webhook Edge Functions with service role privileges.
