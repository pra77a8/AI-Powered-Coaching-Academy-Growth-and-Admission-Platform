# Technical Architecture Document

## AI-Powered Coaching Academy Growth & Admissions Platform

**Document type:** Technical Architecture\
**Product type:** Multi-tenant B2B SaaS web application\
**Frontend:** Next.js with React\
**Backend and database:** Supabase\
**Payment provider:** Razorpay\
**AI integration:** External AI API (provider to be finalized)\
**Status:** Initial architecture proposal --- pending confirmation of
open decisions

------------------------------------------------------------------------

## 1. Purpose

This document describes the proposed technical architecture for the
AI-Powered Coaching Academy Growth & Admissions Platform.

The architecture follows the high-level structure in the supplied
reference diagram:

-   Users access the product through a web frontend.
-   The frontend uses Supabase services for authentication, data, file
    storage and backend functions.
-   Supabase Edge Functions securely communicate with external AI
    services and Razorpay.
-   Razorpay processes subscription payments and sends webhook events.
-   Verified payment and subscription information is stored in the
    Supabase database.

The product will be built as a web application using Next.js and React.
It will not require separate Android or iOS applications for the initial
release.

## 2. Architecture Goals

The architecture should:

1.  Support multiple coaching institutes using one SaaS platform.
2.  Keep each institute's data isolated from other institutes.
3.  Provide secure authentication and role-based access.
4.  Support the product's marketing, admissions, analytics and
    testimonial modules.
5.  Integrate AI services without exposing secret API keys in the
    browser.
6.  Support recurring subscriptions and payment status tracking through
    Razorpay.
7.  Store uploaded documents, images and other institute assets
    securely.
8.  Allow new product modules and external integrations to be added
    later.
9.  Remain manageable for an initial MVP while allowing future growth.

## 3. High-Level Architecture

``` mermaid
flowchart TD
    U[User: Owner / Admin / Counsellor / Marketer / Faculty]
    FE[Next.js Web Application<br/>React UI]
    SB[Supabase Platform]
    AUTH[Supabase Auth]
    DB[(Supabase PostgreSQL Database)]
    STORAGE[Supabase Storage]
    EF[Supabase Edge Functions]
    AI[External AI Service / API]
    RZ[Razorpay]
    SUB[Subscription & Payment Status]
    WH[Payment Webhooks]

    U --> FE
    FE --> AUTH
    FE --> DB
    FE --> STORAGE
    FE --> EF
    EF --> AI
    EF --> RZ
    RZ --> SUB
    RZ --> WH
    SUB --> EF
    WH --> EF
    EF --> DB
    DB --> FE
```

### 3.1 Architecture Overview

  -----------------------------------------------------------------------
  Layer                   Selected service        Responsibility
  ----------------------- ----------------------- -----------------------
  User interface          Next.js + React         Web pages, dashboards,
                                                  forms and user
                                                  interactions

  Authentication          Supabase Auth           User registration,
                                                  login, sessions and
                                                  identity

  Database                Supabase PostgreSQL     Institutes, users,
                                                  leads, campaigns,
                                                  content, subscriptions
                                                  and reports

  File storage            Supabase Storage        Institute logos,
                                                  uploaded learning
                                                  material, testimonial
                                                  media and generated
                                                  assets

  Backend functions       Supabase Edge Functions Secure business
                                                  operations and external
                                                  API integrations

  AI services             External AI API         Content generation,
                                                  content transformation
                                                  and data-grounded AI
                                                  assistance

  Payment infrastructure  Razorpay                Checkout and
                                                  subscription/payment
                                                  processing

  Payment events          Razorpay Webhooks       Server-to-server
                                                  payment and
                                                  subscription event
                                                  notifications
  -----------------------------------------------------------------------

## 4. Frontend Architecture

### 4.1 Next.js with React

Next.js will be used as the web application framework, with React for
building the user interface.

The frontend will provide:

