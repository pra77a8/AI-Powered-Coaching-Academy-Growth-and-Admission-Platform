# AcademyGrowth — Implemented Features & Capability Matrix

**Project:** AI-Powered Coaching Academy Growth and Admission Platform  
**Live Supabase Project Ref:** `ktneowmlhwdkixriyjnb`  
**Current Milestone:** Phase 1 Complete (Foundation, Database, RLS, & User Authentication)  
**Last Updated:** November 2026

---

## 1. Executive Summary

AcademyGrowth is an enterprise multi-tenant SaaS platform tailored specifically for Indian coaching academies (IIT-JEE, NEET, Foundation, UPSC). The platform provides strict tenant isolation using PostgreSQL Row Level Security (RLS), atomic provisioning, modern server actions, and a high-converting split-screen UI.

To date, **all foundational infrastructure, database schemas, security hardening, remote Supabase deployments, and complete user authentication flows** have been implemented and verified with 100% build and typecheck success.

```
+----------------------------------------------------------------------------------------+
|                                IMPLEMENTED PLATFORM STACK                              |
+----------------------------------------------------------------------------------------+
| [Frontend]   Next.js 14 App Router · React 18 · TypeScript 5 · Tailwind CSS · Lucide  |
| [Design]     AcademyGrowth Design Tokens (#0B4F49 Forest, #F7F8F6 Surface, Manrope)   |
| [Auth]       Supabase Auth SSR (PKCE Code Exchange, Server Actions, Route Middleware) |
| [Database]   PostgreSQL with 6 Core Multi-Tenant Tables deployed on Supabase Cloud    |
| [Security]   Row Level Security (18 Policies), Caller-Scoped Functions, Invites Guard  |
+----------------------------------------------------------------------------------------+
```

---

## 2. Feature Inventory by Module

### Module 1: Foundational Infrastructure (`TSK-FND-001`, `TSK-FND-002`)
* [x] **Next.js 14 App Router Framework:** Configured with TypeScript, ESLint, PostCSS, and Tailwind CSS.
* [x] **Design Tokens & Typography:** Full implementation of AcademyGrowth branding:
  * Brand forest green (`#0B4F49` / `brand-900`, `brand-800`, `brand-700`), warm neutrals, and crisp status badges.
  * Typography pairing: Manrope for headings, Inter for high-legibility data and body copy.
  * Mobile touch accessibility: Guaranteed $\ge 44\text{px}$ touch targets across all interactive buttons, inputs, and menus.
* [x] **Supabase SSR Context Helpers:**
  * Browser client singleton (`lib/supabase/client.ts`) for interactive client components.
  * Server client factory (`lib/supabase/server.ts`) with synchronous Next.js `cookies()` and modern `getAll`/`setAll` handlers.
  * Middleware session refresher (`lib/supabase/middleware.ts`) preserving updated session cookies across redirect responses.

---

### Module 2: Multi-Tenant Core Database (`TSK-DB-001`)
* [x] **PostgreSQL Multi-Tenant Schema:** 6 production tables deployed and active:
  1. `public.institutes` — Tenant workspaces with slug uniqueness, exam categories array, contact details, branch hierarchy (`parent_institute_id`), and active status.
  2. `public.users` — Profile registry synchronized from `auth.users` via database triggers, including notification preferences.
  3. `public.institute_memberships` — Tenant membership binding with RBAC (`OWNER`, `ADMIN`, `COUNSELLOR`, `MARKETER`, `FACULTY`), active/suspended statuses, and partial unique index guaranteeing only one active owner per tenant.
  4. `public.institute_invitations` — 7-day secure tokenized employee invitations with role assignment and expiration timestamps.
  5. `public.courses` — Academy course catalog with target exam tags, tuition fee tracking, active toggle, and tenant isolation.
  6. `public.subscriptions` — Razorpay/Stripe billing records tracking plan tiers (`TRIAL`, `STARTER`, `GROWTH`, `PRO`), dates, and trial grace periods.
