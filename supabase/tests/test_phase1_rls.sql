-- ============================================================================
-- Test Suite: test_phase1_rls.sql
-- Description: Rigorous End-to-End Automated SQL Verification for Phase 1 RLS & Security Hardening
-- Conformance: TSK-DB-002, security.md, PHASE_1_FINAL_BASELINE.md
-- ============================================================================

BEGIN;

-- ----------------------------------------------------------------------------
-- 0. Fixtures Setup (Executed under administrative privileges)
-- ----------------------------------------------------------------------------
DO $$
DECLARE
    v_user_a_owner UUID := '11111111-1111-4111-8111-111111111111';
    v_user_a_counsellor UUID := '22222222-2222-4222-8222-222222222222';
    v_user_a_suspended UUID := '33333333-3333-4333-8333-333333333333';
    v_user_b_owner UUID := '44444444-4444-4444-8444-444444444444';
    v_user_invitee UUID := '55555555-5555-4555-8555-555555555555';
    v_user_wrong_email UUID := '66666666-6666-4666-8666-666666666666';
    v_user_unverified UUID := '77777777-7777-4777-8777-777777777777';

    v_inst_a UUID := 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';
    v_inst_b UUID := 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb';

    v_course_a UUID := 'caaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';
    v_course_b UUID := 'cbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb';

    v_inv_pending UUID := 'eaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';
    v_inv_expired UUID := 'ebbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb';
BEGIN
    RAISE NOTICE 'Setting up test fixtures...';

    -- Insert mock auth.users with verified and unverified email states
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'auth' AND table_name = 'users') THEN
        INSERT INTO auth.users (id, email, email_confirmed_at, raw_user_meta_data) VALUES
        (v_user_a_owner, 'owner_a@academy.com', now(), '{"full_name": "Owner Alpha"}'::jsonb),
        (v_user_a_counsellor, 'counsellor_a@academy.com', now(), '{"full_name": "Counsellor Alpha"}'::jsonb),
        (v_user_a_suspended, 'suspended_a@academy.com', now(), '{"full_name": "Suspended Alpha"}'::jsonb),
        (v_user_b_owner, 'owner_b@academy.com', now(), '{"full_name": "Owner Beta"}'::jsonb),
        (v_user_invitee, 'invitee@academy.com', now(), '{"full_name": "Invited Employee"}'::jsonb),
        (v_user_wrong_email, 'wrong@academy.com', now(), '{"full_name": "Wrong Email Employee"}'::jsonb),
        (v_user_unverified, 'invitee@academy.com', NULL, '{"full_name": "Unverified Employee"}'::jsonb)
        ON CONFLICT (id) DO NOTHING;
    END IF;

    -- Ensure public.users are present
    INSERT INTO public.users (id, email, full_name, phone) VALUES
    (v_user_a_owner, 'owner_a@academy.com', 'Owner Alpha', '9876543210'),
    (v_user_a_counsellor, 'counsellor_a@academy.com', 'Counsellor Alpha', '9876543211'),
    (v_user_a_suspended, 'suspended_a@academy.com', 'Suspended Alpha', '9876543212'),
    (v_user_b_owner, 'owner_b@academy.com', 'Owner Beta', '9876543213'),
    (v_user_invitee, 'invitee@academy.com', 'Invited Employee', '9876543214'),
    (v_user_wrong_email, 'wrong@academy.com', 'Wrong Email Employee', '9876543215'),
    (v_user_unverified, 'unverified@academy.com', 'Unverified Employee', '9876543216')
    ON CONFLICT (id) DO NOTHING;

    -- Create Institutes
    INSERT INTO public.institutes (id, name, slug, phone, city, state) VALUES
    (v_inst_a, 'Academy Alpha', 'academy-alpha', '9876543210', 'Pune', 'Maharashtra'),
    (v_inst_b, 'Academy Beta', 'academy-beta', '9876543211', 'Kota', 'Rajasthan')
    ON CONFLICT (id) DO NOTHING;

    -- Create Memberships
    INSERT INTO public.institute_memberships (institute_id, user_id, role, status, is_default) VALUES
    (v_inst_a, v_user_a_owner, 'OWNER', 'ACTIVE', true),
    (v_inst_a, v_user_a_counsellor, 'COUNSELLOR', 'ACTIVE', false),
    (v_inst_a, v_user_a_suspended, 'FACULTY', 'SUSPENDED', false),
    (v_inst_b, v_user_b_owner, 'OWNER', 'ACTIVE', true)
    ON CONFLICT (institute_id, user_id) DO NOTHING;

    -- Create Courses
    INSERT INTO public.courses (id, institute_id, name, exam_category, base_fee, is_active) VALUES
    (v_course_a, v_inst_a, 'JEE Advanced Masterclass', 'JEE', 85000.00, true),
    (v_course_b, v_inst_b, 'NEET Dropper FastTrack', 'NEET', 95000.00, true)
    ON CONFLICT (id) DO NOTHING;

    -- Create Subscriptions
    INSERT INTO public.subscriptions (institute_id, plan_tier, status) VALUES
    (v_inst_a, 'PROFESSIONAL', 'ACTIVE'),
    (v_inst_b, 'STARTER', 'TRIAL')
    ON CONFLICT (institute_id) DO NOTHING;

    -- Create Invitations
    INSERT INTO public.institute_invitations (id, institute_id, invited_by, email, role, token, status, expires_at) VALUES
    (v_inv_pending, v_inst_a, v_user_a_owner, 'invitee@academy.com', 'COUNSELLOR', 'token_valid_alpha', 'PENDING', now() + INTERVAL '3 days'),
    (v_inv_expired, v_inst_a, v_user_a_owner, 'invitee@academy.com', 'COUNSELLOR', 'token_expired_alpha', 'PENDING', now() - INTERVAL '1 day')
    ON CONFLICT (id) DO NOTHING;

    RAISE NOTICE 'Test fixtures created successfully.';