-   Public product and institute-facing pages.
-   Authentication screens.
-   Institute onboarding.
-   Role-specific dashboards.
-   AI Marketing & Content Studio.
-   Leads and Admissions CRM.
-   Marketing Analytics.
-   Student Success & Testimonial Management.
-   Communication and follow-up screens.
-   Subscription and billing screens.
-   Account and institute settings.

### 4.2 Role-Based User Experience

The interface will show features according to the signed-in user's role.

  -----------------------------------------------------------------------
  Role                                Main interface access
  ----------------------------------- -----------------------------------
  Institute Owner                     Overall dashboard, users, modules,
                                      reports, billing and settings

  Institute Administrator             Institute operations and permitted
                                      management functions

  Admission Counsellor                Leads, inquiry details, follow-ups
                                      and admission status

  Marketing Manager                   Content Studio, campaigns and
                                      marketing analytics

  Teacher / Faculty                   Permitted educational content and
                                      student achievement records
  -----------------------------------------------------------------------

The exact permissions for each role will be defined in the authorization
model. Hiding a page or button in the frontend is not sufficient
security; backend and database access must also enforce permissions.

## 5. Supabase Backend Infrastructure

Supabase will provide the primary backend services.

### 5.1 Supabase Authentication

Supabase Auth will manage:

-   User registration and login.
-   Session management.
-   Password reset.
-   Email verification, if enabled.
-   Authenticated user identity.
-   Authentication state in the web application.

Each authenticated user will be associated with an institute membership
and a role.

### 5.2 Supabase PostgreSQL Database

Supabase PostgreSQL will be the central data store.

The database will maintain information for:

-   Institutes and institute settings.
-   User profiles and institute memberships.
-   Roles and permissions.
-   Courses and examination categories.
-   Student inquiries and lead sources.
-   Counsellor assignments and follow-up records.
-   Admission status and admission outcomes.
-   Marketing campaigns and campaign expenditure.
-   AI-generated content and content history.
-   Student achievements and testimonials.
-   Consent and approval records.
-   Subscription and payment records.
-   AI usage records, where required.
-   Audit and activity records.

A detailed database schema and entity relationship diagram will be
prepared separately after the product workflows and permissions are
confirmed.

### 5.3 Multi-Tenant Data Isolation & Future-Proof Hierarchy

The platform is engineered to serve multiple independent coaching institutes on a shared database infrastructure while guaranteeing total tenant isolation.

**1. Approved Architectural Model (DEC-01, DEC-02, DEC-12):**
- **Self-Service Onboarding:** Institute owners register via self-service signup with mandatory email verification. Institute record, owner membership, and a 14-day free trial subscription are provisioned atomically via a database function.
- **Future-Proof Multi-Membership Architecture:** While the MVP constrains each user to managing one institute at a time, the database `institute_memberships` table is structured with composite uniqueness `UNIQUE (institute_id, user_id)` rather than a rigid single-column `UNIQUE (user_id)` constraint. This ensures future transitions to multi-institute switching require zero schema rewrites.
- **Extensible Multi-Branch Architecture:** Each institute operates from a single center in the MVP. To ensure seamless future expansion into branch chains, the `institutes` table includes an optional self-referencing `parent_institute_id UUID REFERENCES institutes(id) ON DELETE CASCADE`. In Phase 3, branch centers will link to their parent academy with zero schema breakage.
- **Slug Validation & Reserved Routing Keywords:** Every institute has a unique URL-safe slug (`^[a-z0-9]+(?:-[a-z0-9]+)*$`) for public inquiry pages (`/inquire/[slug]`). System keywords (`admin`, `api`, `auth`, `login`, `signup`, `dashboard`, `inquire`, `pricing`, `terms`, `privacy`, `contact`, `settings`, `billing`) are strictly reserved.

