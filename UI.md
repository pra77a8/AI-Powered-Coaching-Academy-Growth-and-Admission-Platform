# UI Design Specification
## AI-Powered Coaching Academy Growth & Admissions Platform

**Document:** UI.md  
**Status:** Initial design direction approved; detailed visual tokens are proposed for implementation  
**Product type:** Multi-tenant B2B SaaS web application  
**Frontend:** Next.js + React  
**Backend:** Supabase  
**Primary users:** Institute Owner, Institute Administrator, Admission Counsellor, Marketing Manager, Teacher / Faculty  
**Indirect users:** Students and parents (primarily through public inquiry and communication touchpoints)

---

## 1. Design Vision

Create a **modern, premium, trustworthy and highly usable SaaS experience** for coaching institutes.

The platform should feel like a polished professional product rather than a generic admin template. It must help institute teams understand what needs attention, manage admissions efficiently, create marketing content, measure growth and manage their subscription without feeling overwhelmed.

### Approved visual direction

- Off-white / warm-neutral application background.
- Deep teal / forest-green as the primary brand accent.
- Clean, persistent sidebar navigation for authenticated workspaces.
- Spacious dashboard layouts with clear visual hierarchy.
- Soft borders, restrained shadows and moderate corner rounding.
- Strong typography with readable labels and numerical data.
- Restrained colour usage: colour should communicate hierarchy, category or status.
- AI features should feel special and recognisable, but remain part of the same design system.

### Product personality

**Professional · Reliable · Premium · Clear · Capable**

Avoid a playful school-app aesthetic, overly decorative gradients, excessive glassmorphism, neon colours, dense admin-template layouts and unnecessary animation.

---

## 2. Inspiration References and What to Borrow

The supplied references are inspiration, not templates to reproduce pixel-for-pixel.

### 2.1 Brilliant — Signup screen

**Asset:** `ui_references/01-brilliant-signup-inspiration.png`

**What to take:**
- Generous whitespace and a focused registration experience.
- A clear, centered form with a strong headline.
- Social sign-in options presented as secondary actions.
- Minimal form fields with consistent rounded outlines.
- A small, memorable illustration that balances the form.
- Clear separation between primary signup action and existing-user login.

**How to adapt it:**
- Use a split-screen layout on desktop: brand/value proposition and a subtle product illustration on one side, signup form on the other.
- Keep the actual form compact and easy to scan.
- Include institute-specific signup fields only where required by the onboarding flow.
- Use Google sign-in only if enabled and configured.
- On mobile, stack the form and brand content vertically; keep the form first or immediately visible.

### 2.2 Teal subscription checkout — Account and billing UI

**Asset:** `ui_references/02-teal-subscription-checkout-inspiration.jpg`

**What to take:**
- Strong deep-teal brand panel and high contrast.
- Persistent narrow icon sidebar.
- Clear content heading and back-navigation pattern.
- A large, structured primary form area.
- A complementary side panel explaining plan benefits.
- Clear price, billing frequency and primary CTA hierarchy.

**How to adapt it:**
- Use a similar split layout for plan selection and checkout: payment/plan form on the main surface, plan summary and included benefits in a teal panel.
- Use the sidebar pattern in the authenticated application, but give icons labels/tooltips and clear active states.
- Avoid copying its exact colour values, text, icons or layout proportions.
- Do not collect or store raw card details in our application; use the approved Razorpay checkout flow.

### 2.3 Moss — Public landing page inspiration

**Reference URL:** https://www.moss.dev/

**What to take:**
- A strong, outcome-led hero headline.
- Clear product positioning rather than a generic list of features.
- Product visuals that demonstrate the actual experience.
- Short, well-structured feature sections.
- Proof points and credibility placed before the final CTA.
- A consistent visual language across the full page.

**How to adapt it:**
- Explain how the platform helps coaching institutes attract inquiries, convert admissions and grow.
- Show a believable product dashboard preview, not abstract technology artwork alone.
- Use institute-oriented examples and language.
- Keep the landing page focused on outcomes and workflows, not implementation technology.

### 2.4 Additional product references

Use these as targeted references during screenshot collection:

| Product / library | Study for | URL |
|---|---|---|
| Mobbin | Real web-app screens and complete user flows | https://mobbin.com/ |
| SaaSFrame | SaaS landing pages, onboarding and dashboards | https://www.saasframe.io/ |
| Attio | CRM records, tables and pipelines | https://attio.com/ |
| Linear | Navigation, typography and workspace consistency | https://linear.app/ |
| HubSpot | Lead management and marketing workflows | https://www.hubspot.com/ |
| Canva | Content creation workspace and editing patterns | https://www.canva.com/ |
| Stripe | Billing, subscription and payment status patterns | https://stripe.com/ |

Use references to understand interaction patterns and information hierarchy. Do not reproduce another product's branding or exact screen.

---

## 3. Brand and Visual Foundations

### 3.1 Proposed colour tokens

These are initial design tokens for the first UI implementation. Keep them centralized so they can be tuned after seeing the complete interface.

| Token | Proposed value | Usage |
|---|---|---|
| `--color-brand-950` | `#073B36` | Deepest brand surface, strong text on light backgrounds |
| `--color-brand-900` | `#0B4F49` | Primary deep teal |
| `--color-brand-800` | `#12645B` | Hover and active brand states |
| `--color-brand-700` | `#18796D` | Primary interactive accent |
| `--color-brand-100` | `#DCEFEA` | Soft teal backgrounds |
| `--color-brand-50` | `#EFF7F4` | Subtle highlighted surfaces |
| `--color-background` | `#F7F8F6` | Main application background |
| `--color-surface` | `#FFFFFF` | Cards, forms and panels |
| `--color-surface-muted` | `#F1F4F2` | Secondary surfaces |
| `--color-text-primary` | `#172522` | Main headings and body text |
| `--color-text-secondary` | `#66736F` | Supporting text |
| `--color-border` | `#E2E8E5` | Dividers and card outlines |
| `--color-border-strong` | `#CBD6D1` | Focused or emphasized borders |

### 3.2 Semantic colours

Use semantic colours consistently. Do not use colour alone to communicate a state; pair it with text and, where useful, an icon.

| Meaning | Suggested colour | Example |
|---|---|---|
| Success | `#16845B` | Admission confirmed, payment successful |
| Warning | `#B7791F` | Follow-up due, payment action needed |
| Danger | `#C2413B` | Failed action, overdue item, destructive action |
| Information | `#3478A8` | Helpful notice, neutral information |
| Neutral | `#64716C` | Draft, inactive, archived |

### 3.3 Data visualization palette

Charts should be visually clear and coordinated with the brand, not monochromatic.

1. Primary series: deep teal `#0B6B60`
2. Secondary series: blue `#4B83C4`
3. Third series: muted amber `#D69A36`
4. Fourth series: violet `#8873B8`
5. Fifth series: slate `#84938D`

Chart rules:
- Use the primary teal for the most important series.
- Use muted gridlines and clear axis labels.
- Avoid 3D charts, heavy gradients and decorative chart effects.
- Prefer line charts for trends, horizontal bars for comparisons, and simple donut charts only for meaningful proportions.
- Always show the reporting period and units.
- Include tooltips and accessible labels.
- Do not invent sample business metrics in production; use clearly labelled skeletons or empty states until real data is available.

### 3.4 Typography

**Recommended pairing:**
- Headings: **Manrope** (600–700 weights)
- Body, forms and data: **Inter** (400–600 weights)

If loading two font families adds unnecessary complexity, use Inter throughout as the fallback.

Typography principles:
- Use sentence case for headings and navigation.
- Keep dashboard titles concise.
- Use tabular numerals for KPIs, prices and dates where possible.
- Avoid very light font weights for important content.
- Maintain comfortable line-height for long descriptions and help text.

Suggested scale:
- Marketing hero: 48–60 px desktop; 36–42 px mobile.
- Page title: 28–32 px desktop; 24–28 px mobile.
- Section title: 18–22 px.
- Card title: 14–16 px, semibold.
- Body: 14–16 px.
- Supporting labels: 12–13 px; never make essential information too small.

