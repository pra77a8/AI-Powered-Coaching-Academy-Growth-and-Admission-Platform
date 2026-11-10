# Requirements Traceability Matrix (RTM)

**Project:** AI-Powered Coaching Academy Growth & Admissions Platform  
**Document Version:** 1.0.0  
**Status:** Baseline Execution Traceability  
**Scope:** Bi-directional mapping across Product Requirements (PRD), Technical Architecture (ARCH), Functional Modules, Development Backlog Tasks (TSK), and Quality Assurance Verification Scenarios (TC).

---

## 1. Traceability Overview & Matrix Legend

- **PRD Ref:** Product Requirements Document identifier (`PRD-xxx`)
- **Arch Ref:** Technical Architecture Document identifier (`ARCH-xxx`)
- **Module:** Functional platform subsystem (Modules 1 through 10)
- **Task ID:** Actionable engineering backlog item (`TSK-xxx`) from `EXECUTION_PLAN.md`
- **Phase:** Target implementation phase (Phase 1 through Phase 8)
- **Test ID:** Verification scenario and acceptance test (`TC-xxx`)

---

## 2. Core Functional Requirements Traceability Matrix

| PRD Ref | Description | Arch Ref | Module | Development Task ID | Phase | Verification / Test Case |
|---|---|---|---|---|:---:|---|
| **PRD-5.1.1** | Social media captions & post descriptions | ARCH-6.2 | Mod 3 (AI Studio) | `TSK-AI-001`, `TSK-AI-003` | P3 | `TC-AI-01`: Generates exam-specific Instagram copy with tags. |
| **PRD-5.1.2** | Short-form video & Reel scripts (15s/30s/60s) | ARCH-6.2 | Mod 3 (AI Studio) | `TSK-AI-003` | P3 | Verify generation of structured script with visual/audio cues. |
| **PRD-5.1.3** | WhatsApp promotional message broadcasts | ARCH-6.2 | Mod 3 (AI Studio) | `TSK-AI-003` | P3 | Verify formatted text with WhatsApp markdown (`*bold*`, emojis). |
| **PRD-5.1.4** | Course announcements & admission campaigns | ARCH-6.2 | Mod 3 (AI Studio) | `TSK-AI-003` | P3 | Verify generation of batch launch promotional copy. |
| **PRD-5.1.5** | Educational content repurposing engine | ARCH-6.2 | Mod 3 (AI Studio) | `TSK-AI-004` | P3 | Input lecture notes $\rightarrow$ outputs 5 distinct micro-content assets. |
| **PRD-5.1.6** | Content editor, vault storage & tagging | ARCH-5.2 | Mod 3 (AI Studio) | `TSK-AI-005` | P3 | In-app editor saves copy to `ai_generated_contents` with exam tags. |
| **PRD-5.1.7** | AI usage limits & plan token quotas | ARCH-6.3 | Mod 3 (AI Studio) | `TSK-AI-002` | P3 | `TC-AI-01`: Quota exhaustion blocks call with HTTP 402 upgrade prompt. |
| **PRD-5.2.1** | Public online student inquiry capture | ARCH-4.1 | Mod 4 (Smart CRM) | `TSK-CRM-001` | P2 | `TC-CRM-01`: Form submit creates record with `source = 'WEBSITE'`. |
| **PRD-5.2.2** | Student inquiry profile management | ARCH-5.2 | Mod 4 (Smart CRM) | `TSK-CRM-001`, `TSK-CRM-002` | P2 | Store name, phone, parent phone, grade, target course, source. |
| **PRD-5.2.3** | Inquiry source attribution tracking | ARCH-5.2 | Mod 4 (Smart CRM) | `TSK-CRM-002`, `TSK-MKT-002` | P2 | UTM parameters link lead directly to `campaign_id`. |
| **PRD-5.2.4** | Counsellor assignment (manual & auto) | ARCH-5.2 | Mod 4 (Smart CRM) | `TSK-CRM-003` | P2 | Assign lead to counsellor; visible on counsellor task agenda. |
| **PRD-5.2.5** | 8-Stage status pipeline (Kanban board) | ARCH-4.1 | Mod 4 (Smart CRM) | `TSK-CRM-003` | P2 | `TC-CRM-03`: Drag card from New $\rightarrow$ Contacted $\rightarrow$ Demo $\rightarrow$ Confirmed. |
| **PRD-5.2.6** | Follow-up scheduler & interaction history | ARCH-5.2 | Mod 4 (Smart CRM) | `TSK-CRM-004` | P2 | Log call outcome notes and update `next_followup_at`. |
| **PRD-5.2.7** | Mandatory lost reason on un-interested leads| ARCH-5.2 | Mod 4 (Smart CRM) | `TSK-CRM-003` | P2 | `TC-CRM-04`: Status change to `NOT_INTERESTED` requires reason. |
| **PRD-5.2.8** | Admission closing & fee capture modal | ARCH-5.2 | Mod 4 (Smart CRM) | `TSK-CRM-005` | P2 | Transition to Confirmed requires roll number and collected fee. |
| **PRD-5.3.1** | Central dashboard KPI summary cards | ARCH-4.1 | Mod 2 (Dashboard) | `TSK-DSH-001` | P2 | Displays Total Inquiries, Admissions, Conversion %, and CPA. |
| **PRD-5.3.2** | "Requires Immediate Action" alert drawer | ARCH-4.1 | Mod 2 (Dashboard) | `TSK-DSH-002` | P2 | Surfaces overdue follow-ups and unassigned leads dynamically. |
| **PRD-5.3.3** | Marketing campaign registry & spend logs | ARCH-5.2 | Mod 5 (Analytics) | `TSK-MKT-001` | P4 | Create campaign records with budget and ongoing spend entries. |
| **PRD-5.3.4** | Cost Per Inquiry (CPI) calculation engine | ARCH-5.2 | Mod 5 (Analytics) | `TSK-MKT-003` | P4 | `TC-MKT-01`: Mathematically checks $\text{Spend} / \text{Inquiries}$. |
| **PRD-5.3.5** | Cost Per Admission (CPA) calculation engine| ARCH-5.2 | Mod 5 (Analytics) | `TSK-MKT-003` | P4 | `TC-MKT-01`: Mathematically checks $\text{Spend} / \text{Admissions}$. |
| **PRD-5.3.6** | Attributed revenue & ROAS computation | ARCH-5.2 | Mod 5 (Analytics) | `TSK-MKT-003` | P4 | Aggregates confirmed admission fees linked to campaign. |
| **PRD-5.3.7** | Visual comparative channel performance | ARCH-4.1 | Mod 5 (Analytics) | `TSK-MKT-004` | P4 | Side-by-side charts comparing CAC across ad channels. |
| **PRD-5.4.1** | Student achievement & exam rank vault | ARCH-5.2 | Mod 6 (Success) | `TSK-TST-001` | P5 | Stores exam year, marks, percentile, rank, and course. |
| **PRD-5.4.2** | Marksheet & proof asset upload (Storage) | ARCH-5.4 | Mod 6 (Success) | `TSK-TST-001` | P5 | Secure upload of proof files to private Supabase Storage bucket. |
| **PRD-5.4.3** | Parental consent verification governance | ARCH-5.2 | Mod 6 (Success) | `TSK-TST-002` | P5 | Mandatory checkbox and consent document upload before promotion. |
| **PRD-5.4.4** | AI success story & press release generator | ARCH-6.2 | Mod 6 (Success) | `TSK-TST-003` | P5 | Converts verified rank details into congratulatory press copy. |
| **PRD-5.4.5** | Testimonial approval workflow (Draft/Appr) | ARCH-5.2 | Mod 6 (Success) | `TSK-TST-004` | P5 | Only Owner/Admin can approve testimonials for public display. |
| **PRD-5.5.1** | Message template management | ARCH-5.2 | Mod 7 (Communication)| `TSK-CRM-004` | P2 | Dynamic variables (`{{student_name}}`, `{{course_name}}`). |
| **PRD-5.5.2** | One-click client WhatsApp dispatch | ARCH-4.1 | Mod 7 (Communication)| `TSK-CRM-004` | P2 | In-app button launches formatted `https://wa.me` links. |
| **PRD-5.5.3** | Communication audit history logging | ARCH-5.2 | Mod 7 (Communication)| `TSK-CRM-004` | P2 | Records channel, timestamp, and notes in lead activity timeline. |
| **PRD-5.6.1** | Grounded conversational AI assistant | ARCH-6.2 | Mod 8 (Growth Assist)| `TSK-AST-001`, `TSK-AST-002` | P7 | Synthesizes answers strictly from aggregate database facts. |
| **PRD-5.6.2** | PII stripping for LLM context security | ARCH-6.3 | Mod 8 (Growth Assist)| `TSK-AST-001` | P7 | Student names/phones redacted from prompts before AI dispatch. |
| **PRD-5.7.1** | Student test score tracking & report cards | ARCH-5.2 | Mod 10 (Future) | Post-MVP Scope | P-Fut| Academic performance module scheduled for Phase 3. |
| **PRD-6.1.1** | Employee invitation dispatch by email | ARCH-5.6 | Mod 1 (Auth/Team) | `TSK-AUTH-003` | P1 | Tokenized invitation link generated with assigned role. |
| **PRD-6.1.2** | Employee individual credential setup | ARCH-5.6 | Mod 1 (Auth/Team) | `TSK-AUTH-003` | P1 | Invited employee registers password and activates profile. |
| **PRD-6.1.3** | Role-based data & feature isolation | ARCH-5.6 | Mod 1 (Auth/Team) | `TSK-DB-002`, `TSK-UI-001` | P1 | Employee accesses only data permitted by assigned role. |
| **PRD-7.0.1** | Self-service signup & email verification | ARCH-5.3 | Mod 1 (Auth/Onboard) | `TSK-AUTH-001` | P1 | User verifies email before proceeding to onboarding. |
| **PRD-7.0.2** | Atomic onboarding & 14-day trial | ARCH-5.7 | Mod 1 (Auth/Onboard) | `TSK-DB-001`, `TSK-AUTH-002` | P1 | Atomic creation of institute, owner, and trial subscription. |