**2. Non-Recursive Row Level Security (RLS) Policy Pattern:**
To avoid recursive evaluation loops in PostgreSQL when evaluating `institute_memberships`, RLS policies utilize a `SECURITY DEFINER STABLE` helper function:
```sql
CREATE OR REPLACE FUNCTION public.get_user_institutes(p_user_id UUID)
RETURNS TABLE (institute_id UUID) AS $$
    SELECT m.institute_id 
    FROM public.institute_memberships m 
    WHERE m.user_id = p_user_id 
      AND m.status = 'ACTIVE';
$$ LANGUAGE sql SECURITY DEFINER STABLE;
```
All tenant tables enforce isolation using `WHERE institute_id IN (SELECT get_user_institutes(auth.uid()))`.

### 5.4 Supabase Storage

Supabase Storage will store files associated with institutes.

Potential storage categories:

-   Institute logos and branding assets.
-   Uploaded lecture recordings or source material, subject to supported
    file limits.
-   Documents and educational resources.
-   Student achievement images.
-   Testimonial videos and images.
-   AI-generated posters and other content assets.

Storage access should follow institute-level authorization. Public
access should be used only for assets intentionally approved for public
display. Private files should be accessed through authenticated policies
or time-limited signed URLs.

### 5.5 Supabase Edge Functions

Supabase Edge Functions will provide secure backend operations,
especially where secret keys or trusted server-side validation are
required.

Proposed responsibilities:

-   Call external AI APIs.
-   Validate and process AI generation requests.
-   Apply institute-level access checks for sensitive operations.
-   Communicate with Razorpay.
-   Verify Razorpay webhook signatures.
-   Process payment and subscription events.
-   Update subscription status in the database.
-   Trigger approved communication workflows.
-   Perform other trusted integrations as the product expands.

Secrets such as AI provider keys and Razorpay secret credentials must be
stored in secure server-side environment secrets. They must never be
exposed in browser code.

### 5.6 Employee Account Management & Role-Based Access Control

Phase 1 includes complete employee account management, enabling institute owners to onboard and govern staff accounts according to their distinct operational responsibilities.

**Employee Onboarding Lifecycle:**
1. **Institute Owner Setup:** The institute owner registers and creates the academy workspace.
2. **Employee Invitation Dispatch:** From the Employee Management console (`/settings/team`), the owner (or authorized admin) enters the staff member's email and selects a role:
   - Institute Admin
   - Admission Counsellor
   - Marketing Manager
   - Teacher / Faculty
3. **Invitation Security Token:** The system generates an `institute_invitations` record with a cryptographically secure, time-limited token (valid for 7 days) and state `PENDING`.
4. **Credential Setup:** The employee receives the invitation link (`/signup?invite_token=...`), establishes their own secure password, and sets up their user profile.
5. **Account Activation:** Upon account creation, the invitation token is consumed atomically:
   - The user's account is verified.
   - An active membership record is created in `institute_memberships` binding the employee to the institute with the assigned role.
   - The invitation status transitions to `ACCEPTED`.
6. **Isolated Login & Permissions:** The employee logs in with their individual credentials. Application layout routes and database RLS policies restrict their view and actions exclusively to what their assigned role permits for their specific institute.
7. **Platform Super Admin Governance:** Platform Super Admin operates on a dedicated platform governance layer with cross-tenant administrative authority, distinct from standard institute staff roles.

### 5.7 Database Stored Procedures, Triggers & Atomic Functions

To maintain transactional integrity and prevent orphaned records, critical workflows are governed by PostgreSQL functions:

1. **User Profile Auto-Sync Trigger (`handle_new_user`):**
   Executes `AFTER INSERT ON auth.users` to automatically populate `public.users` with the user's ID, email, and full name.
2. **Atomic Onboarding RPC (`create_institute_with_owner`):**
   A `SECURITY DEFINER` function that creates the `institutes` record, binds the caller as `OWNER` in `institute_memberships`, and provisions a 14-day free trial in `subscriptions` in a single ACID transaction.
3. **Non-Recursive RLS Helper (`get_user_institutes`):**
   A `SECURITY DEFINER STABLE` function returning the institute IDs for an authenticated user without triggering policy recursion on the `institute_memberships` table.
4. **Role Evaluation Helper (`get_user_role`):**
   A `SECURITY DEFINER STABLE` function evaluating the caller's role within an institute to enforce table-level mutation permissions.

