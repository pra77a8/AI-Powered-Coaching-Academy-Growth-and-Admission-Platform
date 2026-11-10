# Open Decisions & Architectural Review Sheet

**Project:** AI-Powered Coaching Academy Growth & Admissions Platform  
**Document Version:** 1.1.0  
**Status:** Baseline Decisions Locked (DEC-01, DEC-02, DEC-12 Approved)  
**Purpose:** This document consolidates architectural, business model, and product scope decisions identified during the deep analysis of `prd.md` and `technical_architecture.md`. It tracks approved decisions, their formal constraints, and remaining pending items.

---

## Executive Summary of Decisions

```
+-------------------------------------------------------------------------------------------------------------------+
| ID    | Decision Area              | Approved Specification / Recommended Default       | Status                  |
+-------+----------------------------+----------------------------------------------------+-------------------------+
| DEC-01| Institute Onboarding Model | Self-Service Signup + Email Verify + Atomic Trial  | [APPROVED BY OWNER]     |
| DEC-02| User Account Scope         | 1 Institute in MVP (Future-Proof Composite Schema) | [APPROVED BY OWNER]     |
| DEC-03| Primary AI Provider        | Google Gemini 1.5 Flash (via Provider Adapter)     | [PENDING CONFIRMATION]  |
| DEC-04| AI Content Media Scope     | Strict Text-Only Generation in MVP                 | [PENDING CONFIRMATION]  |
| DEC-05| Razorpay Billing Model     | Recurring Subscriptions (with One-Time Option)     | [PENDING CONFIRMATION]  |
| DEC-06| WhatsApp Integration Scope | Client-Side Intent Links (wa.me) for MVP           | [PENDING CONFIRMATION]  |
| DEC-07| Social Media Publishing    | Manual Copy / Asset Export in MVP                  | [PENDING CONFIRMATION]  |
| DEC-08| Hosting & Cloud Target     | Vercel (Next.js) + Supabase Cloud (Mumbai)         | [PENDING CONFIRMATION]  |
| DEC-09| Payment Failure Policy     | 7-Day Grace Period -> Read-Only Mode               | [PENDING CONFIRMATION]  |
| DEC-10| Academic Insights Timing   | Defer Completely to Phase 3                        | [PENDING CONFIRMATION]  |
| DEC-11| Transactional Email Engine | Resend (via Supabase Auth / React Email)           | [PENDING CONFIRMATION]  |
| DEC-12| Multi-Branch Hierarchy     | Single-Center in MVP (Extensible Branch Schema)    | [APPROVED BY OWNER]     |
| DEC-13| Ownership Transfer Policy   | Deferred Post-MVP (Single Active Owner Baseline)   | [APPROVED BY ARCHITECT] |
+-------------------------------------------------------------------------------------------------------------------+
```

---

## Detailed Decision Records

---

### DEC-01: Institute Onboarding Model (Self-Service vs. Admin Approval)

- **Context & Why It Matters:**  
  How new coaching institutes register and gain access to the platform dictates customer acquisition velocity, platform abuse protection, and operational overhead during launch.
- **Approved Specification:**  
  **Self-Service Signup with Email Verification and Atomic Trial Provisioning.**
  1. Institute owners register independently via self-service signup (`/signup`).
  2. Supabase Auth enforces mandatory email verification before full workspace activation.
  3. After verification, the user completes the Institute Onboarding Wizard (`/onboarding`).
  4. Institute creation, owner role assignment, and a 14-day free trial subscription (`status = 'TRIAL'`, `plan_tier = 'STARTER'`) must execute **atomically** in a single PostgreSQL function (`create_institute_with_owner()`).
  5. If any step fails, the entire transaction rolls back, preventing orphaned institutes or unattached owner records.
- **Current Status:** `[APPROVED BY OWNER]`

---

### DEC-02: Multi-Institute User Membership (Single vs. Multi-Tenant Accounts)

- **Context & Why It Matters:**  
  Can an individual user account belong to multiple coaching institutes simultaneously? A permanent single-institute database constraint would require high-friction migrations later when consultants or multi-center teachers need to access multiple institutes.
- **Approved Specification:**  
  **Single Institute per User in MVP, with a Future-Proof Composite Database Architecture.**
  1. *Product Rule for MVP:* A user account manages one institute at a time during the MVP. The UI provides a single-workspace experience.
  2. *Database Architecture:* The `institute_memberships` table uses a composite uniqueness constraint: `UNIQUE (institute_id, user_id)`.
  3. *Avoid Permanent Database Traps:* Do **not** place a permanent single-column `UNIQUE (user_id)` constraint on `institute_memberships`. Instead, enforce the single-active-membership rule for the MVP via an application-level guard and an `is_default BOOLEAN DEFAULT true` flag. This ensures that in Phase 3/4, enabling multi-institute switching requires zero destructive schema migrations.
- **Current Status:** `[APPROVED BY OWNER]`

---

### DEC-03: Primary AI Model Provider (Google Gemini vs. OpenAI)