---

## 3. Platform Architecture & Infrastructure Traceability Matrix

| Arch Ref | Architecture Requirement | Technical Component | Backlog Task ID | Phase | Verification / Test Case |
|---|---|---|---|:---:|---|
| **ARCH-4.1** | Next.js App Router Web Application | Next.js 14+ / React | `TSK-FND-001` | P1 | Clean build; responsive mobile rendering across views. |
| **ARCH-5.1** | User authentication & session management | Supabase Auth | `TSK-AUTH-001` | P1 | Email signup, verification link, session token issuance. |
| **ARCH-5.2** | Relational multi-tenant data schema | Supabase PostgreSQL | `TSK-DB-001` | P1 | Tables created with strict foreign keys and constraints. |
| **ARCH-5.3** | Multi-tenant Row Level Security (RLS) | PostgreSQL RLS | `TSK-DB-002` | P1 | `TC-SEC-01`: Tenant A cannot query Tenant B records. |
| **ARCH-5.4** | Secure asset storage (Logos, Proofs) | Supabase Storage | `TSK-FND-002`, `TSK-TST-001` | P1, P5| Public vs. private bucket access policies enforced. |
| **ARCH-5.5** | Secure serverless functions runtime | Supabase Edge Functions | `TSK-AI-001`, `TSK-BIL-001` | P3, P6 | Deno functions handle secret keys without client exposure. |
| **ARCH-6.1** | Secure external AI API proxying | Edge Function + AI SDK | `TSK-AI-001` | P3 | `TC-AI-02`: Server-side proxy handles rate limits & retries. |
| **ARCH-7.1** | Razorpay subscription plan checkout | Edge Function + Razorpay| `TSK-BIL-001`, `TSK-BIL-002` | P6 | Modal launches and captures subscription checkout token. |
| **ARCH-7.2** | Cryptographic webhook signature verification| Edge Function (HMAC SHA-256)| `TSK-BIL-003` | P6 | `TC-SEC-03`: Webhooks with altered signature reject with 400. |
| **ARCH-7.3** | Subscription state synchronization | PostgreSQL `subscriptions`| `TSK-BIL-003` | P6 | `TC-BIL-01`: `subscription.activated` unlocks plan features. |
| **ARCH-7.4** | Grace period & read-only lockouts | PostgreSQL State Guard | `TSK-BIL-004` | P6 | `TC-BIL-02`: Failed renewal grants 7-day grace before lockout. |
| **ARCH-10.1**| Role-Based Access Control (RBAC) | RLS + Next.js Middleware | `TSK-DB-002`, `TSK-AUTH-003` | P1 | `TC-SEC-02`: Counsellor navigating to billing receives 403. |
| **ARCH-11.1**| Idempotent webhook processing | `payment_transactions` Ledger | `TSK-BIL-003` | P6 | Duplicate webhook deliveries do not duplicate ledger rows. |