END $$;

-- ----------------------------------------------------------------------------
-- Scenario 1: Anonymous Access Verification
-- ----------------------------------------------------------------------------
DO $$
DECLARE
    v_inst_count INTEGER;
    v_course_count INTEGER;
    v_sub_count INTEGER;
    v_pub_name TEXT;
    v_pub_course_count INTEGER;
BEGIN
    RAISE NOTICE '--- Test 1: Anonymous Read & Restriction ---';

    -- Direct table access as anonymous (auth.uid() IS NULL)
    PERFORM set_config('role', 'anon', true);
    PERFORM set_config('request.jwt.claim.sub', '', true);
    PERFORM set_config('request.jwt.claims', '{}', true);

    -- Base table institutes should return 0 rows
    SELECT count(*) INTO v_inst_count FROM public.institutes;
    IF v_inst_count != 0 THEN
        RAISE EXCEPTION 'TEST 1 FAILED: Anonymous user should NOT read public.institutes table directly. Found: %', v_inst_count;
    END IF;

    -- Base table courses should return 0 rows
    SELECT count(*) INTO v_course_count FROM public.courses;
    IF v_course_count != 0 THEN
        RAISE EXCEPTION 'TEST 1 FAILED: Anonymous user should NOT read public.courses table directly. Found: %', v_course_count;
    END IF;

    -- Subscriptions must return 0 rows
    SELECT count(*) INTO v_sub_count FROM public.subscriptions;
    IF v_sub_count != 0 THEN
        RAISE EXCEPTION 'TEST 1 FAILED: Anonymous user read subscriptions!';
    END IF;

    -- Public RPC by slug must return the restricted public profile
    SELECT name INTO v_pub_name FROM public.get_public_institute_by_slug('academy-alpha');
    IF v_pub_name != 'Academy Alpha' THEN
        RAISE EXCEPTION 'TEST 1 FAILED: get_public_institute_by_slug failed to return public profile.';
    END IF;

    -- Public RPC for courses must return active courses
    SELECT count(*) INTO v_pub_course_count 
    FROM public.get_public_courses('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa');
    IF v_pub_course_count != 1 THEN
        RAISE EXCEPTION 'TEST 1 FAILED: get_public_courses should return 1 active course for Inst A.';
    END IF;

    RAISE NOTICE 'TEST 1 PASSED: Anonymous access properly restricted and public RPCs functional.';
