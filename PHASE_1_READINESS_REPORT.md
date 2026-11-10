# Pre-Implementation Audit and Phase 1 Readiness Assessment Report

**Document Version:** 1.1.0  
**Audit Date:** November 10, 2026  
**Auditor Roles:** Senior Technical Project Manager, Software Architect, Product Manager, Engineering Lead  
**Scope:** Rigorous technical, architectural, and requirements consistency audit across all baseline project documents (`MASTER_EXECUTION_PLAN.md`, `prd.md`, `technical_architecture.md`, `REQUIREMENTS_TRACEABILITY.md`, `OPEN_DECISIONS.md`, `UI.md`, `security.md`, `responsiveness.md`, `payment_gateway.md`).

---

## 1. Executive Summary & Readiness Determination

### Readiness Status: **READY (FOUNDATIONAL DECISIONS APPROVED)**

The platform planning, technical architecture, and UI specifications have been fully audited and reconciled. The Product Owner has formally approved the three critical Phase 1 foundational decisions:
1. **DEC-01 [APPROVED]:** Self-service registration with mandatory email verification, automated 14-day free trial, and atomic creation of institute, owner membership, and trial subscription.
2. **DEC-02 [APPROVED]:** Single institute managed per user in MVP, using a future-proof composite `institute_memberships` table (`UNIQUE(institute_id, user_id)`) without rigid single-column constraints.
3. **DEC-12 [APPROVED]:** Single-center operation for MVP with an extensible `parent_institute_id` column to support multi-branch chains in Phase 3.

Furthermore, Employee Account Management (Owner invites staff by email, staff configure individual credentials, role-based access enforced) and the necessary PostgreSQL functions (`create_institute_with_owner`, `handle_new_user`, `get_user_institutes`) are formally committed to the architecture baseline.

**Phase 1 is now fully specified and READY to implement.**

---

## 2. Requirements Consistency Audit

A cross-comparison between `prd.md`, `technical_architecture.md`, `MASTER_EXECUTION_PLAN.md`, `UI.md`, and `security.md` revealed the following findings:

### 2.1 Reconciled Nuances & Identified Gaps
1. **User Profile Creation Trigger (Auth Sync):**
   - *Observation:* `MASTER_EXECUTION_PLAN.md` defines a custom `public.users` table referencing `auth.users(id)`.
   - *Gap:* The exact synchronization mechanism between Supabase Auth signup and `public.users` insertion was not explicitly formalized. If inserted client-side after signup, an incomplete network request or client drop leaves an `auth.users` identity without an application profile.
   - *Resolution Required:* Specify an atomic PostgreSQL database trigger `on_auth_user_created` listening to `AFTER INSERT ON auth.users` that automatically inserts into `public.users`.
2. **Institute Onboarding Atomicity (Orphan Prevention):**
   - *Observation:* Institute onboarding creates an `institutes` record, assigns the caller as `OWNER` in `institute_memberships`, creates a trial record in `subscriptions`, and optionally provisions initial default courses.
   - *Gap:* If executed as sequential client-side PostgREST calls, a failure mid-flow creates an orphaned institute without an owner or active membership, permanently locking out the user.
   - *Resolution Required:* Phase 1 must implement a PostgreSQL function `create_institute_with_owner()` with `SECURITY DEFINER` to execute the entire onboarding transaction atomically.
3. **RLS Recursive Query Trap:**
   - *Observation:* Standard multi-tenant RLS policies structured as `institute_id IN (SELECT institute_id FROM institute_memberships WHERE user_id = auth.uid())` on the `institute_memberships` table itself trigger a recursive evaluation error in PostgreSQL.
   - *Resolution Required:* Specify a lightweight `SECURITY DEFINER` helper function `get_user_institutes(user_id)` to decouple membership lookups from recursive policy evaluation.
4. **Vanity Slug Reservation & Formatting:**
   - *Observation:* Institutes have a unique `slug` used in public inquiry URLs (`/inquire/[slug]`).
   - *Gap:* There is no explicit list of reserved system slugs or regex formatting rules. If an institute registers the slug `login`, `api`, or `admin`, public URL routing breaks.
   - *Resolution Required:* Enforce slug validation: `^[a-z0-9]+(?:-[a-z0-9]+)*$`, length 3–48 characters, and reserve keywords: `admin`, `api`, `auth`, `login`, `signup`, `dashboard`, `inquire`, `pricing`, `terms`, `privacy`, `contact`, `settings`, `billing`.