### 3.5 Shape, borders and elevation

- Cards: 12–16 px radius.
- Inputs and buttons: 9–12 px radius.
- Large marketing panels: 20–24 px radius where appropriate.
- Standard borders: 1 px, subtle neutral.
- Shadows: soft and low contrast; reserve stronger elevation for overlays and menus.
- Avoid putting every element inside a card. Use whitespace and section headings to create hierarchy.

### 3.6 Spacing

Use a consistent 4 px base spacing system.

- Tight control spacing: 4–8 px.
- Related content: 12–16 px.
- Card padding: 20–24 px.
- Section spacing: 24–32 px.
- Major page section spacing: 32–48 px.
- Keep dashboard content aligned to a consistent grid.

---

## 4. Application Layout System

### 4.1 Public website shell

The public marketing website should have its own layout, separate from the authenticated application.

**Header**
- Product logo / wordmark.
- Product, Features, Pricing and Resources links where applicable.
- Sign in link.
- Primary CTA: Start free / Get started.
- Sticky header only if it improves navigation; avoid excessive height.

**Footer**
- Product links.
- Company/contact links.
- Privacy Policy and Terms.
- Social links only when real accounts exist.

### 4.2 Authenticated application shell

Use a persistent left navigation sidebar inspired by the supplied checkout reference and refined with Linear/Attio-style restraint.

**Desktop layout**
- Sidebar: approximately 240–260 px expanded.
- Optional collapsed sidebar: approximately 72–80 px.
- Main content fills remaining width.
- Top bar contains page context, institute/workspace switcher if applicable, help, notifications and user menu.
- Main content has a readable maximum width; data-heavy pages may use more width.

**Sidebar groups**
1. Overview
2. Admissions
   - Leads / Inquiries
   - Follow-ups
   - Admissions
3. Marketing
   - AI Content Studio
   - Campaigns
4. Insights
   - Analytics
   - Student Success / Testimonials
5. Workspace
   - Team & Roles
   - Institute Settings
   - Subscription & Billing

Only show links that the current role is authorized to access. Platform Super Admin should have a separate platform-level navigation experience rather than seeing institute navigation mixed into it.

**Sidebar behaviour**
- Clear active item with a soft teal background and strong text/icon.
- Icons should be consistent in size and stroke.
- Tooltips on collapsed navigation.
- Labels should remain visible on desktop unless the user deliberately collapses the sidebar.
- On mobile, use a drawer or compact navigation pattern; do not squeeze the desktop sidebar into a narrow screen.

### 4.3 Page header pattern

Every authenticated module should use a consistent page header:
- Breadcrumb or module context when useful.
- Page title.
- One-line description only when it adds clarity.
- Primary action aligned to the right on desktop.
- Filters and secondary actions below the title or in a toolbar.

Avoid oversized page headers that push useful content below the fold.

---

## 5. Page-by-Page UI Specification

### 5.1 Public landing page

**Goal:** Convert coaching institute owners and decision-makers into trial registrations or demo inquiries.

Suggested section order:
1. Header/navigation.
2. Hero: outcome-led headline, supporting copy, primary CTA and secondary CTA.
3. Product preview: realistic dashboard/CRM/AI Studio visual.
4. Core benefits: attract inquiries, manage admissions, create marketing content, understand growth.
5. How it works: capture inquiry → follow up → convert admission → measure results.
6. Feature sections with product screenshots.
7. Trust/proof section: verified testimonials, customer logos or real metrics only when available.
8. Pricing overview.
9. FAQ.
10. Final CTA and footer.

**Hero copy direction (draft):**
- Headline: “Turn more inquiries into admissions.”
- Supporting text: “One workspace to manage your coaching institute’s growth—from lead follow-ups to AI-powered marketing and performance insights.”
- Primary CTA: “Start free”
- Secondary CTA: “Explore the platform”

Do not claim guaranteed admission growth or fabricated customer results.

### 5.2 Signup and login

**Signup inspiration:** Brilliant reference.

**Desktop**
- Split-screen composition.
- One side: brand mark, concise value proposition and simple abstract/product illustration.
- Other side: focused signup form with clear heading.
- Social sign-in can be offered above or below the divider if configured.
- Terms and privacy links below the primary action.
- Existing-user login link clearly visible.