END $$;

-- ----------------------------------------------------------------------------
-- Scenario 2: Cross-Tenant Isolation
-- ----------------------------------------------------------------------------
DO $$
DECLARE
    v_user_b_owner UUID := '44444444-4444-4444-8444-444444444444';
    v_inst_a UUID := 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';
    v_inst_b UUID := 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb';
    v_course_count INTEGER;
    v_inv_count INTEGER;
    v_sub_count INTEGER;
    v_mem_count INTEGER;
BEGIN
    RAISE NOTICE '--- Test 2: Cross-Tenant Isolation ---';

    -- Simulate Owner of Institute B
    PERFORM set_config('role', 'authenticated', true);
    PERFORM set_config('request.jwt.claim.sub', v_user_b_owner::text, true);
    PERFORM set_config('request.jwt.claim.email', 'owner_b@academy.com', true);
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_user_b_owner::text, 'email', 'owner_b@academy.com')::text, true);

    -- Check course access
    SELECT count(*) INTO v_course_count FROM public.courses WHERE institute_id = v_inst_a;
    IF v_course_count > 0 THEN
        RAISE EXCEPTION 'TEST 2 FAILED: User B saw Institute A courses!';
    END IF;

    -- Check invitations access
    SELECT count(*) INTO v_inv_count FROM public.institute_invitations WHERE institute_id = v_inst_a;
    IF v_inv_count > 0 THEN
        RAISE EXCEPTION 'TEST 2 FAILED: User B saw Institute A invitations!';
    END IF;

    -- Check subscription access
    SELECT count(*) INTO v_sub_count FROM public.subscriptions WHERE institute_id = v_inst_a;
    IF v_sub_count > 0 THEN
        RAISE EXCEPTION 'TEST 2 FAILED: User B saw Institute A subscription!';
    END IF;

    -- Check membership access
    SELECT count(*) INTO v_mem_count FROM public.institute_memberships WHERE institute_id = v_inst_a;
    IF v_mem_count > 0 THEN
        RAISE EXCEPTION 'TEST 2 FAILED: User B saw Institute A memberships!';
    END IF;

    RAISE NOTICE 'TEST 2 PASSED: Cross-tenant isolation strictly enforced.';
END $$;

-- ----------------------------------------------------------------------------
-- Scenario 3: Role Boundary Enforcement (Counsellor vs Owner)
-- ----------------------------------------------------------------------------
DO $$
DECLARE
    v_counsellor UUID := '22222222-2222-4222-8222-222222222222';
    v_inst_a UUID := 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';
    v_course_a UUID := 'caaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';
    v_sub_count INTEGER;
    v_inv_count INTEGER;
    v_failed BOOLEAN;
BEGIN
    RAISE NOTICE '--- Test 3: Role Boundary Enforcement ---';

    -- Simulate Counsellor in Institute A
    PERFORM set_config('role', 'authenticated', true);
    PERFORM set_config('request.jwt.claim.sub', v_counsellor::text, true);
    PERFORM set_config('request.jwt.claim.email', 'counsellor_a@academy.com', true);
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_counsellor::text, 'email', 'counsellor_a@academy.com')::text, true);

    -- 1. Counsellor cannot view subscriptions
    SELECT count(*) INTO v_sub_count FROM public.subscriptions WHERE institute_id = v_inst_a;
    IF v_sub_count > 0 THEN
        RAISE EXCEPTION 'TEST 3 FAILED: Counsellor should not view subscriptions.';
    END IF;

    -- 2. Counsellor cannot view invitations
    SELECT count(*) INTO v_inv_count FROM public.institute_invitations WHERE institute_id = v_inst_a;
    IF v_inv_count > 0 THEN
        RAISE EXCEPTION 'TEST 3 FAILED: Counsellor should not view invitations.';
    END IF;

    -- 3. Counsellor cannot update courses
    v_failed := false;
    BEGIN
        UPDATE public.courses SET base_fee = 100.00 WHERE id = v_course_a;
        -- If update affected rows
        IF FOUND THEN
            v_failed := true;
        END IF;
    EXCEPTION WHEN OTHERS THEN
        v_failed := false;
    END;

    IF v_failed THEN
        RAISE EXCEPTION 'TEST 3 FAILED: Counsellor was able to update courses!';
    END IF;

    RAISE NOTICE 'TEST 3 PASSED: Role boundaries strictly prevent unauthorized operations.';
