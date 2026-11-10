import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Users,
  BarChart3,
  Award,
  Layers,
  Bot,
  FileSpreadsheet,
  Clock,
  TrendingDown,
  FileEdit,
  EyeOff,
  Check,
  UserCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PublicNavbar } from '@/components/marketing/public-navbar';
import { PublicFooter } from '@/components/marketing/public-footer';
import { SectionHeading } from '@/components/marketing/section-heading';
import { CTASection } from '@/components/marketing/cta-section';

export const metadata = {
  title: 'AcademyGrowth — AI-Powered Coaching Academy Growth & Admissions Platform',
  description:
    'Turn more student inquiries into admissions. The all-in-one AI platform to organize CRM leads, run automated marketing campaigns, and grow your coaching academy.',
};

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-text-primary antialiased selection:bg-brand-100 selection:text-brand-900">
      <PublicNavbar />

      <main className="flex-1">
        {/* ========================================================================= */}
        {/* 1. HERO SECTION WITH MARKOVA-INSPIRED ARCHITECTURAL GRID                  */}
        {/* ========================================================================= */}
        <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 lg:pt-24 lg:pb-32 bg-markova-grid-hero border-b border-border-subtle/60">
          {/* Subtle geometric lighting accents */}
          <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[850px] h-[450px] rounded-full bg-brand-200/25 blur-3xl" />
          <div className="pointer-events-none absolute top-1/3 -right-24 w-80 h-80 rounded-full bg-brand-100/40 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            {/* Supporting label badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-300 bg-white/90 px-4 py-1.5 text-xs sm:text-sm font-semibold text-brand-900 shadow-soft backdrop-blur-sm mb-6">
              <Sparkles className="h-4 w-4 text-brand-700" />
              <span>Smarter Growth for Coaching Institutes</span>
            </div>

            {/* Main Headline (Clean green text highlight without underline) */}
            <h1 className="mx-auto max-w-4xl font-heading text-3xl font-extrabold tracking-tight text-text-primary sm:text-5xl lg:text-6xl leading-[1.15]">
              Turn More Inquiries into{' '}
              <span className="text-brand-900">
                Admissions
              </span>{' '}
              with AI
            </h1>

            {/* Supporting description */}
            <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg lg:text-xl text-text-secondary leading-relaxed">
              All-in-one platform to manage leads, run smart marketing, and grow
              your coaching institute faster.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Link href="/signup" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-brand-900 text-white hover:bg-brand-800 h-12 px-8 text-base font-semibold shadow-medium hover:shadow-strong transition-all duration-200"
                >
                  <span>Start Free Trial</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-border-subtle bg-white hover:bg-neutral-50 text-text-primary h-12 px-8 text-base font-medium shadow-soft hover:shadow-medium transition-all duration-200"
                >
                  Watch Demo
                </Button>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm text-text-secondary">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-brand-700" />
                <span>14-Day Free Trial</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-brand-700" />
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-brand-700" />
                <span>Setup in 15 Minutes</span>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* 2. DASHBOARD PREVIEW IN ARCHITECTURAL FRAME (ENHANCED DEPTH)               */}
            {/* ========================================================================= */}
            <div className="relative mx-auto mt-12 sm:mt-16 max-w-6xl">
              <div className="group relative rounded-2xl border border-brand-200/90 bg-white/95 p-2.5 sm:p-4 shadow-strong backdrop-blur-sm sm:rounded-3xl transition-all duration-300 hover:shadow-elevation hover:border-brand-300">
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl sm:rounded-2xl bg-neutral-100">
                  <Image
                    src="/assets/images/AcademyGrowth SaaS Dashboard Hero.png"
                    alt="AcademyGrowth SaaS Dashboard Hero Preview showing CRM pipeline, admissions metrics, and AI campaign tools"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.01]"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. PROBLEM SECTION (BALANCED 3-COLUMN DESKTOP / 2-COL TABLET GRID)         */}
        {/* ========================================================================= */}
        <section className="border-t border-border-subtle bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="The Problem"
              title="Growing a Coaching Institute Shouldn't Be This Complicated"
              description="Managing admissions and marketing with fragmented tools leads to lost students and wasted budgets."
            />

            {/* Desktop: 3 equal columns in row 1, centered 2 equal columns in row 2 */}
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-6">
              {/* Problem 1 */}
              <div className="flex flex-col justify-start rounded-2xl border border-border-subtle bg-surface p-6 shadow-medium transition-all duration-200 ease-out hover:border-brand-300 hover:shadow-strong hover:-translate-y-1 min-h-[220px] sm:col-span-1 lg:col-span-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600 mb-4 shrink-0 transition-transform duration-200 group-hover:scale-105">
                  <FileSpreadsheet className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-lg font-bold text-text-primary">
                  Inquiries Scattered Everywhere
                </h3>
                <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                  Student inquiries get lost across paper registers, multiple
                  WhatsApp numbers, messy Google Sheets, and lost sticky notes.
                </p>
              </div>

              {/* Problem 2 */}
              <div className="flex flex-col justify-start rounded-2xl border border-border-subtle bg-surface p-6 shadow-medium transition-all duration-200 ease-out hover:border-brand-300 hover:shadow-strong hover:-translate-y-1 min-h-[220px] sm:col-span-1 lg:col-span-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600 mb-4 shrink-0 transition-transform duration-200 group-hover:scale-105">
                  <Clock className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-lg font-bold text-text-primary">
                  Missed Follow-Ups & Lost Admissions
                </h3>
                <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                  Counsellors forget timely callbacks to interested parents. By the
                  time you follow up, the student has already enrolled elsewhere.
                </p>
              </div>

              {/* Problem 3 */}
              <div className="flex flex-col justify-start rounded-2xl border border-border-subtle bg-surface p-6 shadow-medium transition-all duration-200 ease-out hover:border-brand-300 hover:shadow-strong hover:-translate-y-1 min-h-[220px] sm:col-span-1 lg:col-span-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-600 mb-4 shrink-0 transition-transform duration-200 group-hover:scale-105">
                  <TrendingDown className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-lg font-bold text-text-primary">
                  Blind Marketing Spend
                </h3>
                <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                  Thousands of rupees poured into pamphlets, local newspapers, and
                  Meta ads without knowing which channel produced actual admissions.
                </p>
              </div>

              {/* Problem 4 (Desktop centered 2-col row: offset 1 column via lg:col-start-2) */}
              <div className="flex flex-col justify-start rounded-2xl border border-border-subtle bg-surface p-6 shadow-medium transition-all duration-200 ease-out hover:border-brand-300 hover:shadow-strong hover:-translate-y-1 min-h-[220px] sm:col-span-1 lg:col-start-2 lg:col-span-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-purple-600 mb-4 shrink-0 transition-transform duration-200 group-hover:scale-105">
                  <FileEdit className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-lg font-bold text-text-primary">
                  Exhausting Content Creation
                </h3>
                <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                  Directors spend hours struggling to draft engaging promotional
                  copy, WhatsApp broadcast announcements, and exam tips.
                </p>
              </div>

              {/* Problem 5 (Equal dimensions as all cards) */}
              <div className="flex flex-col justify-start rounded-2xl border border-border-subtle bg-surface p-6 shadow-medium transition-all duration-200 ease-out hover:border-brand-300 hover:shadow-strong hover:-translate-y-1 min-h-[220px] sm:col-span-1 lg:col-span-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-100 text-neutral-700 mb-4 shrink-0 transition-transform duration-200 group-hover:scale-105">
                  <EyeOff className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-lg font-bold text-text-primary">
                  No Unified View of Growth
                </h3>
                <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                  Directors lack a single real-time dashboard connecting marketing
                  spend, counsellor workload, active follow-ups, and confirmed batch
                  revenue.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. SOLUTION SECTION                                                       */}
        {/* ========================================================================= */}
        <section className="bg-background py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="The Solution"
              title="Everything You Need to Grow Your Institute"
              description="AcademyGrowth unites your entire admissions and growth lifecycle in one intelligent workspace."
            />

            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Feature Highlight 1 */}
              <div className="rounded-2xl border border-border-subtle bg-white p-6 shadow-medium transition-all duration-200 ease-out hover:border-brand-300 hover:shadow-strong hover:-translate-y-1">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-900 mb-4">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-lg font-bold text-text-primary">
                  Admission CRM Pipeline
                </h3>
                <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                  Visual Kanban board customized for coaching academy workflows: New
                  Inquiry, Contacted, Counselling Scheduled, Scholarship Test, and
                  Enrolled.
                </p>
              </div>

              {/* Feature Highlight 2 */}
              <div className="rounded-2xl border border-border-subtle bg-white p-6 shadow-medium transition-all duration-200 ease-out hover:border-brand-300 hover:shadow-strong hover:-translate-y-1">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-900 mb-4">
                  <Sparkles className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-lg font-bold text-text-primary">
                  AI Marketing Content Studio
                </h3>
                <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                  Generate exam countdowns, topper announcements, WhatsApp
                  broadcast messages, and Meta ad copy tailored for JEE, NEET, CET,
                  and UPSC.
                </p>
              </div>

              {/* Feature Highlight 3 */}
              <div className="rounded-2xl border border-border-subtle bg-white p-6 shadow-medium transition-all duration-200 ease-out hover:border-brand-300 hover:shadow-strong hover:-translate-y-1">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-900 mb-4">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-lg font-bold text-text-primary">
                  Marketing Campaign Analytics
                </h3>
                <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                  Track offline pamphlets, digital ads, and seminar costs. Measure
                  exact Cost Per Inquiry (CPI) and Cost Per Admission (CPA).
                </p>
              </div>

              {/* Feature Highlight 4 */}
              <div className="rounded-2xl border border-border-subtle bg-white p-6 shadow-medium transition-all duration-200 ease-out hover:border-brand-300 hover:shadow-strong hover:-translate-y-1">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-900 mb-4">
                  <Award className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-lg font-bold text-text-primary">
                  Student Success Vault
                </h3>
                <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                  Centralize student achievements, ranks, scorecards, and parent
                  testimonials to build irresistible social proof.
                </p>
              </div>

              {/* Feature Highlight 5 */}
              <div className="rounded-2xl border border-border-subtle bg-white p-6 shadow-medium transition-all duration-200 ease-out hover:border-brand-300 hover:shadow-strong hover:-translate-y-1">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-900 mb-4">
                  <UserCheck className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-lg font-bold text-text-primary">
                  Counsellor Accountability
                </h3>
                <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                  Assign leads to specific counsellors, track response times, log
                  call notes, and ensure zero inquiries slip through the cracks.
                </p>
              </div>

              {/* Feature Highlight 6 */}
              <div className="rounded-2xl border border-border-subtle bg-white p-6 shadow-medium transition-all duration-200 ease-out hover:border-brand-300 hover:shadow-strong hover:-translate-y-1">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-900 mb-4">
                  <Bot className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-lg font-bold text-text-primary">
                  AI Growth Recommendations
                </h3>
                <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                  Proactive suggestions to unblock slow follow-up queues, launch
                  timely crash-course campaigns, and optimize marketing spend.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. CORE MODULES PREVIEW                                                    */}
        {/* ========================================================================= */}
        <section className="border-t border-border-subtle bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Core Modules"
              title="Explore AcademyGrowth Modules"
              description="Purpose-built features designed specifically for the unique workflows of Indian coaching academies."
            />

            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Feature 1 */}
              <Card className="flex flex-col justify-between border-border-subtle hover:border-brand-300 transition-all duration-200 ease-out hover:shadow-strong hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-900 mb-4">
                    <Layers className="h-5 w-5" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-text-primary">
                    Admission CRM
                  </h3>
                  <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                    Track leads from initial inquiry to confirmed admission with
                    Kanban pipeline stages, counsellor assignments, and automated
                    follow-ups.
                  </p>
                </CardContent>
                <div className="border-t border-border-subtle p-4 bg-neutral-50/50 rounded-b-xl">
                  <Link
                    href="/features#admission-crm"
                    className="inline-flex items-center text-xs font-semibold text-brand-900 hover:text-brand-700 transition-colors"
                  >
                    <span>Learn about CRM</span>
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Link>
                </div>
              </Card>

              {/* Feature 2 */}
              <Card className="flex flex-col justify-between border-border-subtle hover:border-brand-300 transition-all duration-200 ease-out hover:shadow-strong hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-900 mb-4">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-text-primary">
                    AI Content Studio
                  </h3>
                  <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                    Generate exam countdowns, topper announcements, WhatsApp
                    broadcast messages, and ad copy tailored for JEE, NEET, and CET.
                  </p>
                </CardContent>
                <div className="border-t border-border-subtle p-4 bg-neutral-50/50 rounded-b-xl">
                  <Link
                    href="/features#content-studio"
                    className="inline-flex items-center text-xs font-semibold text-brand-900 hover:text-brand-700 transition-colors"
                  >
                    <span>Explore Content Studio</span>
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Link>
                </div>
              </Card>

              {/* Feature 3 */}
              <Card className="flex flex-col justify-between border-border-subtle hover:border-brand-300 transition-all duration-200 ease-out hover:shadow-strong hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-900 mb-4">
                    <BarChart3 className="h-5 w-5" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-text-primary">
                    Marketing Analytics
                  </h3>
                  <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                    Track campaigns and know your true Cost Per Inquiry and Cost Per
                    Admission across every channel.
                  </p>
                </CardContent>
                <div className="border-t border-border-subtle p-4 bg-neutral-50/50 rounded-b-xl">
                  <Link
                    href="/features#analytics"
                    className="inline-flex items-center text-xs font-semibold text-brand-900 hover:text-brand-700 transition-colors"
                  >
                    <span>View Analytics Features</span>
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Link>
                </div>
              </Card>

              {/* Feature 4 */}
              <Card className="flex flex-col justify-between border-border-subtle hover:border-brand-300 transition-all duration-200 ease-out hover:shadow-strong hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-900 mb-4">
                    <Award className="h-5 w-5" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-text-primary">
                    Student Success Vault
                  </h3>
                  <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                    Organize student achievements, ranks, and parent testimonials to
                    build unshakeable institutional credibility.
                  </p>
                </CardContent>
                <div className="border-t border-border-subtle p-4 bg-neutral-50/50 rounded-b-xl">
                  <Link
                    href="/features#success-vault"
                    className="inline-flex items-center text-xs font-semibold text-brand-900 hover:text-brand-700 transition-colors"
                  >
                    <span>Discover Success Vault</span>
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Link>
                </div>
              </Card>

              {/* Feature 5 */}
              <Card className="flex flex-col justify-between border-border-subtle hover:border-brand-300 transition-all duration-200 ease-out hover:shadow-strong hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-900 mb-4">
                    <Users className="h-5 w-5" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-text-primary">
                    Team Management
                  </h3>
                  <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                    Manage counsellors and marketers with individual accounts,
                    responsibilities, and secure institute-level permissions.
                  </p>
                </CardContent>
                <div className="border-t border-border-subtle p-4 bg-neutral-50/50 rounded-b-xl">
                  <Link
                    href="/features#team"
                    className="inline-flex items-center text-xs font-semibold text-brand-900 hover:text-brand-700 transition-colors"
                  >
                    <span>Explore Team Controls</span>
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Link>
                </div>
              </Card>

              {/* Feature 6 */}
              <Card className="flex flex-col justify-between border-border-subtle hover:border-brand-300 transition-all duration-200 ease-out hover:shadow-strong hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-900 mb-4">
                    <Bot className="h-5 w-5" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-text-primary">
                    AI Growth Assistant
                  </h3>
                  <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                    Get intelligent insights and actionable recommendations to
                    prevent pipeline bottlenecks and improve inquiry conversions.
                  </p>
                </CardContent>
                <div className="border-t border-border-subtle p-4 bg-neutral-50/50 rounded-b-xl">
                  <Link
                    href="/features#ai-assistant"
                    className="inline-flex items-center text-xs font-semibold text-brand-900 hover:text-brand-700 transition-colors"
                  >
                    <span>Meet the AI Assistant</span>
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. CONNECTED WORKFLOW PIPELINE (WITHOUT SMALL ICONS/SVGS AS REQUESTED)    */}
        {/* ========================================================================= */}
        <section className="bg-background py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Workflow"
              title="From First Inquiry to Successful Admission"
              description="A seamless 5-stage student acquisition pipeline engineered for maximum enrollment velocity."
            />

            {/* Connected horizontal workflow container */}
            <div className="relative mt-14">
              {/* Connecting animated/dashed line on desktop */}
              <div className="hidden lg:block absolute top-10 left-12 right-12 h-0.5 border-t-2 border-dashed border-brand-300/80 z-0" />

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5 relative z-10">
                {/* Stage 1: Attract */}
                <div className="group relative flex flex-col justify-between rounded-2xl border border-border-subtle bg-white p-6 shadow-medium transition-all duration-200 ease-out hover:border-brand-300 hover:shadow-strong hover:-translate-y-1">
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-900 text-white font-heading font-extrabold text-base shadow-soft transition-transform duration-200 group-hover:scale-105">
                        01
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-brand-700 bg-brand-50 px-2.5 py-1 rounded-full border border-brand-200/60">
                        Step 1
                      </span>
                    </div>
                    <h4 className="font-heading text-lg font-bold text-text-primary">
                      Attract
                    </h4>
                    <p className="mt-2.5 text-xs sm:text-sm text-text-secondary leading-relaxed">
                      Launch targeted campaigns with AI-crafted marketing copy for JEE,
                      NEET, CET, or board exam batches.
                    </p>
                  </div>
                  <div className="mt-6 pt-3 border-t border-border-subtle/70 text-[11px] font-semibold text-brand-800">
                    Lead Generation
                  </div>
                </div>

                {/* Stage 2: Capture */}
                <div className="group relative flex flex-col justify-between rounded-2xl border border-border-subtle bg-white p-6 shadow-medium transition-all duration-200 ease-out hover:border-brand-300 hover:shadow-strong hover:-translate-y-1">
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-900 text-white font-heading font-extrabold text-base shadow-soft transition-transform duration-200 group-hover:scale-105">
                        02
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-brand-700 bg-brand-50 px-2.5 py-1 rounded-full border border-brand-200/60">
                        Step 2
                      </span>
                    </div>
                    <h4 className="font-heading text-lg font-bold text-text-primary">
                      Capture
                    </h4>
                    <p className="mt-2.5 text-xs sm:text-sm text-text-secondary leading-relaxed">
                      Gather leads automatically from walk-ins, digital ads, and web
                      forms into one central admission register.
                    </p>
                  </div>
                  <div className="mt-6 pt-3 border-t border-border-subtle/70 text-[11px] font-semibold text-brand-800">
                    Unified CRM Ingestion
                  </div>
                </div>

                {/* Stage 3: Connect */}
                <div className="group relative flex flex-col justify-between rounded-2xl border border-border-subtle bg-white p-6 shadow-medium transition-all duration-200 ease-out hover:border-brand-300 hover:shadow-strong hover:-translate-y-1">
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-900 text-white font-heading font-extrabold text-base shadow-soft transition-transform duration-200 group-hover:scale-105">
                        03
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-brand-700 bg-brand-50 px-2.5 py-1 rounded-full border border-brand-200/60">
                        Step 3
                      </span>
                    </div>
                    <h4 className="font-heading text-lg font-bold text-text-primary">
                      Connect
                    </h4>
                    <p className="mt-2.5 text-xs sm:text-sm text-text-secondary leading-relaxed">
                      Assign leads to counsellors, track conversation notes, and trigger
                      scheduled WhatsApp/call reminders.
                    </p>
                  </div>
                  <div className="mt-6 pt-3 border-t border-border-subtle/70 text-[11px] font-semibold text-brand-800">
                    Counsellor Follow-ups
                  </div>
                </div>

                {/* Stage 4: Convert */}
                <div className="group relative flex flex-col justify-between rounded-2xl border border-border-subtle bg-white p-6 shadow-medium transition-all duration-200 ease-out hover:border-brand-300 hover:shadow-strong hover:-translate-y-1">
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-900 text-white font-heading font-extrabold text-base shadow-soft transition-transform duration-200 group-hover:scale-105">
                        04
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-brand-700 bg-brand-50 px-2.5 py-1 rounded-full border border-brand-200/60">
                        Step 4
                      </span>
                    </div>
                    <h4 className="font-heading text-lg font-bold text-text-primary">
                      Convert
                    </h4>
                    <p className="mt-2.5 text-xs sm:text-sm text-text-secondary leading-relaxed">
                      Conduct counselling sessions, record scholarship tests, and move
                      students to confirmed admission.
                    </p>
                  </div>
                  <div className="mt-6 pt-3 border-t border-border-subtle/70 text-[11px] font-semibold text-brand-800">
                    Admission Confirmation
                  </div>
                </div>

                {/* Stage 5: Grow */}
                <div className="group relative flex flex-col justify-between rounded-2xl border border-border-subtle bg-white p-6 shadow-medium transition-all duration-200 ease-out hover:border-brand-300 hover:shadow-strong hover:-translate-y-1">
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-900 text-white font-heading font-extrabold text-base shadow-soft transition-transform duration-200 group-hover:scale-105">
                        05
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-brand-700 bg-brand-50 px-2.5 py-1 rounded-full border border-brand-200/60">
                        Step 5
                      </span>
                    </div>
                    <h4 className="font-heading text-lg font-bold text-text-primary">
                      Grow
                    </h4>
                    <p className="mt-2.5 text-xs sm:text-sm text-text-secondary leading-relaxed">
                      Analyze cost per admission, identify high-performing counsellors,
                      and optimize your marketing budget.
                    </p>
                  </div>
                  <div className="mt-6 pt-3 border-t border-border-subtle/70 text-[11px] font-semibold text-brand-800">
                    Data-Driven Scale
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 text-center">
              <Link href="/how-it-works">
                <Button variant="outline" className="border-border-subtle shadow-soft hover:bg-neutral-50 hover:border-brand-300">
                  <span>Explore the Complete Growth Journey</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 7. WHY ACADEMYGROWTH                                                      */}
        {/* ========================================================================= */}
        <section className="border-t border-border-subtle bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Why Choose Us"
              title="Built for the Way Coaching Institutes Grow"
              description="Generic CRMs are built for enterprise software sales. AcademyGrowth is tailored for education admissions."
            />

            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex items-start gap-4 rounded-xl border border-border-subtle p-5 bg-surface shadow-soft hover:shadow-medium hover:border-brand-300 transition-all duration-200">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-100 text-brand-900 shrink-0">
                  <Check className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-heading text-sm font-bold text-text-primary">
                    Coaching-Specific Pipelines
                  </h4>
                  <p className="mt-1 text-xs text-text-secondary leading-relaxed">
                    Pre-configured stages for walk-ins, scholarship tests, and batch
                    enrollments without custom coding.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-xl border border-border-subtle p-5 bg-surface shadow-soft hover:shadow-medium hover:border-brand-300 transition-all duration-200">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-100 text-brand-900 shrink-0">
                  <Check className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-heading text-sm font-bold text-text-primary">
                    AI-Assisted Workflows
                  </h4>
                  <p className="mt-1 text-xs text-text-secondary leading-relaxed">
                    Generate high-converting exam campaigns and topper promotions in
                    seconds.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-xl border border-border-subtle p-5 bg-surface shadow-soft hover:shadow-medium hover:border-brand-300 transition-all duration-200">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-100 text-brand-900 shrink-0">
                  <Check className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-heading text-sm font-bold text-text-primary">
                    Zero Inquiry Leakage
                  </h4>
                  <p className="mt-1 text-xs text-text-secondary leading-relaxed">
                    Track every student from first inquiry to fee submission with
                    counsellor accountability.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-xl border border-border-subtle p-5 bg-surface shadow-soft hover:shadow-medium hover:border-brand-300 transition-all duration-200">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-100 text-brand-900 shrink-0">
                  <Check className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-heading text-sm font-bold text-text-primary">
                    Data-Driven Decisions
                  </h4>
                  <p className="mt-1 text-xs text-text-secondary leading-relaxed">
                    Know your exact Cost Per Admission before allocating lakhs to
                    untested advertising channels.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-xl border border-border-subtle p-5 bg-surface shadow-soft hover:shadow-medium hover:border-brand-300 transition-all duration-200">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-100 text-brand-900 shrink-0">
                  <Check className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-heading text-sm font-bold text-text-primary">
                    Organized Team Operations
                  </h4>
                  <p className="mt-1 text-xs text-text-secondary leading-relaxed">
                    Empower counsellors, marketers, and administrators with clear
                    roles, permissions, and audit logs.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-xl border border-border-subtle p-5 bg-surface shadow-soft hover:shadow-medium hover:border-brand-300 transition-all duration-200">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-100 text-brand-900 shrink-0">
                  <Check className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-heading text-sm font-bold text-text-primary">
                    Scalable Institute Architecture
                  </h4>
                  <p className="mt-1 text-xs text-text-secondary leading-relaxed">
                    Engineered to grow seamlessly from a single coaching center to a
                    multi-branch regional academy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 8. DEDICATED AI SECTION WITH ANIMATED GIF                                 */}
        {/* ========================================================================= */}
        <section className="bg-gradient-to-b from-background via-[#EFF7F4]/50 to-background py-16 sm:py-24 border-t border-border-subtle">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
              <div>
                <SectionHeading
                  align="left"
                  badge="AI Marketing & Admissions Assistant"
                  title="Your AI-Powered Growth Partner"
                  description="Leverage domain-tuned AI designed for coaching academy growth. AcademyGrowth eliminates repetitive marketing toil so your educators can focus on teaching."
                />

                <div className="mt-8 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-100 text-brand-800 shrink-0 mt-0.5">
                      <Sparkles className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-text-primary">
                        Marketing Content Ideas
                      </h4>
                      <p className="text-xs text-text-secondary">
                        Fresh concepts for exam preparation tips, topper spotlight
                        posts, and parent orientation announcements.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-100 text-brand-800 shrink-0 mt-0.5">
                      <Sparkles className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-text-primary">
                        High-Converting Promotional Copy
                      </h4>
                      <p className="text-xs text-text-secondary">
                        Targeted headlines and descriptions for WhatsApp broadcasts,
                        Meta feed ads, and SMS alerts.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-100 text-brand-800 shrink-0 mt-0.5">
                      <Sparkles className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-text-primary">
                        Campaign & Performance Insights
                      </h4>
                      <p className="text-xs text-text-secondary">
                        Automated summaries highlighting which promotional campaigns
                        delivered the lowest cost-per-inquiry.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-100 text-brand-800 shrink-0 mt-0.5">
                      <Sparkles className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-text-primary">
                        Actionable Growth Recommendations
                      </h4>
                      <p className="text-xs text-text-secondary">
                        Proactive suggestions to unblock slow counsellor follow-up
                        queues and capitalize on seasonal exam dates.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <Link href="/features#content-studio">
                    <Button className="bg-brand-900 text-white hover:bg-brand-800 shadow-soft hover:shadow-medium hover:-translate-y-0.5 transition-all duration-200">
                      <span>Explore AI Capabilities</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Integrated AI Assistant Animated GIF */}
              <div className="flex w-full items-center justify-center">
                <div className="relative flex aspect-square w-full max-w-[460px] items-center justify-center overflow-hidden rounded-3xl border border-brand-200/80 bg-white p-4 shadow-medium transition-all duration-300 hover:shadow-strong hover:border-brand-300 hover:-translate-y-1">
                  <img
                    src="/assets/images/AI%20Marketing%20&%20Admissions%20Assistant%20Animation.gif"
                    alt="AI Marketing & Admissions Assistant Animated Visual"
                    className="h-full w-full object-contain"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 9. FINAL CTA SECTION                                                      */}
        {/* ========================================================================= */}
        <CTASection
          title="Ready to Grow Your Coaching Institute?"
          description="Bring your admissions, marketing, and growth activities together with AcademyGrowth. Start your 14-day free trial today."
          primaryCtaText="Start Your Free Trial"
          primaryCtaHref="/signup"
          secondaryCtaText="Explore Features"
          secondaryCtaHref="/features"
        />
      </main>

      <PublicFooter />
    </div>
  );
}