## 6. AI Service Integration

### 6.1 AI Integration Overview

The platform will connect to an external AI service through a secure
backend function.

The browser will not call a paid AI provider using a secret API key
directly.

Proposed request flow:

1.  An authorized user selects an AI feature.
2.  The Next.js application sends the request to a trusted backend
    function.
3.  The backend validates the user's identity, institute membership and
    request.
4.  The backend prepares the relevant prompt and permitted institute
    data.
5.  The backend sends the request to the selected AI provider.
6.  The AI provider returns the generated result.
7.  The backend validates and returns the result to the application.
8.  The application displays the result for user review.
9.  The user can edit and save approved content.
10. Relevant usage information may be recorded for limits, monitoring
    and billing.

### 6.2 Planned AI Capabilities

  -----------------------------------------------------------------------
  AI capability           Product module          Purpose
  ----------------------- ----------------------- -----------------------
  Social media caption    AI Content Studio       Generate promotional
  generation                                      captions

  Reel and short-video    AI Content Studio       Create short-form
  script generation                               marketing scripts

  Educational content     AI Content Studio       Transform supplied
  repurposing                                     material into other
                                                  content formats

  Campaign content        Marketing               Suggest content based
  suggestions                                     on course and campaign
                                                  goals

  Student success story   Testimonials            Draft promotional
  drafting                                        content from verified
                                                  achievement data

  Business performance    AI Growth Assistant     Explain available
  summaries                                       institute metrics

  Marketing               AI Growth Assistant     Suggest improvements
  recommendations                                 based on available data
  -----------------------------------------------------------------------

### 6.3 AI Safety and Data Requirements

-   AI output must be presented as a draft for human review.
-   The platform must not fabricate student ranks, marks, testimonials
    or achievements.
-   Student information must only be sent to external AI services when
    necessary and permitted.
-   Sensitive personal information should be minimized or removed from
    prompts where possible.
-   AI responses must not be treated as verified business facts without
    checking the source data.
-   Usage limits and failure handling should be considered to control
    cost.
-   The selected AI provider's data handling and retention terms must be
    evaluated before launch.

**Provider decision pending:** The AI provider and models have not yet
been finalized.

## 7. Razorpay Payment Integration

### 7.1 Purpose

Razorpay will be used to collect subscription payments from coaching
institutes.

The subscription model may include Starter, Growth and Professional
plans, with plan limits and prices managed by the product.

### 7.2 Payment Flow

1.  An institute owner selects a subscription plan.
2.  The application requests a payment or subscription session through a
    trusted backend function.
3.  The backend communicates with Razorpay using server-side
    credentials.
4.  The application opens the appropriate Razorpay checkout experience.
5.  The customer completes the payment.
6.  Razorpay sends a webhook event to the configured backend endpoint.
7.  The backend verifies the webhook signature.
8.  The backend processes the event and updates the relevant payment and
    subscription records.
9.  The application displays the subscription status obtained from
    trusted backend/database state.

### 7.3 Subscription Management

The platform should maintain:

-   Institute subscription plan.
-   Subscription identifier from Razorpay, where applicable.
-   Payment identifier and order identifier.
-   Subscription status.
-   Billing period.
-   Renewal date.
-   Payment history.
-   Failed payment information.
-   Cancellation status.
-   Applicable plan limits.

### 7.4 Payment Security Requirements

-   Razorpay secret credentials must remain server-side.
-   Webhook signatures must be verified before processing events.
-   Payment success must not be determined solely by a browser redirect
    or frontend response.
-   Webhook processing should be idempotent so repeated events do not
    create duplicate updates.
-   Payment and subscription state changes should be recorded.
-   The system should handle failed, pending, successful, refunded and
    cancelled payment states as applicable.

**Important:** Razorpay subscription APIs and webhook events should be
selected according to the final billing model. A one-time payment and a
recurring subscription are not the same integration flow.