**Login**
- Email and password.
- Show/hide password.
- Forgot password.
- Remember session only if supported by auth/session policy.
- Clear validation and authentication error states.
- Avoid adding unrelated fields to login.

**Signup/onboarding**
- Keep account creation separate from the longer institute setup if that makes the flow easier.
- Ask only for information needed at each step.
- Clearly show progress for multi-step onboarding.
- Do not imply email verification, trial duration or signup options are final until product decisions are confirmed.

### 5.3 Institute onboarding

Use a calm, guided, step-by-step setup flow.

Potential steps:
1. Create account.
2. Institute name and basic profile.
3. Institute type / courses offered.
4. Contact and location details.
5. Invite team members (skippable if appropriate).
6. Finish setup and enter dashboard.

Principles:
- Progress indicator.
- Save and continue where feasible.
- Explain why a field is needed.
- Do not request unnecessary information.
- Show a completion state and a clear next action.

### 5.4 Main dashboard

**Goal:** Give institute owners and authorized staff a fast understanding of current operations.

Suggested hierarchy:
1. Welcome/context row with institute and date range.
2. KPI cards:
   - Total inquiries.
   - New inquiries.
   - Follow-ups due.
   - Admissions confirmed.
   - Conversion rate.
3. Inquiry/admission trend chart.
4. Lead pipeline summary.
5. Recent inquiries / recent activity.
6. Upcoming follow-ups.
7. Campaign performance snapshot.
8. Quick actions: Add inquiry, Create content, View analytics.

Rules:
- KPI cards should have a clear label, value, comparison period and optional trend.
- Never show fake percentage changes.
- Use skeletons during loading and useful empty states for new institutes.
- Dashboard content must adapt to role permissions; counsellors should see their relevant workload, not owner-only billing data.

### 5.5 Admissions CRM

**Goal:** Make inquiry handling and follow-up simple and fast.

Primary views:
- Kanban pipeline.
- Searchable/filterable table.
- Lead detail panel or detail page.

Potential pipeline stages (confirm against the product workflow):
- New
- Contacted
- Interested
- Follow-up
- Converted
- Lost

Lead list/table:
- Student/inquiry name.
- Contact details with privacy-aware display.
- Course or exam interest.
- Source/campaign.
- Assigned counsellor.
- Current stage.
- Last contact / next follow-up.
- Created date.

Lead detail:
- Contact and inquiry information.
- Course/exam interest.
- Source attribution.
- Assigned counsellor.
- Activity timeline.
- Notes.
- Follow-up history and next action.
- Admission status and relevant actions.

Interactions:
- Search, filter, sort and pagination.
- Drag-and-drop Kanban only with clear status feedback and a non-drag alternative.
- Confirmation for destructive or irreversible actions.
- Quick-add inquiry form with sensible validation.
- Clear empty, loading, error and success states.

### 5.6 Follow-ups and communication

- Dedicated list/calendar-style view for due and upcoming follow-ups.
- Filters for overdue, today, upcoming and completed.
- Each follow-up should link back to the relevant inquiry.
- Show owner/assignee, due date, method and status.
- MVP WhatsApp action may open a prefilled WhatsApp link if that is the agreed integration; do not imply messages are automatically sent.
- Show clear confirmation when a follow-up is completed or rescheduled.

### 5.7 AI Marketing & Content Studio

**Goal:** Make AI-assisted content creation feel like a focused professional workspace.

Layout:
- Left or top configuration area: content type, platform, audience, course/exam, tone, language and prompt/context.
- Main workspace: generated draft with editable content.
- Secondary panel: variants, suggestions, saved content or content history.

MVP content types may include:
- Social captions.
- Reel/video scripts.
- WhatsApp message drafts.
- Syllabus-to-content repurposing.
- Campaign copy.