* [x] **Automated Trigger Guards:**
  * `on_auth_user_created` — Automatically replicates newly registered Supabase Auth users to `public.users`.
  * `tg_validate_parent_institute_id` — Prevents circular branch hierarchies and guarantees branch ownership alignment.
  * `tg_guard_invitation_expiry` — Rejects acceptance of expired or tampered invitations.
  * `set_updated_at` — Automatic modification timestamp maintenance.
* [x] **Hardened Atomic RPC Functions:**
  * `create_institute_with_owner(...)` — Creates the institute, assigns the creator as `OWNER`, and provisions a 14-day free trial in a single atomic database transaction.
  * `accept_employee_invitation(...)` — Concurrency-safe (`FOR UPDATE`) employee onboarding with verified email matching.
  * `update_my_profile(...)` — Self-service profile modification.

---

### Module 3: Database Security Hardening & Row Level Security (`TSK-DB-002`)
* [x] **100% RLS Coverage:** Row Level Security enabled and enforced across all 6 core tables.
* [x] **18 Multi-Tenant Isolation Policies:**
  * Direct table scraping prohibited; users from Institute A receive 0 rows when attempting to query Institute B (`TC-SEC-01`).
  * Direct client writes to `subscriptions` forbidden (reserved strictly for service role webhooks).
  * Suspended members instantly lose access to institute data.
* [x] **Caller-Scoped Helper Functions:**
  * `has_active_membership(p_institute_id)` — Evaluates active tenant access using `auth.uid()`.
  * `get_my_institutes()` — Returns list of active institutes for current user.
  * `get_my_role(p_institute_id)` — Returns caller's RBAC role within the given institute.
* [x] **Invitation Security Hardening:**
  * Mandatory verification check: Rejects unauthenticated users or users where `auth.users.email_confirmed_at IS NULL`.
  * Email matching: Requires normalized authenticated email to match the invited email address.
  * Lockout protection: Overwriting an existing active `OWNER` via invitation is strictly disallowed.
* [x] **Safe Public RPC Functions:**
  * `get_public_institute_by_slug(p_slug)` — Whitelisted read-only public discovery for inquiry forms.
  * `get_public_courses(p_institute_id)` — Whitelisted course listing for public student admissions.
* [x] **Remote Database Migration Application:**
  * Applied `20261110000001_phase1_initial_schema.sql` and `20261110000002_phase1_rls_policies.sql` to live Supabase project `ktneowmlhwdkixriyjnb`.
  * Recorded in `supabase_migrations.schema_migrations`.

---

### Module 4: User Authentication & Session Management (`TSK-AUTH-001`)
* [x] **Split-Screen Design System (`AuthShell`):**
  * Left panel (Desktop): AcademyGrowth branding, value propositions, social proof testimonial, and security trust badges.
  * Right panel: Clean, accessible form containers with home navigation and support links.
  * Responsive Mobile View: Elegant mobile header with logo, title, and form scaling.
* [x] **Owner Sign Up Flow (`/signup`):**
  * Inputs: Full Name ($\ge 2$ chars), Work Email, Password ($\ge 8$ chars), Confirm Password.
  * Live password match indicator and character count validation.
  * Server Action: `signUpAction` registers user via Supabase Auth with metadata.
  * Confirmation View: Seamless transition to "Check your inbox" screen with step-by-step guidance.
* [x] **Sign In Flow (`/login`):**
  * Inputs: Work Email, Password with show/hide toggle.
  * Server Action: `signInAction` validates credentials via Supabase SSR.
  * Context-aware error handling (explicit alerts for unconfirmed email vs. invalid credentials).
  * Destination preservation via `?next=...` query param with open-redirect sanitization.
* [x] **Password Recovery Flow (`/forgot-password`):**
  * Inputs: Work Email.
  * Server Action: `forgotPasswordAction` dispatches password reset emails.
  * Account enumeration defense: Returns uniform success confirmation regardless of email existence.
