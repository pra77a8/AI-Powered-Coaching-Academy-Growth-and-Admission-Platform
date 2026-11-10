import React from 'react';
import Link from 'next/link';
import {
  Layers,
  Sparkles,
  BarChart3,
  Award,
  Users,
  Bot,
  CheckCircle2,
  ArrowRight,
  Kanban,
  CalendarCheck,
  TrendingUp,
  FileCheck2,
  UserCheck,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PublicNavbar } from '@/components/marketing/public-navbar';
import { PublicFooter } from '@/components/marketing/public-footer';
import { SectionHeading } from '@/components/marketing/section-heading';
import { CTASection } from '@/components/marketing/cta-section';
import { AssetPlaceholder } from '@/components/marketing/asset-placeholder';

export const metadata = {
  title: 'Features — AcademyGrowth | Complete Growth Suite for Coaching Academies',
  description:
    'Explore Admission CRM, AI Content Studio, Campaign Analytics, Student Success Vault, and Team Management designed specifically for coaching institutes.',
};

export default function FeaturesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-text-primary antialiased">
      <PublicNavbar />

      <main className="flex-1">
        {/* Header Hero */}
        <section className="bg-gradient-to-b from-[#EFF7F4]/60 via-background to-background pt-16 pb-12 sm:pt-20 sm:pb-16 text-center">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Badge
              variant="outline"
              className="mb-4 border-brand-300 bg-white/80 px-3.5 py-1 text-xs font-semibold text-brand-900 shadow-soft"
            >
              Product Deep Dive
            </Badge>

            <h1 className="font-heading text-3xl font-extrabold tracking-tight text-text-primary sm:text-5xl lg:text-6xl leading-[1.15]">
              Everything Your Coaching Institute{' '}
              <span className="text-brand-900 underline decoration-brand-400 decoration-wavy decoration-from-font underline-offset-8">
                Needs to Grow
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-base sm:text-lg text-text-secondary leading-relaxed">
              Manage admissions, create marketing campaigns, track performance, and
              make smarter decisions with one connected, purpose-built platform.
            </p>
          </div>
        </section>

        {/* Feature 1: Admission CRM */}
        <section id="crm" className="border-t border-border-subtle bg-white py-16 sm:py-20 scroll-mt-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
              <div>
                <div className="inline-flex items-center gap-2 rounded-lg bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-900 mb-4">
                  <Kanban className="h-4 w-4 text-brand-700" />
                  <span>Module 1 • Admission CRM</span>
                </div>

                <h2 className="font-heading text-2xl font-bold tracking-tight text-text-primary sm:text-3xl lg:text-4xl">
                  Centralized Inquiry & Lead Pipeline Management
                </h2>

                <p className="mt-4 text-base text-text-secondary leading-relaxed">
                  Never let an inquiry slip through the cracks. The AcademyGrowth
                  CRM is structured as an interactive Kanban pipeline specifically
                  modeled around the Indian coaching admission lifecycle: from
                  initial inquiry to counselling, follow-up, and confirmed admission.
                </p>

                <div className="mt-6 space-y-3">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-5 w-5 text-brand-700 shrink-0 mt-0.5" />
                    <span className="text-sm text-text-primary">
                      <strong>Interactive Kanban Board:</strong> Visual stages
                      including New Inquiry, Contacted, Counselling Scheduled,
                      Interested, and Confirmed Admission.
                    </span>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-5 w-5 text-brand-700 shrink-0 mt-0.5" />
                    <span className="text-sm text-text-primary">
                      <strong>Automated Counsellor Routing:</strong> Round-robin or
                      course-specific lead assignment to admission counsellors.
                    </span>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-5 w-5 text-brand-700 shrink-0 mt-0.5" />
                    <span className="text-sm text-text-primary">
                      <strong>Follow-Up Timelines & Reminders:</strong> Date, time,
                      and notes log for every phone consultation, parent meeting, or
                      scholarship exam slot.
                    </span>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-5 w-5 text-brand-700 shrink-0 mt-0.5" />
                    <span className="text-sm text-text-primary">
                      <strong>Inquiry Status History:</strong> Full audit trail of
                      every interaction and status update.
                    </span>
                  </div>
                </div>

                <div className="mt-8">
                  <Link href="/signup">
                    <Button className="bg-brand-900 text-white hover:bg-brand-800">
                      <span>Try Admission CRM Free</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Visual Placeholder */}
              <div>
                <AssetPlaceholder
                  id="placeholder-feature-crm"
                  label="Admission CRM Kanban Pipeline Animation"
                  assetNeeded="Visual animation demonstrating drag-and-drop lead cards progressing through inquiry stages."
                  searchKeywords="CRM kanban pipeline dashboard animation Lottie JSON"
                  format="Lottie JSON"
                  aspectRatio="video"
                  icon="layers"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Feature 2: AI Content Studio */}
        <section
          id="content-studio"
          className="border-t border-border-subtle bg-background py-16 sm:py-20 scroll-mt-20"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
              <div className="order-2 lg:order-1">
                <AssetPlaceholder
                  id="placeholder-feature-content"
                  label="AI Marketing Content Generation Animation"
                  assetNeeded="Animation illustrating instant creation of high-converting social media copy and WhatsApp templates."
                  searchKeywords="AI writing assistant content generation animation Lottie"
                  format="Lottie JSON"
                  aspectRatio="video"
                  icon="sparkles"
                />
              </div>

              <div className="order-1 lg:order-2">
                <div className="inline-flex items-center gap-2 rounded-lg bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-900 mb-4">
                  <Sparkles className="h-4 w-4 text-brand-700" />
                  <span>Module 2 • AI Content Studio</span>
                </div>

                <h2 className="font-heading text-2xl font-bold tracking-tight text-text-primary sm:text-3xl lg:text-4xl">
                  AI-Powered Content & Copywriting Studio
                </h2>

                <p className="mt-4 text-base text-text-secondary leading-relaxed">
                  Eliminate writer&apos;s block and stop paying hefty marketing agency
                  retainers. AcademyGrowth generates targeted, persuasive promotional
                  content tailored to parent aspirations and student motivations.
                </p>

                <div className="mt-6 space-y-3">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-5 w-5 text-brand-700 shrink-0 mt-0.5" />
                    <span className="text-sm text-text-primary">
                      <strong>Promotional Captions & Social Ads:</strong> Generate
                      ready-to-post copy for Meta, Instagram, YouTube community, and
                      LinkedIn.
                    </span>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-5 w-5 text-brand-700 shrink-0 mt-0.5" />
                    <span className="text-sm text-text-primary">
                      <strong>WhatsApp Broadcast Templates:</strong> High-converting
                      announcement messages for batch launches, scholarship tests,
                      and syllabus workshops.
                    </span>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-5 w-5 text-brand-700 shrink-0 mt-0.5" />
                    <span className="text-sm text-text-primary">
                      <strong>Banner & Print Headlines:</strong> Punchy slogans and
                      copy for offline banners, hoardings, and pamphlet handouts.
                    </span>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-5 w-5 text-brand-700 shrink-0 mt-0.5" />
                    <span className="text-sm text-text-primary">
                      <strong>Education Domain Prompts:</strong> Custom-trained on
                      exam timelines, target percentiles, and academic credibility.
                    </span>
                  </div>
                </div>

                <div className="mt-8">
                  <Link href="/signup">
                    <Button className="bg-brand-900 text-white hover:bg-brand-800">
                      <span>Explore Content Studio</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature 3: Marketing Analytics */}
        <section
          id="analytics"
          className="border-t border-border-subtle bg-white py-16 sm:py-20 scroll-mt-20"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
              <div>
                <div className="inline-flex items-center gap-2 rounded-lg bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-900 mb-4">
                  <BarChart3 className="h-4 w-4 text-brand-700" />
                  <span>Module 3 • Marketing Analytics</span>
                </div>

                <h2 className="font-heading text-2xl font-bold tracking-tight text-text-primary sm:text-3xl lg:text-4xl">
                  Measure Campaign Expenditure, CPI, and True CPA
                </h2>

                <p className="mt-4 text-base text-text-secondary leading-relaxed">
                  Stop burning money on ineffective marketing. Track every marketing
                  rupee from offline seminars, hoarding banners, and digital ads to
                  measure your exact Cost Per Inquiry (CPI) and Cost Per Admission (CPA).
                </p>

                <div className="mt-6 space-y-3">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-5 w-5 text-brand-700 shrink-0 mt-0.5" />
                    <span className="text-sm text-text-primary">
                      <strong>Multi-Channel ROI Comparison:</strong> Compare
                      performance across Meta ads, Google Search, school seminars,
                      newspaper ads, and student referrals.
                    </span>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-5 w-5 text-brand-700 shrink-0 mt-0.5" />
                    <span className="text-sm text-text-primary">
                      <strong>Campaign Expense Tracker:</strong> Log marketing
                      budgets, dates, and target audiences with instant ROI
                      calculations.
                    </span>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-5 w-5 text-brand-700 shrink-0 mt-0.5" />
                    <span className="text-sm text-text-primary">
                      <strong>Conversion Funnel Drop-offs:</strong> Identify exactly
                      where students drop out of the admission funnel.
                    </span>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-5 w-5 text-brand-700 shrink-0 mt-0.5" />
                    <span className="text-sm text-text-primary">
                      <strong>Monthly Growth Reports:</strong> Exportable analytics
                      for leadership meetings and investor reviews.
                    </span>
                  </div>
                </div>

                <div className="mt-8">
                  <Link href="/signup">
                    <Button className="bg-brand-900 text-white hover:bg-brand-800">
                      <span>View Analytics Dashboard</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Visual Placeholder */}
              <div>
                <AssetPlaceholder
                  id="placeholder-feature-analytics"
                  label="Marketing Analytics Growth Chart Animation"
                  assetNeeded="Visual chart animation showing multi-channel conversion curves and CAC reduction metrics."
                  searchKeywords="analytics dashboard line chart growth animation Lottie"
                  format="Lottie JSON"
                  aspectRatio="video"
                  icon="chart"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Feature 4: Student Success Vault */}
        <section
          id="success-vault"
          className="border-t border-border-subtle bg-background py-16 sm:py-20 scroll-mt-20"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
              <div className="order-2 lg:order-1">
                <AssetPlaceholder
                  id="placeholder-feature-vault"
                  label="Student Achievement Celebration Animation"
                  assetNeeded="Animation featuring graduation caps, exam rank badges, and verified testimonial showcase."
                  searchKeywords="student graduation achievement trophy celebration animation Lottie"
                  format="Lottie JSON"
                  aspectRatio="video"
                  icon="award"
                />
              </div>

              <div className="order-1 lg:order-2">
                <div className="inline-flex items-center gap-2 rounded-lg bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-900 mb-4">
                  <Award className="h-4 w-4 text-brand-700" />
                  <span>Module 4 • Student Success Vault</span>
                </div>

                <h2 className="font-heading text-2xl font-bold tracking-tight text-text-primary sm:text-3xl lg:text-4xl">
                  Turn Ranks and Testimonials into Admission Magnets
                </h2>

                <p className="mt-4 text-base text-text-secondary leading-relaxed">
                  Parents choose coaching institutes based on authentic social proof.
                  The Student Success Vault centralizes student ranks, score cards,
                  and video testimonials with consent-aware publishing workflows.
                </p>

                <div className="mt-6 space-y-3">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-5 w-5 text-brand-700 shrink-0 mt-0.5" />
                    <span className="text-sm text-text-primary">
                      <strong>Topper & Ranker Catalog:</strong> Organize past results
                      categorized by exam (JEE Advanced, NEET, CET, UPSC) and year.
                    </span>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-5 w-5 text-brand-700 shrink-0 mt-0.5" />
                    <span className="text-sm text-text-primary">
                      <strong>Parent & Alumni Testimonial Manager:</strong> Store
                      quotes, ratings, and video links with verified consent tags.
                    </span>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-5 w-5 text-brand-700 shrink-0 mt-0.5" />
                    <span className="text-sm text-text-primary">
                      <strong>Instant Marketing Asset Generator:</strong> Transform
                      topper achievements directly into shareable social media badges.
                    </span>
                  </div>
                </div>

                <div className="mt-8">
                  <Link href="/signup">
                    <Button className="bg-brand-900 text-white hover:bg-brand-800">
                      <span>Explore Success Vault</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature 5: Team Management */}
        <section
          id="team"
          className="border-t border-border-subtle bg-white py-16 sm:py-20 scroll-mt-20"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
              <div>
                <div className="inline-flex items-center gap-2 rounded-lg bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-900 mb-4">
                  <Users className="h-4 w-4 text-brand-700" />
                  <span>Module 5 • Team & Counsellor Management</span>
                </div>

                <h2 className="font-heading text-2xl font-bold tracking-tight text-text-primary sm:text-3xl lg:text-4xl">
                  Role-Based Permissions & Counsellor Accountability
                </h2>

                <p className="mt-4 text-base text-text-secondary leading-relaxed">
                  Empower your staff without exposing sensitive financial or
                  institute-level data. Invite counsellors, marketers, and faculty
                  with individual secure credentials and strict role boundaries.
                </p>

                <div className="mt-6 space-y-3">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-5 w-5 text-brand-700 shrink-0 mt-0.5" />
                    <span className="text-sm text-text-primary">
                      <strong>Role Hierarchy:</strong> Owner, Admin, Counsellor,
                      Marketer, and Faculty with enforced data isolation.
                    </span>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-5 w-5 text-brand-700 shrink-0 mt-0.5" />
                    <span className="text-sm text-text-primary">
                      <strong>Secure Email Invitations:</strong> Invite team members
                      via tokenized links with automated onboarding.
                    </span>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-5 w-5 text-brand-700 shrink-0 mt-0.5" />
                    <span className="text-sm text-text-primary">
                      <strong>Counsellor Workload Monitoring:</strong> Track active
                      leads, completed calls, and conversion ratios per staff member.
                    </span>
                  </div>
                </div>

                <div className="mt-8">
                  <Link href="/signup">
                    <Button className="bg-brand-900 text-white hover:bg-brand-800">
                      <span>Set Up Your Team</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Visual Placeholder */}
              <div>
                <AssetPlaceholder
                  id="placeholder-feature-team"
                  label="Team Collaboration Animation"
                  assetNeeded="Visual animation illustrating team members collaborating on student admissions with secure role tags."
                  searchKeywords="team collaboration people working animation Lottie"
                  format="Lottie JSON"
                  aspectRatio="video"
                  icon="users"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Feature 6: AI Growth Assistant */}
        <section
          id="ai-assistant"
          className="border-t border-border-subtle bg-background py-16 sm:py-20 scroll-mt-20"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
              <div className="order-2 lg:order-1">
                <AssetPlaceholder
                  id="placeholder-feature-ai"
                  label="AI Assistant Data Insights Animation"
                  assetNeeded="Visual animation showing proactive AI notification alerts and conversion bottleneck recommendations."
                  searchKeywords="AI assistant chatbot analytics animation Lottie"
                  format="Lottie JSON"
                  aspectRatio="video"
                  icon="sparkles"
                />
              </div>

              <div className="order-1 lg:order-2">
                <div className="inline-flex items-center gap-2 rounded-lg bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-900 mb-4">
                  <Bot className="h-4 w-4 text-brand-700" />
                  <span>Module 6 • AI Growth Assistant</span>
                </div>

                <h2 className="font-heading text-2xl font-bold tracking-tight text-text-primary sm:text-3xl lg:text-4xl">
                  Proactive Guidance to Accelerate Institute Growth
                </h2>

                <p className="mt-4 text-base text-text-secondary leading-relaxed">
                  More than just passive dashboards: the AI Growth Assistant acts as
                  your virtual Chief Growth Officer, monitoring admissions data and
                  alerting you to critical opportunities and bottlenecks.
                </p>

                <div className="mt-6 space-y-3">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-5 w-5 text-brand-700 shrink-0 mt-0.5" />
                    <span className="text-sm text-text-primary">
                      <strong>Inquiry Drop-off Alerts:</strong> Notifies directors if
                      counsellor response times exceed 30 minutes.
                    </span>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-5 w-5 text-brand-700 shrink-0 mt-0.5" />
                    <span className="text-sm text-text-primary">
                      <strong>Seasonal Campaign Suggestions:</strong> Automated alerts
                      to launch crash-course marketing before major exam registrations.
                    </span>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-5 w-5 text-brand-700 shrink-0 mt-0.5" />
                    <span className="text-sm text-text-primary">
                      <strong>Budget Reallocation Recommendations:</strong> Shifts ad
                      budget away from stagnant campaigns toward top-converting sources.
                    </span>
                  </div>
                </div>

                <div className="mt-8">
                  <Link href="/signup">
                    <Button className="bg-brand-900 text-white hover:bg-brand-800">
                      <span>Experience AI Assistant</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <CTASection
          title="Supercharge Your Academy's Admissions"
          description="Join coaching directors across India who use AcademyGrowth to streamline admissions and scale enrollments."
          primaryCtaText="Start 14-Day Free Trial"
          primaryCtaHref="/signup"
          secondaryCtaText="Contact Sales"
          secondaryCtaHref="/contact"
        />
      </main>

      <PublicFooter />
    </div>
  );
}