## 8. Main Product Modules and Their Architecture Dependencies

  -----------------------------------------------------------------------
  Product module                      Main platform dependencies
  ----------------------------------- -----------------------------------
  Dashboard                           Next.js, Supabase Auth, PostgreSQL

  AI Marketing & Content Studio       Next.js, Edge Functions, AI API,
                                      Storage, PostgreSQL

  Smart Admission CRM                 Next.js, PostgreSQL, RLS, Auth

  Marketing Analytics                 PostgreSQL, Next.js, reporting
                                      queries

  Student Success & Testimonials      PostgreSQL, Storage, Edge Functions
                                      for AI drafting

  Communication Automation            PostgreSQL, Edge Functions,
                                      external messaging provider

  AI Growth Assistant                 PostgreSQL, Edge Functions, AI API

  Subscription & Billing              Next.js, Edge Functions, Razorpay,
                                      Webhooks, PostgreSQL

  Student Performance Insights        PostgreSQL, Next.js, reporting and
  (future)                            optional AI services
  -----------------------------------------------------------------------

## 9. Data Flow Summary

### 9.1 Standard Application Data Flow

1.  User signs in through Supabase Auth.
2.  The application obtains the authenticated session.
3.  The user accesses an authorized product module.
4.  The application requests or updates data.
5.  Supabase verifies access through authentication and database
    policies.
6.  Authorized data is returned to the application.

### 9.2 AI Data Flow

1.  User submits an AI generation request.
2.  Backend validates access and input.
3.  Backend communicates with the AI provider.
4.  Generated content is returned.
5.  User reviews and approves the result.
6.  Approved content is saved in the database or storage.

### 9.3 Payment Data Flow

1.  Institute owner chooses a plan.
2.  Backend creates the relevant Razorpay payment or subscription
    request.
3.  Customer completes checkout.
4.  Razorpay sends a webhook.
5.  Backend verifies and processes the event.
6.  Subscription and payment status are updated in Supabase.
7.  The application reads the updated status and applies the appropriate
    product access.

## 10. Security and Access Control

The architecture must include the following controls:

-   Supabase Auth for identity and session management.
-   Row Level Security on institute-owned database tables.
-   Institute membership validation.
-   Role-based permissions for sensitive operations.
-   Server-side handling of AI and payment secrets.
-   Secure storage policies.
-   Razorpay webhook signature verification.
-   Input validation for user-submitted data.
-   Protection against unauthorized cross-institute access.
-   Activity logging for important administrative and billing
    operations.
-   Appropriate consent and privacy controls for student data and
    testimonials.
-   Rate limiting and usage controls for expensive AI operations.

## 11. Reliability, Monitoring and Error Handling

The platform should account for:

-   AI provider timeouts and service failures.
-   AI usage or quota limits.
-   Failed or delayed payment events.
-   Duplicate webhook deliveries.
-   Temporary database or network failures.
-   Unauthorized access attempts.
-   File upload failures.
-   Incomplete or invalid form submissions.

Errors should be logged with enough context for troubleshooting, without
unnecessarily storing passwords, secret keys, payment credentials or
sensitive student information.

The application should provide clear user-facing error messages and
allow safe retries where appropriate.

## 12. Scalability and Future Expansion

The proposed architecture should allow the product to expand into:

-   More coaching institutes and institute branches.
-   Additional user roles.
-   More AI-powered content formats.
-   Additional messaging providers.
-   Advanced campaign attribution.
-   Student performance analytics.
-   More subscription plans.
-   Additional payment and reporting capabilities.

The MVP should avoid unnecessary complexity. New services should be
introduced when a validated product requirement needs them.

## 13. Proposed External Integrations

  -----------------------------------------------------------------------
  Integration             Purpose                 Status
  ----------------------- ----------------------- -----------------------
  AI API provider         Content generation and  To be selected
                          AI assistant            

  Razorpay                Subscription and        Selected
                          payment processing      

  WhatsApp Business       Inquiry and admission   Proposed
  Platform                communication           

  Email service           Transactional and       To be selected
                          institute communication 

  Social media platforms  Publishing or campaign  Future consideration
                          data, if supported      

  Speech-to-text service  Convert lecture         Future consideration
                          recordings into         
                          transcripts             
  -----------------------------------------------------------------------