- **Context & Why It Matters:**  
  The AI engine powers the AI Marketing Studio, Content Repurposing, and the AI Growth Assistant. Unit cost, prompt latency, context window size, and reliability directly impact profitability and user experience.
- **Product & Technical Impact:**  
  - Gemini offers massive context windows (1M+ tokens in Gemini 1.5 Flash), attractive pricing ($0.075 per 1M input tokens), and strong multilingual support for Indian regional languages.
  - OpenAI (GPT-4o / GPT-4o-mini) offers mature tooling and consistent instruction-following for structured JSON output.
- **Viable Options:**
  - **Option A: Google Gemini (Gemini 1.5 Flash for studio copy; Gemini 1.5 Pro for Growth Assistant).**
  - **Option B: OpenAI (GPT-4o-mini for studio copy; GPT-4o for Growth Assistant).**
  - **Option C: Provider-Agnostic Adapter Pattern (Defaulting to Gemini, swappable via env config).**
- **Recommended Default:**  
  **Option C (Provider-Agnostic Adapter Pattern, defaulting to Google Gemini 1.5 Flash).**  
  *Rationale:* Writing a clean LLM provider abstraction in the Supabase Edge Function allows switching between Gemini and OpenAI with a single environment variable.
- **Current Status:** `[PENDING CONFIRMATION]` (Deferred to Phase 3)

---

### DEC-04: AI Content Media Scope in MVP (Text-Only vs. Image/Audio Generation)

- **Context & Why It Matters:**  
  Coaching institutes love visual banners, exam posters, and wish to transcribe recorded audio lectures into marketing posts. However, image generation and speech-to-text introduce significant cost, latency, and third-party complexity.
- **Product & Technical Impact:**  
  - Text-only generation (captions, hashtags, scripts, WhatsApp messages, syllabus repurposing) is fast, deterministic, inexpensive, and immediately actionable.
  - Media generation (Imagen, DALL-E) or audio transcription (Whisper) requires large file uploads, asynchronous job queues, and higher failure rates.
- **Viable Options:**
  - **Option A (Strict Text-Only Generation for MVP):** Focus 100% of MVP effort on high-converting social media copy, Reel scripts, WhatsApp broadcasts, and educational text repurposing.
  - **Option B (Include AI Image Banner Generation in MVP).**
  - **Option C (Include Audio Lecture Transcription in MVP).**
- **Recommended Default:**  
  **Option A (Strict Text-Only Generation in MVP; Image & Audio deferred to Phase 2/3).**  
  *Rationale:* PRD Section 13 explicitly lists automated video conferencing and lecture engines as out of scope.
- **Current Status:** `[PENDING CONFIRMATION]` (Deferred to Phase 3)

---

### DEC-05: Razorpay Billing Model (Recurring Subscriptions vs. One-Time Invoices)

- **Context & Why It Matters:**  
  In the Indian market, Razorpay recurring subscriptions require customer mandate registration via UPI Autopay, e-Mandate, or credit card. Some small coaching institutes prefer direct one-time UPI payments or annual net banking transfers.
- **Product & Technical Impact:**  
  - *Razorpay Subscriptions API:* Automated monthly recurring charges, zero manual follow-ups for renewals.
  - *Razorpay Orders (One-Time Payments):* Lower checkout friction, but requires manual renewal invoices.
- **Viable Options:**
  - **Option A (Strictly Recurring Subscriptions via Razorpay Subscriptions API).**
  - **Option B (Hybrid Model):** Default to Razorpay Recurring Subscriptions for monthly plans; provide Razorpay One-Time Orders for Annual lump-sum payments.
  - **Option C (One-Time Payments Only for MVP).**
- **Recommended Default:**  
  **Option B (Hybrid Model: Recurring Subscriptions for Monthly, One-Time Orders for Annual/Manual).**
- **Current Status:** `[PENDING CONFIRMATION]` (Deferred to Phase 6)

---

### DEC-06: WhatsApp Integration Scope (Client-Side Intent vs. Meta Cloud API in MVP)

- **Context & Why It Matters:**  
  WhatsApp is the primary business communication medium in India. However, integrating the official Meta WhatsApp Business Cloud API requires verified Facebook Business Manager and per-conversation fees.
- **Product & Technical Impact:**  
  - Client-side intent (`wa.me`) enables instantaneous implementation, zero API charges, and launches the user's existing WhatsApp Web or mobile app with pre-filled dynamic message text.
- **Viable Options:**
  - **Option A (Client-Side WhatsApp Intent Links in MVP; Official Cloud API in Phase 2).**
  - **Option B (Mandatory Official WhatsApp Business Cloud API in MVP).**
- **Recommended Default:**  
  **Option A (Client-Side Intent in MVP, transitioning to Official Cloud API in Phase 2).**
- **Current Status:** `[PENDING CONFIRMATION]` (To be decided during Phase 2)

---

### DEC-07: Social Media Publishing (Direct Publishing vs. Manual Copy/Export)

- **Context & Why It Matters:**  
  Automated auto-posting to Instagram/Facebook requires Meta Graph API OAuth token management and app verification.