Interaction rules:
- Make the user's inputs visible before generation.
- Show generation/loading state and handle provider failures.
- Generated content is a draft until the user reviews and saves/approves it.
- Provide regenerate, edit, copy and save actions.
- Clearly distinguish AI-generated drafts from published content.
- Do not suggest automatic social publishing unless a supported integration is implemented.
- Use a subtle AI accent treatment (soft teal/violet highlight or small AI label), not a separate neon visual theme.

### 5.8 Marketing campaigns and analytics

Campaign management:
- Campaign name and channel.
- Course/exam or target audience.
- Start/end dates.
- Budget/spend.
- Tracking URL / UTM information.
- Campaign status.

Analytics dashboard:
- Inquiries over time.
- Inquiry source breakdown.
- Campaign performance.
- Cost per inquiry (CPI).
- Cost per admission (CPA).
- Admission conversion trend.
- Date-range and campaign filters.

Rules:
- Define metric formulas consistently and expose them in tooltips/help text.
- Make date range visible.
- Distinguish actual spend from planned budget.
- If data is incomplete, show “Not enough data” rather than a misleading zero or invented trend.
- Prefer simple, readable charts over decorative visualizations.

### 5.9 Student Success and Testimonials

- Achievement records should be clearly separated from public testimonials.
- Show student name or approved display name, course/exam, achievement, year and verification status as appropriate.
- Include consent/approval status before any public use.
- Use private storage for uploaded media until approved.
- AI-generated announcement text must remain an editable draft.
- Do not expose private student information in public pages without appropriate consent.

### 5.10 Subscription and billing

Use the supplied teal checkout reference as a layout inspiration.

**Plan overview**
- Current plan and status.
- Renewal/billing date.
- Usage or plan limits only where meaningful.
- Upgrade/downgrade actions.
- Payment history and invoices/receipts where supported.

**Checkout**
- Main area: payment/checkout flow.
- Side panel: selected plan, billing frequency, price and included benefits.
- Strong primary CTA.
- Clear terms and payment status.

Razorpay should handle the secure payment collection flow. The app must not collect or store raw card details itself.

Payment states:
- Active.
- Trial (only if trial is approved).
- Payment pending.
- Payment failed / action required.
- Grace period (only if policy is approved).
- Read-only / restricted (only if policy is approved).
- Cancelled / expired.

Do not hard-code unconfirmed trial duration, grace period, pricing or plan limits into UI copy.

### 5.11 Team, roles and institute settings

- Team table with member, role, status and invitation state.
- Invite member action.
- Role changes with clear permission explanation.
- Remove/deactivate confirmation.
- Institute profile and branding settings.
- Notification preferences where supported.
- Security and account settings.

Do not show controls that the current user cannot use. UI restrictions complement, but never replace, backend authorization.

### 5.12 Platform Super Admin

A separate platform-level workspace for authorized platform operators.

Potential areas:
- Institute directory and account status.
- Subscription overview.
- Platform-level usage and operational metrics.
- Support/administrative actions.
- Audit activity.

Keep platform-level operations visually and structurally distinct from an institute's workspace. Never expose one institute's private records to another institute.

---

## 6. Role-Aware Navigation and Experience

The architecture identifies these roles:

| Role | Primary UI focus |
|---|---|
| Platform Super Admin | Platform operations and institute administration |
| Institute Owner | Overview, team, all enabled modules, analytics, billing and settings |
| Institute Administrator | Institute operations and permitted management features |
| Admission Counsellor | Assigned inquiries, lead pipeline, follow-ups and admission status |
| Marketing Manager | AI Content Studio, campaigns and marketing analytics |
| Teacher / Faculty | Permitted educational content and student achievement records |

The exact permission matrix remains governed by the product authorization specification. UI navigation must be generated from the user's authorized capabilities, not from assumptions based only on role labels.

---

## 7. Responsive Behaviour

The platform is desktop-first for complex CRM and analytics workflows, but must remain fully usable on tablets and phones.

### Desktop (≥ 1200 px)
- Full sidebar.
- Multi-column KPI and dashboard layouts.
- Wide tables and charts.
- Side-by-side forms and summaries where useful.

### Tablet (768–1199 px)
- Collapsible sidebar.
- Reduce KPI columns.
- Keep filters accessible.
- Tables may scroll horizontally only when a card/list alternative is not appropriate.