END $$;

-- ----------------------------------------------------------------------------
-- Scenario 4: Suspended User Has Zero Access
-- ----------------------------------------------------------------------------
DO $$
DECLARE
    v_suspended UUID := '33333333-3333-4333-8333-333333333333';
    v_inst_a UUID := 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';
    v_count INTEGER;
BEGIN
    RAISE NOTICE '--- Test 4: Suspended Member Zero Access ---';

    PERFORM set_config('role', 'authenticated', true);
    PERFORM set_config('request.jwt.claim.sub', v_suspended::text, true);
    PERFORM set_config('request.jwt.claim.email', 'suspended_a@academy.com', true);
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_suspended::text, 'email', 'suspended_a@academy.com')::text, true);

    -- Helper returns false
    IF public.has_active_membership(v_inst_a) THEN
        RAISE EXCEPTION 'TEST 4 FAILED: Suspended member returned active membership.';
    END IF;

    -- Courses select returns 0 rows
    SELECT count(*) INTO v_count FROM public.courses WHERE institute_id = v_inst_a;
    IF v_count > 0 THEN
        RAISE EXCEPTION 'TEST 4 FAILED: Suspended member accessed courses!';
    END IF;

    -- Memberships select returns 0 rows
    SELECT count(*) INTO v_count FROM public.institute_memberships WHERE institute_id = v_inst_a;
    IF v_count > 0 THEN
        RAISE EXCEPTION 'TEST 4 FAILED: Suspended member accessed memberships!';
    END IF;

    RAISE NOTICE 'TEST 4 PASSED: Suspended member completely isolated.';
END $$;

-- ----------------------------------------------------------------------------
-- Scenario 5: Membership Privilege Escalation Prevention
-- ----------------------------------------------------------------------------
DO $$
DECLARE
    v_counsellor UUID := '22222222-2222-4222-8222-222222222222';
    v_user_invitee UUID := '55555555-5555-4555-8555-555555555555';
    v_inst_a UUID := 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';
    v_escalated BOOLEAN := false;
BEGIN
    RAISE NOTICE '--- Test 5: Membership Privilege Escalation Prevention ---';

    PERFORM set_config('role', 'authenticated', true);
    PERFORM set_config('request.jwt.claim.sub', v_counsellor::text, true);
    PERFORM set_config('request.jwt.claim.email', 'counsellor_a@academy.com', true);
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_counsellor::text, 'email', 'counsellor_a@academy.com')::text, true);

    -- 1. Counsellor tries to insert another member as OWNER
    BEGIN
        INSERT INTO public.institute_memberships (institute_id, user_id, role, status)
        VALUES (v_inst_a, v_user_invitee, 'OWNER', 'ACTIVE');
        v_escalated := true;
    EXCEPTION WHEN OTHERS THEN
        v_escalated := false;
    END;

    IF v_escalated THEN
        RAISE EXCEPTION 'TEST 5 FAILED: Non-owner created an OWNER membership!';
    END IF;

    -- 2. Counsellor tries to promote themselves to OWNER
    BEGIN
        UPDATE public.institute_memberships 
        SET role = 'OWNER' 
        WHERE user_id = v_counsellor AND institute_id = v_inst_a;
        
        IF FOUND THEN
            v_escalated := true;
        END IF;
    EXCEPTION WHEN OTHERS THEN
        v_escalated := false;
    END;

    IF v_escalated THEN
        RAISE EXCEPTION 'TEST 5 FAILED: Counsellor self-promoted to OWNER!';
    END IF;

    RAISE NOTICE 'TEST 5 PASSED: Membership privilege escalation successfully blocked.';