External integrations may require separate accounts, API access,
approvals, usage charges and compliance checks.

## 14. MVP Architecture Scope

The first release should include:

-   Next.js and React web application.
-   Supabase Auth.
-   Supabase PostgreSQL database.
-   Supabase Row Level Security.
-   Supabase Storage.
-   Supabase Edge Functions.
-   One selected AI API provider.
-   Razorpay payment integration for the chosen subscription model.
-   Verified Razorpay webhook processing.
-   Multi-institute data separation.
-   Role-based access control.

Advanced academic analytics, multi-channel publishing, complex
automation and additional external integrations can be introduced in
later releases.

## 15. Architecture Decisions and Baseline Status

The foundational architecture decisions for Phase 1 have been reviewed and approved by the Product Owner:

1.  **Multi-Tenancy & Data Isolation (DEC-01): [APPROVED]**
    Institutes register independently via self-service signup with mandatory email verification.
    Upon completing the onboarding wizard, a 14-day free trial subscription (`status = 'TRIAL'`)
    is provisioned automatically. Institute creation, owner binding, and trial subscription
    creation are executed atomically via a PostgreSQL stored procedure.

2.  **User Membership Architecture (DEC-02): [APPROVED]**
    For the MVP, one user account manages one institute at a time. To ensure future compatibility,
    the database `institute_memberships` table uses composite uniqueness `UNIQUE (institute_id, user_id)`
    without permanent rigid single-column constraints, enabling future multi-institute switching without breaking migrations.

3.  **Institute Centers & Multi-Branch Hierarchy (DEC-12): [APPROVED]**
    Each institute operates as a single center for the MVP. The `institutes` table includes an extensible
    `parent_institute_id` self-referencing foreign key to allow future multi-branch chains without schema breakage.

4.  **AI provider:** Which provider will be used for AI features?\
    Options to evaluate: OpenAI or Google Gemini. (Deferred to Phase 3; provider adapter pattern).

5.  **AI content generation:** Should the first release support
    text-only generation, or also image/poster generation and lecture
    transcription?\
    Proposed default: Text generation first; media generation and
    transcription later (Phase 3).

6.  **Razorpay billing:** Will institutes pay recurring monthly/annual
    subscriptions through Razorpay Subscriptions, or make one-time
    payments for fixed access periods?\
    Proposed default: Hybrid model (Recurring subscriptions for monthly, one-time orders for annual).

7.  **WhatsApp integration:** Is WhatsApp Business messaging required in
    the MVP, or can it be introduced in Phase Two?\
    Proposed default: Client-side intent links (`wa.me`) in MVP; official Cloud API in Phase 2.

8.  **Social media publishing:** Should the platform only generate and
    organize content initially, or should it also publish directly to
    Instagram and Facebook?\
    Proposed default: Generate and organize content first (Phase 3).

9.  **Deployment and hosting:** Is the intended deployment platform
    Vercel for Next.js?\
    Proposed default: Vercel, with Supabase hosted in Mumbai (`ap-south-1`).

10. **Subscription enforcement:** Should unpaid or expired institutes
    lose access immediately, receive a grace period, or enter read-only
    mode?\
    Proposed default: 7-day grace period followed by read-only mode.

------------------------------------------------------------------------

## 16. Architecture Summary

The proposed solution uses a Next.js and React frontend connected to
Supabase as its backend platform.

Supabase provides authentication, PostgreSQL database services, file
storage and Edge Functions. Edge Functions act as the trusted
integration layer for external AI services and Razorpay.

Razorpay handles payments and subscription processing, while verified
webhook events update subscription records in Supabase.

The architecture is designed around multi-institute support, secure data
isolation, AI-assisted workflows and subscription-based SaaS operations.

**Final architecture principle:**

Keep the application experience centralized in Next.js, use Supabase as
the primary backend infrastructure, and route sensitive external
integrations through trusted server-side functions.