### Mobile (< 768 px)
- Drawer or compact navigation.
- Single-column content.
- Stack form fields.
- KPI cards in a compact grid or vertical list.
- Convert complex tables into readable cards or prioritized mobile lists.
- Kanban should support a mobile-friendly stage/list interaction.
- Sticky primary actions only when they do not obstruct content.
- Touch targets should be comfortably sized (around 44 px minimum).

Do not simply shrink desktop layouts; adapt the information architecture to the available space.

---

## 8. Component and Interaction Standards

Build reusable components for:
- Buttons (primary, secondary, tertiary, destructive).
- Text inputs, password inputs, selects, textareas and date pickers.
- Form labels, helper text, validation and error messages.
- Cards and KPI cards.
- Status badges.
- Tabs and segmented controls.
- Data tables, filters, pagination and empty states.
- Dialogs, drawers, popovers and dropdown menus.
- Toasts/inline notifications.
- Charts and chart tooltips.
- Skeleton loaders.
- Breadcrumbs and page headers.
- Activity timelines.
- AI generation panels and content preview blocks.

### Interaction states

Every interactive component must define:
- Default.
- Hover.
- Focus-visible.
- Active/pressed.
- Disabled.
- Loading (where applicable).
- Error/invalid (where applicable).
- Success (where applicable).

Use restrained motion:
- Short transitions for hover, focus and opening/closing overlays.
- Avoid animated counters, excessive parallax and distracting background motion.
- Respect reduced-motion preferences.

---

## 9. Accessibility and Usability

- Maintain readable contrast for text and controls.
- Ensure keyboard navigation and visible focus indicators.
- Use semantic headings and form labels.
- Provide accessible names for icon-only buttons.
- Do not use colour as the only indicator of status.
- Ensure charts have text summaries or accessible data alternatives.
- Support browser zoom and responsive text.
- Use clear, plain-language validation messages.
- Keep important actions predictable and consistent.

---

## 10. Empty, Loading, Error and Success States

Design these states as part of each module, not as an afterthought.

Examples:
- No inquiries yet → explain how to add the first inquiry.
- No campaigns → offer a clear create-campaign action.
- No AI content → show example content types and a start action.
- No analytics data → explain what data is needed before metrics appear.
- Loading → use layout-matched skeletons.
- Network/API failure → explain what failed and offer a safe retry.
- Permission denied → explain that access is unavailable without exposing restricted data.
- Payment pending/failed → clearly explain status and the next action.

Avoid generic “Something went wrong” messages when a more useful explanation is possible.

---

## 11. Content and Microcopy Principles

- Use concise, direct and professional language.
- Prefer action labels such as “Add inquiry”, “Create campaign”, “Generate draft” and “Schedule follow-up”.
- Avoid vague labels such as “Manage stuff” or “Magic”.
- Explain metrics in plain language.
- Clearly label AI-generated content as a draft.
- Do not claim automation or integrations that are not implemented.
- Use consistent terminology: inquiry/lead, admission, campaign, follow-up, institute and subscription.

---

## 12. Technical UI Implementation Guidance

The application architecture is Next.js + React with Supabase services.

UI implementation should:
- Use a consistent component system and centralized design tokens.
- Keep page layouts and reusable components separate.
- Use shared form validation patterns.
- Use role-aware navigation and permission-aware actions.
- Enforce all real authorization through Supabase RLS and trusted backend logic; hiding UI elements is not security.
- Keep AI provider calls behind trusted backend functions; never expose secret API keys in the browser.
- Show clear pending/success/failure states for asynchronous AI and payment operations.
- Avoid coupling UI components directly to provider-specific assumptions.
- Keep charts driven by real queried data and documented metric definitions.

The UI specification does not change the approved backend architecture or make unresolved product decisions final.

---

## 13. MVP Scope vs Future UI

### Design for the MVP
- Public landing page.
- Signup, login and password recovery.
- Institute onboarding.
- Role-aware application shell.
- Dashboard.
- Inquiry/lead CRM.
- Follow-ups.
- Text-based AI Content Studio.
- Campaign tracking and analytics.
- Student achievement/testimonial management with consent controls.
- Subscription and billing screens.
- Team and institute settings.
- Platform Super Admin area.