---

## 4. User Roles & Permission Traceability

| Role Title | PRD Persona | Key Authorized Capabilities | Key Prohibited Actions | Enforcing Mechanism |
|---|---|---|---|---|
| **Platform Super Admin** | System Operator | Platform-wide metrics, tenant management, global AI controls. | Altering internal institute student records without audit. | Super-Admin claim + RLS bypass guard |
| **Institute Owner** | Director Rajan | Billing, user invites, full financial ROI, institute settings, CRM, AI studio. | Deleting workspace while subscription billing active. | DB check constraints + `role = 'OWNER'` |
| **Institute Admin** | Pooja Sharma | Manage courses, leads, counsellors, campaigns, approve testimonials. | Altering Razorpay credentials or deleting workspace. | Application guards + `role = 'ADMIN'` |
| **Admission Counsellor**| Amit Verma | View assigned leads, log calls/follow-ups, mark admissions. | Viewing financial CPA, ad spend, or billing settings. | RLS filtering (`assigned_counsellor_id`) |
| **Marketing Manager** | Kavita Nair | AI Content Studio, campaign creation, ad spend logs, testimonial vault. | Viewing personal counsellor follow-up agendas, billing. | Route middleware + `role = 'MARKETER'` |
| **Teacher / Faculty** | Prof. Kulkarni | Submit lecture notes for repurposing, submit student test achievements. | Accessing CRM leads, campaign spend, billing, or settings. | Route middleware + `role = 'FACULTY'` |