- **Viable Options:**
  - **Option A (In-App Editor + One-Click Clipboard Copy & Text Export in MVP).**
  - **Option B (Direct Meta Graph API Auto-Publishing in MVP).**
- **Recommended Default:**  
  **Option A (Manual Copy & Export in MVP; Direct Publishing in Phase 3).**  
  *Rationale:* Aligns with PRD Section 13 out-of-scope exclusions.
- **Current Status:** `[PENDING CONFIRMATION]` (Deferred to Phase 3)

---

### DEC-08: Hosting and Deployment Cloud Infrastructure

- **Context & Why It Matters:**  
  Selection of hosting provider dictates release velocity, edge routing performance, and infrastructure maintenance.
- **Viable Options:**
  - **Option A: Vercel (Frontend Next.js) + Supabase Cloud (Mumbai ap-south-1).**
  - **Option B: Self-Hosted Docker Containers on AWS / DigitalOcean.**
- **Recommended Default:**  
  **Option A (Vercel + Supabase Cloud in Mumbai Region).**
- **Current Status:** `[PENDING CONFIRMATION]` (To be confirmed in Phase 1 / Phase 8)

---

### DEC-09: Subscription Payment Failure & Grace Period Policy

- **Context & Why It Matters:**  
  When an institute's recurring monthly charge fails, immediate lockout damages customer trust, while indefinite access causes unrecovered costs.
- **Viable Options:**
  - **Option A: Immediate Lockout.**
  - **Option B: 7-Day Grace Period followed by Read-Only Mode.**
  - **Option C: Immediate Read-Only Mode.**
- **Recommended Default:**  
  **Option B (7-Day Grace Period followed by Read-Only Lockout).**
- **Current Status:** `[PENDING CONFIRMATION]` (Deferred to Phase 6)

---

### DEC-10: Student Academic Performance Insights Timing

- **Context & Why It Matters:**  
  Adding mock test marks tracking into the MVP expands scope into LMS territory.
- **Viable Options:**
  - **Option A (Defer Completely to Phase 3 / Horizon 3).**
  - **Option B (Basic Score Tracker in MVP).**
- **Recommended Default:**  
  **Option A (Defer Completely to Phase 3).**
- **Current Status:** `[PENDING CONFIRMATION]` (Confirmed Horizon 3)

---

### DEC-11: Transactional Email Gateway Selection

- **Context & Why It Matters:**  
  The platform must send authentication verification emails, password resets, staff invitation links, and payment receipts.
- **Viable Options:**
  - **Option A: Resend (Modern developer-first API, built-in React Email templates).**
  - **Option B: Amazon SES.**
  - **Option C: Supabase Built-in SMTP.**
- **Recommended Default:**  
  **Option A (Resend for transactional emails & staff invitations; Supabase Auth configured with Resend SMTP credentials).**
- **Current Status:** `[PENDING CONFIRMATION]` (To be decided during Phase 1)

---

### DEC-12: Multi-Branch Hierarchy (Single Center vs. Multi-Center Chains)

- **Context & Why It Matters:**  
  Some coaching academies operate multiple physical branches in a single city. How should the architecture support this without over-complicating MVP multi-tenancy?
- **Approved Specification:**  
  **Single-Center per Institute in MVP, with an Extensible Multi-Branch Data Model.**
  1. *Product Rule for MVP:* Each coaching institute operates as a single center.
  2. *Extensible Database Architecture:* The `institutes` table includes a nullable self-referencing column: `parent_institute_id UUID REFERENCES public.institutes(id) ON DELETE CASCADE`.
  3. *Future Compatibility:* For MVP single-center institutes, `parent_institute_id` is `NULL`. When multi-branch hierarchy is enabled in Phase 3, branch centers will simply point to the parent institute, allowing multi-branch reporting with zero breaking schema changes.
- **Current Status:** `[APPROVED BY OWNER]`

---

### DEC-13: Institute Ownership Transfer Policy (Deferred Post-MVP Scope)

- **Context & Why It Matters:**  
  Transferring institute ownership requires an atomic, two-phase transaction that elevates a designated active team member to `OWNER` while demoting the current owner to `ADMIN` without violating `idx_single_active_owner_per_user` or the invariant trigger preventing institutes with zero active owners.
- **Approved Architectural Decision:**  
  **Deferred to Post-MVP (Horizon 2).**
  1. *MVP Scope Constraint:* In Phase 1 MVP, an institute retains its founding owner. Self-demotion and direct client-side owner assignment are strictly prevented to protect institutes from accidental lockout or unauthorized takeover.
  2. *Future Implementation Design:* When ownership transfer is required, it must be implemented via a dedicated, audited `SECURITY DEFINER` RPC (`transfer_institute_ownership(p_new_owner_user_id UUID)`) that checks the recipient does not already own an institute, verifies active caller ownership, atomically updates both roles within a single transaction, and records an immutable log in `activity_logs`.
- **Current Status:** `[APPROVED BY ARCHITECT]` (Deferred to Horizon 2)

---
*End of Open Decisions & Architectural Review Sheet (`OPEN_DECISIONS.md`).*
