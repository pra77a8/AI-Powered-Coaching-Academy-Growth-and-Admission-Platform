-- Migration: 20261110000002_phase1_rls_policies.sql
-- Description: Multi-Tenant Row Level Security (RLS) policies and security-definer helpers (Phase 1 Hardened)
-- Authors: Senior Software Architect & Security Lead
-- Conformance: PHASE_1_FINAL_BASELINE.md, DEC-01, DEC-02, DEC-12, TSK-DB-002, security.md

-- ============================================================================
-- 1. Security Definer Helpers (Caller-Scoped, Safe search_path)
-- ============================================================================

-- Helper A: Check if authenticated caller has active membership in an institute
CREATE OR REPLACE FUNCTION public.has_active_membership(p_institute_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    IF auth.uid() IS NULL THEN
        RETURN false;
    END IF;

    RETURN EXISTS (
        SELECT 1 
        FROM public.institute_memberships 
        WHERE user_id = auth.uid() 
          AND institute_id = p_institute_id 
          AND status = 'ACTIVE'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE SET search_path = public, pg_temp;

-- Helper B: Return institute IDs where authenticated caller has active membership (Caller-Scoped)
CREATE OR REPLACE FUNCTION public.get_my_institutes()
RETURNS TABLE (institute_id UUID) AS $$
    SELECT m.institute_id 
    FROM public.institute_memberships m 
    WHERE m.user_id = auth.uid() 
      AND m.status = 'ACTIVE';
$$ LANGUAGE sql SECURITY DEFINER STABLE SET search_path = public, pg_temp;

-- Helper C: Return caller's role in a specific institute (Caller-Scoped)
CREATE OR REPLACE FUNCTION public.get_my_role(p_institute_id UUID)
RETURNS TEXT AS $$
    SELECT m.role 
    FROM public.institute_memberships m 
    WHERE m.user_id = auth.uid() 
      AND m.institute_id = p_institute_id 
      AND m.status = 'ACTIVE'
    LIMIT 1;
$$ LANGUAGE sql SECURITY DEFINER STABLE SET search_path = public, pg_temp;

-- Permissions on Helper Functions: Revoke from PUBLIC & anon, grant strictly to authenticated
REVOKE ALL ON FUNCTION public.has_active_membership(UUID) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_active_membership(UUID) TO authenticated;

REVOKE ALL ON FUNCTION public.get_my_institutes() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_my_institutes() TO authenticated;

REVOKE ALL ON FUNCTION public.get_my_role(UUID) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_my_role(UUID) TO authenticated;

-- ============================================================================
-- 2. Public Read Functions for Prospective Student Inquiries (/inquire/[slug])
-- ============================================================================

-- Public RPC: Retrieve restricted public profile for inquiry page by vanity slug
CREATE OR REPLACE FUNCTION public.get_public_institute_by_slug(p_slug TEXT)
RETURNS TABLE (
    id UUID,
    name TEXT,
    slug TEXT,
    phone TEXT,
    city TEXT,
    state TEXT,
    logo_url TEXT
) AS $$
    SELECT i.id, i.name, i.slug, i.phone, i.city, i.state, i.logo_url
    FROM public.institutes i
    WHERE i.slug = lower(trim(p_slug));
$$ LANGUAGE sql SECURITY DEFINER STABLE SET search_path = public, pg_temp;

REVOKE ALL ON FUNCTION public.get_public_institute_by_slug(TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_public_institute_by_slug(TEXT) TO anon, authenticated;

-- Public RPC: Retrieve active courses for an institute inquiry form
CREATE OR REPLACE FUNCTION public.get_public_courses(p_institute_id UUID)
RETURNS TABLE (
    id UUID,
    institute_id UUID,
    name TEXT,
    exam_category TEXT,
    base_fee NUMERIC
) AS $$
    SELECT c.id, c.institute_id, c.name, c.exam_category, c.base_fee
    FROM public.courses c
    WHERE c.institute_id = p_institute_id
      AND c.is_active = true;
$$ LANGUAGE sql SECURITY DEFINER STABLE SET search_path = public, pg_temp;

REVOKE ALL ON FUNCTION public.get_public_courses(UUID) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_public_courses(UUID) TO anon, authenticated;

-- ============================================================================
-- 3. Enable RLS on all Six Core Tables
-- ============================================================================
ALTER TABLE public.institutes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.institute_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.institute_invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- 4. Policies for `institutes` Table
-- ============================================================================
DROP POLICY IF EXISTS rls_institutes_public_read ON public.institutes;
DROP POLICY IF EXISTS rls_institutes_member_select ON public.institutes;
DROP POLICY IF EXISTS rls_institutes_owner_update ON public.institutes;

-- A. Members can view their full institute record
CREATE POLICY rls_institutes_member_select ON public.institutes
FOR SELECT
TO authenticated
USING (public.has_active_membership(id));

-- B. Only OWNER or ADMIN can update their institute profile
CREATE POLICY rls_institutes_owner_update ON public.institutes
FOR UPDATE
TO authenticated
USING (
    public.has_active_membership(id)
    AND public.get_my_role(id) IN ('OWNER', 'ADMIN')
)
WITH CHECK (
    public.has_active_membership(id)
    AND public.get_my_role(id) IN ('OWNER', 'ADMIN')
);

-- Note: Anonymous users access public institute info strictly through `get_public_institute_by_slug(p_slug)`.
-- Institute insertions are handled exclusively via the atomic RPC `create_institute_with_owner()`.

-- ============================================================================
-- 5. Policies for `users` Profile Table
-- ============================================================================
DROP POLICY IF EXISTS rls_users_self_select ON public.users;
DROP POLICY IF EXISTS rls_users_self_update ON public.users;
DROP POLICY IF EXISTS rls_users_team_select ON public.users;

-- Users can view their own profile
CREATE POLICY rls_users_self_select ON public.users
FOR SELECT
TO authenticated
USING (id = auth.uid());

-- Users can update their own profile (immutable columns guarded by trigger trg_prevent_user_immutable_fields)
CREATE POLICY rls_users_self_update ON public.users
FOR UPDATE
TO authenticated
USING (id = auth.uid())
WITH CHECK (id = auth.uid());

-- Institute members can view fellow team members within shared active institutes
CREATE POLICY rls_users_team_select ON public.users
FOR SELECT
TO authenticated
USING (
    id IN (
        SELECT m.user_id 
        FROM public.institute_memberships m 
        WHERE m.institute_id IN (SELECT institute_id FROM public.get_my_institutes())
          AND m.status = 'ACTIVE'
    )
);

-- ============================================================================
-- 6. Policies for `institute_memberships` Table
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

-- OWNER or ADMIN can insert non-OWNER team members directly (OWNER creation is exclusively via create_institute_with_owner)
CREATE POLICY rls_memberships_insert ON public.institute_memberships
FOR INSERT
TO authenticated
WITH CHECK (
    public.has_active_membership(institute_id)
    AND public.get_my_role(institute_id) IN ('OWNER', 'ADMIN')
    AND role != 'OWNER'
    AND user_id != auth.uid()
);

-- Only an active OWNER can update membership roles or status, and cannot self-update role/status
CREATE POLICY rls_memberships_update ON public.institute_memberships
FOR UPDATE
TO authenticated
USING (
    public.has_active_membership(institute_id)
    AND public.get_my_role(institute_id) = 'OWNER'
    AND user_id != auth.uid()
)
WITH CHECK (
    public.has_active_membership(institute_id)
    AND public.get_my_role(institute_id) = 'OWNER'
    AND user_id != auth.uid()
);

-- Only an active OWNER can remove team members (cannot delete oneself, and cannot delete an OWNER)
CREATE POLICY rls_memberships_delete ON public.institute_memberships
FOR DELETE
TO authenticated
USING (
    public.has_active_membership(institute_id)
    AND public.get_my_role(institute_id) = 'OWNER'
    AND user_id != auth.uid()
    AND role != 'OWNER'
);

-- ============================================================================
-- 7. Policies for `institute_invitations` Table
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
    AND public.get_my_role(institute_id) IN ('OWNER', 'ADMIN')
);

-- Only OWNER and ADMIN can issue new invitations (cannot invite OWNER role)
CREATE POLICY rls_invitations_insert ON public.institute_invitations
FOR INSERT
TO authenticated
WITH CHECK (
    public.has_active_membership(institute_id)
    AND public.get_my_role(institute_id) IN ('OWNER', 'ADMIN')
    AND invited_by = auth.uid()
    AND role != 'OWNER'
);

-- Only OWNER and ADMIN can revoke or update invitation status
CREATE POLICY rls_invitations_update ON public.institute_invitations
FOR UPDATE
TO authenticated
USING (
    public.has_active_membership(institute_id)
    AND public.get_my_role(institute_id) IN ('OWNER', 'ADMIN')
)
WITH CHECK (
    public.has_active_membership(institute_id)
    AND public.get_my_role(institute_id) IN ('OWNER', 'ADMIN')
);

-- Only OWNER can delete invitation records permanently
CREATE POLICY rls_invitations_delete ON public.institute_invitations
FOR DELETE
TO authenticated
USING (
    public.has_active_membership(institute_id)
    AND public.get_my_role(institute_id) = 'OWNER'
);

-- ============================================================================
-- 8. Policies for `courses` Table
-- ============================================================================
DROP POLICY IF EXISTS rls_courses_public_select ON public.courses;
DROP POLICY IF EXISTS rls_courses_member_select ON public.courses;
DROP POLICY IF EXISTS rls_courses_owner_admin_insert ON public.courses;
DROP POLICY IF EXISTS rls_courses_owner_admin_update ON public.courses;
DROP POLICY IF EXISTS rls_courses_owner_admin_delete ON public.courses;

-- Active members of any role can view all courses in their institute
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
    AND public.get_my_role(institute_id) IN ('OWNER', 'ADMIN')
);

-- Only OWNER or ADMIN can update courses
CREATE POLICY rls_courses_owner_admin_update ON public.courses
FOR UPDATE
TO authenticated
USING (
    public.has_active_membership(institute_id)
    AND public.get_my_role(institute_id) IN ('OWNER', 'ADMIN')
)
WITH CHECK (
    public.has_active_membership(institute_id)
    AND public.get_my_role(institute_id) IN ('OWNER', 'ADMIN')
);

-- Only OWNER can delete courses
CREATE POLICY rls_courses_owner_delete ON public.courses
FOR DELETE
TO authenticated
USING (
    public.has_active_membership(institute_id)
    AND public.get_my_role(institute_id) = 'OWNER'
);

-- Note: Anonymous users view active courses strictly via `get_public_courses(p_institute_id)`.

-- ============================================================================
-- 9. Policies for `subscriptions` Table
-- ============================================================================
DROP POLICY IF EXISTS rls_subscriptions_owner_admin_select ON public.subscriptions;

-- Only OWNER or ADMIN can view their institute's subscription status
CREATE POLICY rls_subscriptions_owner_admin_select ON public.subscriptions
FOR SELECT
TO authenticated
USING (
    public.has_active_membership(institute_id)
    AND public.get_my_role(institute_id) IN ('OWNER', 'ADMIN')
);

-- Direct client modification of subscriptions is strictly prohibited.
-- No INSERT, UPDATE, or DELETE policies are granted to authenticated or anon clients.
-- Initial provisioning is handled by `create_institute_with_owner()` (SECURITY DEFINER).
-- Billing status updates occur via Razorpay Webhook Edge Functions using service-role privileges.