---

## 5. Non-Functional & Operational Requirements Traceability

| NFR Category | Requirement Specification | Architecture Strategy | Validation Method |
|---|---|---|---|
| **Data Isolation** | Complete tenant boundary enforcement at the database layer. | Foreign key `institute_id` on all tables; PostgreSQL RLS enabled. | Automated penetration test (`TC-SEC-01`) on every PR. |
| **Performance** | Authenticated dashboard paint $\le 1.5\text{s}$; DB queries $\le 100\text{ms}$. | Multi-column indexing (`institute_id`, `status`); Next.js SSR caching. | Lighthouse audit & PostgreSQL `EXPLAIN ANALYZE` benchmarks. |
| **AI Reliability** | AI generation failure must not consume quotas or corrupt state. | Server-side transactional error handler in Edge Function. | Mocking AI 500 error verifies zero token decrement (`TC-AI-02`). |
| **Financial Integrity**| Zero duplicate billing records or unverified status upgrades. | HMAC SHA-256 signature verification; unique `razorpay_payment_id` constraints. | Replay attack testing with identical webhook payloads. |
| **Usability** | Non-technical staff can update a lead status in $\le 3$ clicks. | Drag-and-drop Kanban board with immediate visual feedback. | Task completion time audits during internal user acceptance testing. |

---
*End of Requirements Traceability Matrix (`REQUIREMENTS_TRACEABILITY.md`).*