### Keep extensible; do not imply available in MVP unless confirmed
- Official WhatsApp Business API automation.
- Direct social media publishing.
- AI image generation or canvas editor.
- Speech-to-text lecture processing.
- Student academic performance/LMS features.
- Advanced multi-branch workflows.
- Additional AI modalities and integrations.

---

## 14. Open Design and Product Decisions

The following items should remain configurable or clearly marked as pending until confirmed:

1. Final product name, logo and brand assets.
2. Final font hosting and font weights.
3. Final palette after viewing the first dashboard implementation.
4. Exact institute onboarding fields and sequence.
5. Final role-permission matrix.
6. Subscription plans, prices, limits and billing rules.
7. Whether a free trial exists and its duration.
8. Payment failure and grace-period behaviour.
9. Exact lead pipeline stages and required lead fields.
10. Final AI provider and supported generation formats.
11. Which WhatsApp and social integrations are available in MVP.
12. Final responsive navigation behaviour after testing on real screen sizes.

Do not invent values for these decisions. Keep UI copy and components adaptable.

---

## 15. Reference Asset Register

Keep the following assets with this document:

| Asset | File / URL | Purpose |
|---|---|---|
| Brilliant signup reference | `ui_references/01-brilliant-signup-inspiration.png` | Signup layout, whitespace, form hierarchy, illustration |
| Teal checkout reference | `ui_references/02-teal-subscription-checkout-inspiration.jpg` | Sidebar, teal panel, checkout and plan summary |
| Moss website | https://www.moss.dev/ | Landing page storytelling and product presentation |
| Mobbin | https://mobbin.com/ | Real web-app screenshots and user flows |
| SaaSFrame | https://www.saasframe.io/ | SaaS website and dashboard references |
| Attio | https://attio.com/ | CRM interaction patterns |
| Linear | https://linear.app/ | Workspace and navigation patterns |
| HubSpot | https://www.hubspot.com/ | CRM and marketing workflows |
| Canva | https://www.canva.com/ | Content creation workspace |
| Stripe | https://stripe.com/ | Billing and payment UX |

When adding future screenshots, use descriptive filenames and record:
- Source URL.
- Product and screen name.
- Module where it will be used.
- What specifically is worth borrowing.
- What should not be copied.
- Date captured, if useful.

---

## 16. Instructions for Antigravity

Treat this file as the primary UI/UX design specification.

Before implementing UI:
1. Read this entire `UI.md`, the PRD, `technical_architecture.md` and `EXECUTION_PLAN.md`.
2. Inspect all images in `ui_references/`.
3. Translate the design tokens into centralized theme variables.
4. Build a consistent reusable component system before creating many disconnected pages.
5. Implement the public marketing shell separately from the authenticated application shell.
6. Implement role-aware navigation and responsive behaviour.
7. Use realistic but clearly identified demo data only in development; never present fabricated metrics as real.
8. Implement loading, empty, error, disabled and success states for each major workflow.
9. Test the main screens at desktop, tablet and mobile widths.
10. Run the production build and resolve UI-related errors before reporting completion.

**Important constraints**
- This is a web application built with Next.js and React, not a native Android/iOS application.
- Supabase remains the backend platform.
- Do not change the product scope or technical architecture while implementing the UI.
- Do not silently finalize any open business decision listed above.
- Do not copy another product's exact branding or screenshots.
- Prioritize visual consistency, clarity, usability and responsive behaviour over decorative effects.

---

## 17. Definition of a Successful UI

The UI is successful when:
- The product feels like one coherent premium SaaS platform.
- Users can understand the main navigation without training.
- Owners can identify institute performance and urgent actions quickly.
- Counsellors can process inquiries and follow-ups efficiently.
- Marketing users can create and manage content without a cluttered interface.
- Analytics are understandable and honest about data availability.
- Billing status and next actions are unambiguous.
- Role-based access is reflected in the experience.
- The product works well on desktop, tablet and mobile.
- The design remains consistent across public, authentication and authenticated screens.