END $$;

-- ----------------------------------------------------------------------------
-- Scenario 6: Demoting or Deleting Last Active Owner is Rejected
-- ----------------------------------------------------------------------------
DO $$
DECLARE
    v_owner_a UUID := '11111111-1111-4111-8111-111111111111';
    v_inst_a UUID := 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';
    v_exception_caught BOOLEAN := false;
BEGIN
    RAISE NOTICE '--- Test 6: Invariant Guard on Last Active Owner ---';

    -- Test demotion via trigger check
    BEGIN
        UPDATE public.institute_memberships 
        SET role = 'ADMIN' 
        WHERE user_id = v_owner_a AND institute_id = v_inst_a;
    EXCEPTION WHEN OTHERS THEN
        v_exception_caught := true;
    END;

    IF NOT v_exception_caught THEN
        RAISE EXCEPTION 'TEST 6 FAILED: Demoting the last active OWNER did not raise an exception!';
    END IF;

    -- Test deletion via trigger check
    v_exception_caught := false;
    BEGIN
        DELETE FROM public.institute_memberships 
        WHERE user_id = v_owner_a AND institute_id = v_inst_a;
    EXCEPTION WHEN OTHERS THEN
        v_exception_caught := true;
    END;

    IF NOT v_exception_caught THEN
        RAISE EXCEPTION 'TEST 6 FAILED: Deleting the last active OWNER did not raise an exception!';
    END IF;

    RAISE NOTICE 'TEST 6 PASSED: Invariants protect the last active OWNER from demotion/deletion.';
END $$;

-- ----------------------------------------------------------------------------
-- Scenario 7: Invitation Acceptance Security
-- ----------------------------------------------------------------------------
DO $$
DECLARE
    v_user_invitee UUID := '55555555-5555-4555-8555-555555555555';
    v_user_wrong_email UUID := '66666666-6666-4666-8666-666666666666';
    v_user_unverified UUID := '77777777-7777-4777-8777-777777777777';
    v_user_a_owner UUID := '11111111-1111-4111-8111-111111111111';
    v_inst_result UUID;
    v_exception_caught BOOLEAN := false;
BEGIN
    RAISE NOTICE '--- Test 7: Invitation Acceptance Security ---';

    -- 1. Unverified email user cannot accept invitation (even if email string matches)
    PERFORM set_config('role', 'authenticated', true);
    PERFORM set_config('request.jwt.claim.sub', v_user_unverified::text, true);
    PERFORM set_config('request.jwt.claim.email', 'invitee@academy.com', true);
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_user_unverified::text, 'email', 'invitee@academy.com')::text, true);

    BEGIN
        v_inst_result := public.accept_employee_invitation('token_valid_alpha');
    EXCEPTION WHEN OTHERS THEN
        v_exception_caught := true;
    END;

    IF NOT v_exception_caught THEN
        RAISE EXCEPTION 'TEST 7 FAILED: Unverified email user accepted an invitation!';
    END IF;

    -- 2. Mismatched email cannot accept invitation
    PERFORM set_config('role', 'authenticated', true);
    PERFORM set_config('request.jwt.claim.sub', v_user_wrong_email::text, true);
    PERFORM set_config('request.jwt.claim.email', 'wrong@academy.com', true);
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_user_wrong_email::text, 'email', 'wrong@academy.com')::text, true);

    v_exception_caught := false;
    BEGIN
        v_inst_result := public.accept_employee_invitation('token_valid_alpha');
    EXCEPTION WHEN OTHERS THEN
        v_exception_caught := true;
    END;

    IF NOT v_exception_caught THEN
        RAISE EXCEPTION 'TEST 7 FAILED: Mismatched email accepted an invitation!';
    END IF;

    -- 3. Expired invitation cannot be accepted
    PERFORM set_config('request.jwt.claim.sub', v_user_invitee::text, true);
    PERFORM set_config('request.jwt.claim.email', 'invitee@academy.com', true);
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_user_invitee::text, 'email', 'invitee@academy.com')::text, true);

    v_exception_caught := false;
    BEGIN
        v_inst_result := public.accept_employee_invitation('token_expired_alpha');
    EXCEPTION WHEN OTHERS THEN
        v_exception_caught := true;
    END;

    IF NOT v_exception_caught THEN
        RAISE EXCEPTION 'TEST 7 FAILED: Expired invitation was accepted!';
    END IF;

    -- 4. Valid invitation acceptance succeeds for verified user
    v_inst_result := public.accept_employee_invitation('token_valid_alpha');
    IF v_inst_result != 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa' THEN
        RAISE EXCEPTION 'TEST 7 FAILED: Valid invitation returned unexpected institute ID.';
    END IF;

    -- 5. Replay attack / double-acceptance is blocked
    v_exception_caught := false;
    BEGIN
        v_inst_result := public.accept_employee_invitation('token_valid_alpha');
    EXCEPTION WHEN OTHERS THEN
        v_exception_caught := true;
    END;

    IF NOT v_exception_caught THEN
        RAISE EXCEPTION 'TEST 7 FAILED: Replay of accepted invitation token was permitted!';
    END IF;

    RAISE NOTICE 'TEST 7 PASSED: Invitation acceptance hardened against tampering and re-use.';