5. **Staff Invitation Mechanism:**
   - *Observation:* `TSK-AUTH-003` specifies staff invitation modals for Admins, Counsellors, and Marketers.
   - *Gap:* Supabase client-side SDK cannot invite unauthenticated third-party emails without service role keys.
   - *Resolution Required:* Clarify that staff invitations generate a secure tokenized invitation record in `institute_invitations` table with a shareable registration link (`/signup?invite_token=...`), or invoke a server-side Edge Function.

---

## 3. Open Decisions Audit (All 12 Decisions)

Each decision from `OPEN_DECISIONS.md` has been evaluated for its exact implementation urgency:

| Decision ID | Decision Topic | Implementation Classification | Business & Architecture Impact of Postponing | Recommended Default |
|---|---|:---:|---|---|
| **DEC-01** | **Institute Onboarding Model** | **Must be decided before Phase 1** | Postponing leaves the post-signup redirect ambiguous: does signup route directly to the Onboarding Wizard (`/onboarding`) or to an "Awaiting Approval" screen? | **Self-Service with Email Verification** |
| **DEC-02** | **User Account Scope ($1:1$ vs. $1:N$)** | **Must be decided before Phase 1** | Postponing leaves database constraints and RLS policies ambiguous. If strictly $1:1$ for MVP, `institute_memberships` has `UNIQUE(user_id)`. If $1:N$, workspace switching UI and complex RLS are required immediately. | **Single Institute per User for MVP** (future-proof schema) |
| **DEC-03** | **Primary AI Provider** | **Can be deferred until Phase 3** | Zero impact on Phase 1 or Phase 2. No AI code or SDKs are introduced until Phase 3. | **Google Gemini 1.5 Flash** (via provider adapter) |
| **DEC-04** | **AI Content Media Scope in MVP** | **Can be deferred until Phase 3** | Zero impact on Phase 1. Affects prompt engineering templates in Phase 3. | **Strict Text-Only Generation in MVP** |
| **DEC-05** | **Razorpay Billing Mechanism** | **Can be deferred until Phase 6** | Phase 1 only initializes a trial subscription record (`status = 'TRIAL'`). Checkout flows are built in Phase 6. | **Hybrid (Subscriptions for Monthly, Orders for Annual)** |
| **DEC-06** | **WhatsApp Integration Timing** | **Can be decided during Phase 2** | Phase 1 has zero communication outreach code. Phase 2 CRM implements client-side `wa.me` intent links. | **Client Intent (`wa.me`) in MVP** |
| **DEC-07** | **Social Media Direct Publishing** | **Can be deferred until Phase 3 / Post-MVP** | Out of MVP scope. Zero impact on early phases. | **Manual Copy & Export in MVP** |
| **DEC-08** | **Hosting & Cloud Deployment Target** | **Can be decided during Phase 1** | Next.js App Router codebase is identical whether hosted on Vercel or Docker. | **Vercel + Supabase Cloud (Mumbai ap-south-1)** |
| **DEC-09** | **Payment Failure & Grace Period Policy** | **Can be deferred until Phase 6** | Pertains exclusively to Razorpay webhook handling in Phase 6. | **7-Day Grace Period followed by Read-Only Mode** |
| **DEC-10** | **Academic Performance Insights Timing** | **Can be deferred until Phase 8 / Horizon 3** | Confirmed out of MVP scope. Does not block early phases. | **Defer Completely to Phase 3** |
| **DEC-11** | **Transactional Email Gateway** | **Can be decided during Phase 1** | In local Phase 1 development, Supabase Auth uses local inbucket/mock emails. Production Resend SMTP credentials needed before launch. | **Resend (React Email templates)** |
| **DEC-12** | **Multi-Branch Hierarchy** | **Must be decided before Phase 1** | If multi-branch was required, `institutes` table would need recursive parent foreign keys and hierarchical RLS before Phase 1 schema is run. | **Single Institute Workspace in MVP** |

---

## 4. Architecture Readiness Assessment

The proposed technical architecture is robust, cohesive, and follows modern enterprise cloud practices.

### 4.1 Verified Architecture Strengths
- **Decoupled BaaS Model:** Clean separation between Next.js presentation and Supabase backend services.
- **Strict Database Boundary:** Multi-tenancy enforced at the database layer via PostgreSQL Row Level Security (RLS) rather than fragile client-side filtering.
- **Server-Side Secret Hygiene:** External AI and Razorpay secret keys are restricted to Supabase Edge Functions; zero private keys in client bundles.
- **Idempotent Webhooks:** Transaction ledger prevents duplicate billing updates from repeated webhook deliveries.

### 4.2 Architectural Specifications Formalized for Phase 1
To ensure seamless execution, the following technical patterns must be committed as standard in Phase 1:

#### 1. The PostgreSQL Auth Sync Trigger
```sql
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users (id, email, full_name)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', 'Staff Member')
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

#### 2. The Atomic Institute Onboarding RPC
```sql
CREATE OR REPLACE FUNCTION public.create_institute_with_owner(
    p_name TEXT,
    p_slug TEXT,
    p_phone TEXT,
    p_city TEXT,
    p_state TEXT,
    p_logo_url TEXT DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
    v_institute_id UUID;
BEGIN
    -- 1. Insert Institute
    INSERT INTO public.institutes (name, slug, phone, city, state, logo_url)
    VALUES (p_name, lower(trim(p_slug)), p_phone, p_city, p_state, p_logo_url)
    RETURNING id INTO v_institute_id;

    -- 2. Bind Current Authenticated User as OWNER
    INSERT INTO public.institute_memberships (institute_id, user_id, role, status)
    VALUES (v_institute_id, auth.uid(), 'OWNER', 'ACTIVE');

    -- 3. Provision Default Trial Subscription (14 Days)
    INSERT INTO public.subscriptions (
        institute_id, plan_tier, status, current_period_start, current_period_end, grace_until
    )
    VALUES (
        v_institute_id, 'STARTER', 'TRIAL', now(), now() + INTERVAL '14 days', now() + INTERVAL '21 days'
    );

    RETURN v_institute_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

#### 3. Non-Recursive RLS Helper
```sql
CREATE OR REPLACE FUNCTION public.get_user_institutes(p_user_id UUID)
RETURNS TABLE (institute_id UUID) AS $$
    SELECT m.institute_id 
    FROM public.institute_memberships m 
    WHERE m.user_id = p_user_id 
      AND m.status = 'ACTIVE';
$$ LANGUAGE sql SECURITY DEFINER STABLE;
```

---

## 5. UI/UX Readiness Assessment (against `UI.md` and `responsiveness.md`)

`UI.md` provides exceptional visual direction, design tokens, and layout guidelines. The visual requirements for Phase 1 are thoroughly specified:

### 5.1 Confirmed Visual Tokens
- **Brand Palette:** Deep teal `#0B4F49` (`brand-900`), interactive accent `#18796D` (`brand-700`), soft highlight `#EFF7F4` (`brand-50`), warm background `#F7F8F6`, crisp surface white `#FFFFFF`.
- **Typography:** Manrope for headers (600/700), Inter for body and form controls (400/500/600).
- **Border Radius:** Cards 14px, Buttons/Inputs 10px, Marketing panels 20px.
- **Spacing:** Strict 4px base scale (8px, 12px, 16px, 24px, 32px, 48px).

### 5.2 Mobile Responsiveness Compliance (per `responsiveness.md`)
- **Viewport:** Mandatory `<meta name="viewport" content="width=device-width, initial-scale=1">`.
- **Touch Targets:** All interactive `<button>`, `<a>`, and icon elements must have a minimum physical bounding box of **$44\text{px} \times 44\text{px}$** on mobile viewports.
- **Form Zoom Prevention:** Inputs, selects, and textareas must enforce **$\ge 16\text{px}$ font size** to prevent iOS Safari auto-zoom.
- **Responsive Navigation:** Below 768px (`md` breakpoint), the persistent desktop sidebar collapses into a slide-over mobile drawer toggled via a hamburger menu (☰) with a ✕ dismissal button.
- **Single-Column Stacking:** Multi-column layouts must collapse to single columns (`grid-cols-1`) on mobile screens without horizontal scroll.

---

## 6. Phase 1 Dependency Sequence & Task Plan

Phase 1 must be executed in the following strict dependency sequence:

```
[TSK-FND-001: Next.js + Tailwind + UI Tokens]
                   ↓
[TSK-FND-002: Supabase SSR Context Helpers]
                   ↓
[TSK-DB-001: Core PostgreSQL Schema + Triggers + RPCs]
                   ↓
[TSK-DB-002: Multi-Tenant RLS Policies & Security Helper]
                   ↓
       ┌───────────┴───────────┐
       ↓                       ↓
[TSK-AUTH-001: Auth Views]   [TSK-UI-001: App Layout Shell & Sidebar]
       ↓                       ↓
[TSK-AUTH-002: Onboarding Wizard (Atomic RPC)]
       ↓
[TSK-AUTH-003: Staff Invitation Modal]
       ↓
[TSK-SEC-001: Phase 1 Quality Gate - Automated RLS Isolation Test]
```

### 6.1 Task Dependencies Matrix

| Task ID | Task Title | Direct Dependencies | Can Run in Parallel With | Output Deliverable |
|---|---|---|---|---|
| `TSK-FND-001` | Next.js Scaffold & Design Tokens | None | None | Working Next.js project with Tailwind tokens |
| `TSK-FND-002` | Supabase SSR Utilities | `TSK-FND-001` | None | Browser & Server Supabase client utilities |
| `TSK-DB-001` | PostgreSQL Core Schema & RPCs | `TSK-FND-002` | None | SQL migration with schema, triggers, RPC |
| `TSK-DB-002` | PostgreSQL RLS Policies | `TSK-DB-001` | None | RLS policies using `get_user_institutes()` |
| `TSK-AUTH-001` | Auth Screens (Login / Signup) | `TSK-DB-002` | `TSK-UI-001` | Split-screen authentication views & actions |
| `TSK-UI-001` | App Shell & Responsive Sidebar | `TSK-DB-002` | `TSK-AUTH-001` | Layout shell, sidebar, mobile hamburger drawer |
| `TSK-AUTH-002` | Institute Onboarding Wizard | `TSK-AUTH-001` | None | Multi-step wizard invoking atomic RPC |
| `TSK-AUTH-003` | Staff Invitation Modal | `TSK-AUTH-002`, `TSK-UI-001` | None | Staff management view & invite link generator |
| `TSK-SEC-001` | Multi-Tenant RLS Security Test | All Phase 1 tasks | None | Automated penetration test verifying tenant isolation |

---

## 7. Detailed Phase 1 Acceptance Criteria

Before Phase 1 can be signed off and marked complete:

1. **AC-FND-01 (Clean Build):** `pnpm build` executes cleanly with zero TypeScript errors or lint warnings.
2. **AC-AUTH-01 (Identity Provisioning):** A user can sign up with email and password, receive a verification email, confirm their account, and sign in.
3. **AC-AUTH-02 (Trigger Verification):** Signing up in `auth.users` immediately and automatically creates a corresponding record in `public.users`.
4. **AC-ONB-01 (Atomic Onboarding):** Submitting the onboarding wizard executes `create_institute_with_owner()`, creating the institute, assigning the caller as `OWNER`, and establishing a 14-day trial subscription in a single atomic database transaction.
5. **AC-ONB-02 (Slug Validation):** The onboarding form rejects duplicate slugs, malformed slugs, and reserved system words.
6. **AC-UI-01 (Visual Compliance):** Background renders in `#F7F8F6`, primary brand elements render in `#0B4F49`, typography uses Manrope for headers and Inter for body text.
7. **AC-UI-02 (Mobile Responsiveness):** Viewports at 375px display no horizontal scroll, touch targets are $\ge 44\text{px}$, inputs are $\ge 16\text{px}$, and the sidebar is replaced by a functioning hamburger drawer.
8. **AC-SEC-01 (RLS Tenant Isolation):** An automated integration test executes a `SELECT * FROM institutes` and `courses` using User A's token and verifies that zero records belonging to Institute B are accessible.
9. **AC-SEC-02 (Role Boundaries):** Non-owner users navigating to owner-restricted workspace routes receive an immediate `403 Forbidden` response.

---

## 8. Critical Blockers & Approvals Status

The Product Owner has reviewed and formally approved the Phase 1 foundational baseline:

> ### Formal Sign-Off Checklist
> - [x] **Approval of DEC-01 [APPROVED]:** Self-service signup with email verification, 14-day free trial, and atomic onboarding RPC.
> - [x] **Approval of DEC-02 [APPROVED]:** One active institute per user account for MVP with composite future-proof `institute_memberships` table.
> - [x] **Approval of DEC-12 [APPROVED]:** Single-center institute operations for MVP with extensible `parent_institute_id` column for future multi-branch chains.
> - [x] **Employee Account Management [APPROVED]:** Full employee onboarding via email invite, individual login setup, and role-based permissions in Phase 1.
> 
> **Remaining Blockers for Phase 1: NONE.** Phase 1 is fully unblocked and ready for execution.

---

## 9. Recommended First Implementation Task

Upon receiving the approvals above, the immediate first development task to execute is:

> **`TSK-FND-001`: Next.js 14+ App Router Scaffold & Design Token Configuration**  
> **Immediate Action Items:**
> 1. Complete installation of core project dependencies (`next`, `react`, `@supabase/ssr`, `lucide-react`, `tailwindcss`).
> 2. Verify `tailwind.config.ts` design tokens matching `UI.md` (`#0B4F49`, `#F7F8F6`, `#EFF7F4`, Manrope, Inter).
> 3. Verify `app/globals.css` with responsive input font rules and mobile touch-target defaults.
> 4. Verify clean compilation via `pnpm build`.

---
*End of Pre-Implementation Audit and Phase 1 Readiness Assessment Report (`PHASE_1_READINESS_REPORT.md`).*