* [x] **Password Reset Flow (`/reset-password`):**
  * Inputs: New Password, Confirm New Password with show/hide toggle.
  * Server Action: `updatePasswordAction` securely updates password for authenticated session and redirects to dashboard with toast message.
* [x] **Sign Out Flow:**
  * Server Action: `signOutAction` terminates session and cookies.
  * Header Integration: Accessible Sign Out button embedded directly in `TopHeader`.
* [x] **Route Protection Middleware:**
  * Protects `/dashboard`, `/settings`, `/admissions`, `/marketing`, `/insights`, `/onboarding`, and `/reset-password`.
  * Automatically redirects unauthenticated traffic to `/login?next=<destination>`.
  * Automatically redirects authenticated users away from `/login` and `/signup` directly to `/dashboard`.

---

### Module 5: App Shell & Responsive Layout (`TSK-UI-001` partial)
* [x] **AppShell Container:** Responsive dashboard layout container with full-height viewport management.
* [x] **Sidebar Navigation:** Collapsible left sidebar (240px expanded / 72px collapsed) with operational indicators and section groupings (Admissions, Marketing, Insights, Workspace).
* [x] **TopHeader Component:**
  * Institute title display.
  * Dynamic "14-Day Free Trial" status badge.
  * Notification center trigger.
  * User profile avatar and Sign Out action form.
* [x] **Mobile Drawer Navigation:** Accessible hamburger menu toggle for viewport widths $<768\text{px}$.

---

### Module 6: Public Marketing Pages
* [x] **Home Landing Page (`/`):** Hero section, value propositions, feature highlights, and call-to-action cards.
* [x] **Features Showcase (`/features`):** Deep-dive into AI marketing, smart admissions, and parent communications.
* [x] **How It Works (`/how-it-works`):** 3-step intake-to-admission visual walkthrough.
* [x] **Pricing Page (`/pricing`):** Tiered subscription breakdown (Starter, Growth, Pro) tailored to student capacity.
* [x] **Solutions Page (`/solutions`):** Tailored solutions for single-center vs. multi-branch institutes.
* [x] **About Page (`/about`):** Mission, coaching academy focus, and company vision.
* [x] **Contact Page (`/contact`):** Inquiries and enterprise sales outreach form.
* [x] **Legal & Compliance Pages:**
  * `/terms` — Terms of Service.
  * `/privacy` — Privacy Policy & data handling.
  * `/refund-policy` — Billing and subscription refund policy.

---

## 3. Verification & Quality Metrics

| Check | Tool / Mechanism | Result | Notes |
|---|---|:---:|---|
| **TypeScript Compilation** | `npx tsc --noEmit` | **PASS (0 errors)** | Full strict type checking across all routes and components |
| **Next.js Production Build** | `pnpm build` | **PASS (19 routes)** | All static and dynamic routes pre-rendered successfully |
| **Database Migrations** | Supabase Management API | **PASS (2/2)** | Applied to live Supabase ref `ktneowmlhwdkixriyjnb` |
| **PostgreSQL RLS** | pgTAP Test Suite | **PASS (10/10)** | Multi-tenant isolation verified (`TC-SEC-01`) |
| **Auth Endpoint Connectivity** | GoTrue REST Ping | **PASS (HTTP 200)** | Verified with live anon and publishable API keys |

---

## 4. Next Planned Tasks in Execution Plan

1. **`TSK-AUTH-002` — Institute Onboarding Wizard:**
   * Multi-step post-signup wizard capturing Institute Legal Name, Custom Slug, Target Exam Categories (JEE, NEET, etc.), and logo upload.
   * Invocation of `create_institute_with_owner` RPC to provision tenant and activate 14-day trial.
2. **`TSK-AUTH-003` — Employee Account Management:**
   * `/settings/team` console to invite staff members with roles (Admin, Counsellor, Marketer, Faculty).
   * Invitation acceptance flow linking employee credentials to the tenant.
3. **`TSK-DSH-001` — Executive KPI Dashboard:**
   * Dynamic metric cards (Total Inquiries, Confirmed Admissions, Conversion Rate, CPA).