END $$;

-- ----------------------------------------------------------------------------
-- Scenario 8: Concurrent/Duplicate Owner Creation Blocked
-- ----------------------------------------------------------------------------
DO $$
DECLARE
    v_user_a_owner UUID := '11111111-1111-4111-8111-111111111111';
    v_inst_extra UUID := 'cccccccc-cccc-4ccc-8ccc-cccccccccccc';
    v_exception_caught BOOLEAN := false;
BEGIN
    RAISE NOTICE '--- Test 8: Single Active Owner Enforcement ---';

    -- Direct insert of a 2nd active OWNER membership for the same user
    BEGIN
        INSERT INTO public.institute_memberships (institute_id, user_id, role, status)
        VALUES (v_inst_extra, v_user_a_owner, 'OWNER', 'ACTIVE');
    EXCEPTION WHEN OTHERS THEN
        v_exception_caught := true;
    END;

    IF NOT v_exception_caught THEN
        RAISE EXCEPTION 'TEST 8 FAILED: Partial unique index failed to block duplicate active OWNER membership!';
    END IF;

    -- RPC create_institute_with_owner also rejects when user already owns an institute
    PERFORM set_config('role', 'authenticated', true);
    PERFORM set_config('request.jwt.claim.sub', v_user_a_owner::text, true);
    PERFORM set_config('request.jwt.claim.email', 'owner_a@academy.com', true);
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_user_a_owner::text, 'email', 'owner_a@academy.com')::text, true);

    v_exception_caught := false;
    BEGIN
        PERFORM public.create_institute_with_owner('Second Academy', 'second-academy', '9876543219', 'Mumbai', 'Maharashtra');
    EXCEPTION WHEN OTHERS THEN
        v_exception_caught := true;
    END;

    IF NOT v_exception_caught THEN
        RAISE EXCEPTION 'TEST 8 FAILED: create_institute_with_owner allowed duplicate active owner!';
    END IF;

    RAISE NOTICE 'TEST 8 PASSED: Single active owner rule strictly enforced.';
END $$;

-- ----------------------------------------------------------------------------
-- Scenario 9: User Profile Immutable Fields Guard
-- ----------------------------------------------------------------------------
DO $$
DECLARE
    v_user_a_owner UUID := '11111111-1111-4111-8111-111111111111';
    v_updated_user public.users;
    v_exception_caught BOOLEAN := false;
BEGIN
    RAISE NOTICE '--- Test 9: User Profile Update Guard ---';

    PERFORM set_config('role', 'authenticated', true);
    PERFORM set_config('request.jwt.claim.sub', v_user_a_owner::text, true);
    PERFORM set_config('request.jwt.claim.email', 'owner_a@academy.com', true);
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_user_a_owner::text, 'email', 'owner_a@academy.com')::text, true);

    -- 1. Attempting to change email raises exception
    BEGIN
        UPDATE public.users 
        SET email = 'hacked@academy.com' 
        WHERE id = v_user_a_owner;
    EXCEPTION WHEN OTHERS THEN
        v_exception_caught := true;
    END;

    IF NOT v_exception_caught THEN
        RAISE EXCEPTION 'TEST 9 FAILED: Modifying email on public.users did not raise an exception!';
    END IF;

    -- 2. Valid profile update via update_my_profile RPC succeeds
    v_updated_user := public.update_my_profile('Owner Alpha Updated', '9111111111');
    IF v_updated_user.full_name != 'Owner Alpha Updated' OR v_updated_user.phone != '9111111111' THEN
        RAISE EXCEPTION 'TEST 9 FAILED: update_my_profile failed to update full_name or phone.';
    END IF;

    RAISE NOTICE 'TEST 9 PASSED: User profile immutable fields protected and RPC functions correctly.';
END $$;

-- ----------------------------------------------------------------------------
-- Scenario 10: Subscriptions Client Write Prohibition
-- ----------------------------------------------------------------------------
DO $$
DECLARE
    v_user_a_owner UUID := '11111111-1111-4111-8111-111111111111';
    v_inst_a UUID := 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';
    v_write_permitted BOOLEAN := false;
BEGIN
    RAISE NOTICE '--- Test 10: Subscriptions Client Write Prohibition ---';

    PERFORM set_config('role', 'authenticated', true);
    PERFORM set_config('request.jwt.claim.sub', v_user_a_owner::text, true);
    PERFORM set_config('request.jwt.claim.email', 'owner_a@academy.com', true);
    PERFORM set_config('request.jwt.claims', json_build_object('sub', v_user_a_owner::text, 'email', 'owner_a@academy.com')::text, true);

    -- 1. Client cannot INSERT subscriptions
    BEGIN
        INSERT INTO public.subscriptions (institute_id, plan_tier, status)
        VALUES ('dddddddd-dddd-4ddd-8ddd-dddddddddddd', 'PROFESSIONAL', 'ACTIVE');
        v_write_permitted := true;
    EXCEPTION WHEN OTHERS THEN
        v_write_permitted := false;
    END;

    IF v_write_permitted THEN
        RAISE EXCEPTION 'TEST 10 FAILED: Client was able to INSERT subscriptions!';
    END IF;

    -- 2. Client cannot UPDATE subscriptions
    BEGIN
        UPDATE public.subscriptions 
        SET plan_tier = 'PROFESSIONAL' 
        WHERE institute_id = v_inst_a;
        
        IF FOUND THEN
            v_write_permitted := true;
        END IF;
    EXCEPTION WHEN OTHERS THEN
        v_write_permitted := false;
    END;

    IF v_write_permitted THEN
        RAISE EXCEPTION 'TEST 10 FAILED: Client was able to UPDATE subscriptions!';
    END IF;

    -- 3. Client cannot DELETE subscriptions
    BEGIN
        DELETE FROM public.subscriptions WHERE institute_id = v_inst_a;
        IF FOUND THEN
            v_write_permitted := true;
        END IF;
    EXCEPTION WHEN OTHERS THEN
        v_write_permitted := false;
    END;

    IF v_write_permitted THEN
        RAISE EXCEPTION 'TEST 10 FAILED: Client was able to DELETE subscriptions!';
    END IF;

    RAISE NOTICE 'TEST 10 PASSED: Subscriptions table completely protected against client modification.';
END $$;

-- ----------------------------------------------------------------------------
-- Final Success Confirmation
-- ----------------------------------------------------------------------------
DO $$
BEGIN
    RAISE NOTICE '======================================================================';
    RAISE NOTICE 'SUCCESS: All 10 Phase 1 RLS and Security Hardening test scenarios passed!';
    RAISE NOTICE '======================================================================';
END $$;

-- Always rollback test modifications to preserve a clean environment
ROLLBACK;
