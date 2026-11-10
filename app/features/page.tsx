import React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  Layers,
  BarChart3,
  Award,
  Users,
  Bot,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PublicNavbar } from '@/components/marketing/public-navbar';
import { PublicFooter } from '@/components/marketing/public-footer';
import { SectionHeading } from '@/components/marketing/section-heading';
import { CTASection } from '@/components/marketing/cta-section';

export const metadata = {
  title: 'Features & Tools — AcademyGrowth',
  description:
    'Deep dive into AcademyGrowth core modules: Admission CRM, AI Content Studio, Marketing Analytics, Student Success Vault, Team Management, and AI Growth Assistant.',
};

export default function FeaturesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-text-primary antialiased">
      <PublicNavbar />

      <main className="flex-1">
        {/* Features Hero */}
        <section className="bg-markova-grid-hero border-b border-border-subtle/60 pt-16 pb-12 sm:pt-20 sm:pb-16 text-center">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Badge
              variant="outline"
              className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-brand-300 bg-white/90 px-4 py-1.5 text-xs sm:text-sm font-semibold tracking-wide text-brand-900 shadow-soft"
            >
              Comprehensive Suite
            </Badge>

            <h1 className="font-heading text-3xl font-extrabold tracking-tight text-text-primary sm:text-5xl lg:text-6xl leading-[1.15]">
              Everything Your Institute Needs to{' '}
              <span className="text-brand-900">
                Scale
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-base sm:text-lg text-text-secondary leading-relaxed">
              Explore the six interconnected modules engineered specifically for
              coaching academies, competitive exam centers, and educational founders.
            </p>
          </div>
        </section>

        {/* Feature 1: Admission CRM */}
        <section
          id="admission-crm"
          className="border-t border-border-subtle bg-white py-16 sm:py-20 scroll-mt-20"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-brand-300 bg-brand-50 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-brand-900 mb-4 shadow-soft">
                  <Layers className="h-4 w-4 text-brand-700" />
                  <span>Module 1 • Admission CRM</span>
                </div>

                <h2 className="font-heading text-2xl font-bold tracking-tight text-text-primary sm:text-3xl lg:text-4xl">
                  Visual Kanban Pipeline for Coaching Inquiries
                </h2>

                <p className="mt-4 text-base text-text-secondary leading-relaxed">
                  Never lose a student lead again. Move inquiries smoothly across
                  specialized coaching stages: from initial inquiry capture to
                  counsellor assignment, campus visit scheduling, scholarship test
                  scoring, and final admission fee payment.
                </p>

                <div className="mt-6 space-y-3">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-5 w-5 text-brand-700 shrink-0 mt-0.5" />
                    <span className="text-sm text-text-primary">
                      <strong>Multi-Channel Lead Ingestion:</strong> Capture leads from
                      walk-ins, web landing pages, Meta lead ads, and phone calls
                      into one unified inbox.
                    </span>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-5 w-5 text-brand-700 shrink-0 mt-0.5" />
                    <span className="text-sm text-text-primary">
                      <strong>Customizable Pipeline Stages:</strong> Tailor stages to
                      your admission cycle: Walk-in, Demo Class, Aptitude Test,
                      Counselling, Fee Paid.
                    </span>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-5 w-5 text-brand-700 shrink-0 mt-0.5" />
                    <span className="text-sm text-text-primary">
                      <strong>Counsellor Assignment & Reminders:</strong> Assign leads
                      to specific team members with scheduled follow-up alerts via
                      WhatsApp.
                    </span>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-5 w-5 text-brand-700 shrink-0 mt-0.5" />
                    <span className="text-sm text-text-primary">
                      <strong>Comprehensive Activity Timeline:</strong> Full audit trail of
                      every interaction and status update.
                    </span>
                  </div>
                </div>

                <div className="mt-8">
                  <Link href="/signup">
                    <Button className="bg-brand-900 text-white hover:bg-brand-800 shadow-soft">
                      <span>Try Admission CRM Free</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Visual Illustration: Admission CRM */}
              <div className="flex w-full items-center justify-center">
                <div className="relative flex h-[280px] sm:h-[340px] lg:h-[400px] w-full max-w-[480px] items-center justify-center overflow-hidden rounded-3xl border border-brand-200/80 bg-white p-4 shadow-medium transition-all hover:shadow-strong">
                  <img
                    src="/assets/images/Admission%20CRM%20Kanban%20Pipeline%20Animation.svg"
                    alt="Admission CRM Kanban Pipeline Interactive Illustration"
                    className="h-auto max-h-full w-auto max-w-full object-contain object-center"
                    loading="lazy"
                  />
                </div>
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
              {/* Visual Illustration: AI Content Studio */}
              <div className="order-2 flex w-full items-center justify-center lg:order-1">
                <div className="relative flex h-[280px] sm:h-[340px] lg:h-[400px] w-full max-w-[480px] items-center justify-center overflow-hidden rounded-3xl border border-brand-200/80 bg-white p-4 shadow-medium transition-all hover:shadow-strong">
                  <img
                    src="/assets/images/AI%20Marketing%20Content%20Generation%20Animation.svg"
                    alt="AI Marketing Content Generation Interactive Illustration"
                    className="h-auto max-h-full w-auto max-w-[90%] sm:max-w-[85%] lg:max-w-[80%] object-contain object-center"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <div className="inline-flex items-center gap-2 rounded-full border border-brand-300 bg-brand-50 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-brand-900 mb-4 shadow-soft">
                  <Sparkles className="h-4 w-4 text-brand-700" />
                  <span>Module 2 • AI Content Studio</span>
                </div>

                <h2 className="font-heading text-2xl font-bold tracking-tight text-text-primary sm:text-3xl lg:text-4xl">
                  Generate High-Converting Marketing in Seconds
                </h2>

                <p className="mt-4 text-base text-text-secondary leading-relaxed">
                  Eliminate creative paralysis. Generate persuasive, exam-specific
                  promotional copy for upcoming JEE, NEET, MHT-CET, and UPSC batches
                  with domain-aware AI prompts built specifically for coaching
                  founders.
                </p>

                <div className="mt-6 space-y-3">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-5 w-5 text-brand-700 shrink-0 mt-0.5" />
                    <span className="text-sm text-text-primary">
                      <strong>Social Media & Feed Ad Copy:</strong> Engaging posts and
                      captions tailored for Instagram, Facebook, and LinkedIn.
                    </span>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-5 w-5 text-brand-700 shrink-0 mt-0.5" />
                    <span className="text-sm text-text-primary">
                      <strong>WhatsApp Broadcast Campaigns:</strong> High-converting
                      direct messages formatted for parent outreach and seminar invites.
                    </span>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-5 w-5 text-brand-700 shrink-0 mt-0.5" />
                    <span className="text-sm text-text-primary">
                      <strong>Exam Tips & Motivation Posts:</strong> Value-adding content
                      that builds trust with students throughout the academic year.
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
                    <Button className="bg-brand-900 text-white hover:bg-brand-800 shadow-soft">
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
                <div className="inline-flex items-center gap-2 rounded-full border border-brand-300 bg-brand-50 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-brand-900 mb-4 shadow-soft">
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
                    <Button className="bg-brand-900 text-white hover:bg-brand-800 shadow-soft">
                      <span>View Analytics Dashboard</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Integrated Visual: Marketing Analytics Growth Chart */}
              <div className="flex w-full items-center justify-center">
                <div className="relative flex h-[280px] sm:h-[340px] lg:h-[400px] w-full max-w-[500px] items-center justify-center overflow-hidden rounded-3xl border border-brand-200/80 bg-white p-4 shadow-medium transition-all hover:shadow-strong">
                  <img
                    src="/assets/images/Marketing%20Analytics%20Growth%20Chart%20Animation.svg"
                    alt="Marketing Analytics Growth Chart Interactive Animation"
                    className="h-auto max-h-full w-auto max-w-full object-contain object-center"
                    loading="lazy"
                  />
                </div>
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
              <div className="order-2 flex w-full items-center justify-center lg:order-1">
                <div className="relative flex h-[280px] sm:h-[340px] lg:h-[400px] w-full max-w-[480px] items-center justify-center overflow-hidden rounded-3xl border border-brand-200/80 bg-white p-4 shadow-medium transition-all hover:shadow-strong">
                  <img
                    src="/assets/images/Student%20Achievement%20Celebration%20Animation.svg"
                    alt="Student Achievement Celebration Interactive Animation"
                    className="h-auto max-h-full w-auto max-w-full object-contain object-center"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <div className="inline-flex items-center gap-2 rounded-full border border-brand-300 bg-brand-50 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-brand-900 mb-4 shadow-soft">
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
                    <Button className="bg-brand-900 text-white hover:bg-brand-800 shadow-soft">
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
                <div className="inline-flex items-center gap-2 rounded-full border border-brand-300 bg-brand-50 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-brand-900 mb-4 shadow-soft">
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
                    <Button className="bg-brand-900 text-white hover:bg-brand-800 shadow-soft">
                      <span>Set Up Your Team</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Integrated Visual: Team Collaboration */}
              <div className="flex w-full items-center justify-center">
                <div className="relative flex h-[280px] sm:h-[340px] lg:h-[400px] w-full max-w-[480px] items-center justify-center overflow-hidden rounded-3xl border border-brand-200/80 bg-white p-4 shadow-medium transition-all hover:shadow-strong">
                  <img
                    src="/assets/images/Team%20Collaboration%20Animation.svg"
                    alt="Team Collaboration Interactive Animation"
                    className="h-auto max-h-full w-auto max-w-full object-contain object-center"
                    loading="lazy"
                  />
                </div>
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
              <div className="order-2 flex w-full items-center justify-center lg:order-1">
                <div className="relative flex aspect-square w-full max-w-[440px] items-center justify-center overflow-hidden rounded-3xl border border-brand-200/80 bg-white p-4 shadow-medium transition-all hover:shadow-strong">
                  <img
                    src="/assets/images/AI%20Assistant%20Data%20Insights%20Animation.gif"
                    alt="AI Assistant Data Insights Animated Visual"
                    className="h-full w-full object-contain"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <div className="inline-flex items-center gap-2 rounded-full border border-brand-300 bg-brand-50 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-brand-900 mb-4 shadow-soft">
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
                    <Button className="bg-brand-900 text-white hover:bg-brand-800 shadow-soft">
                      <span>Experience AI Assistant Free</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <CTASection
          title="Ready to Supercharge Your Institute Operations?"
          description="Get all six modules in one affordable subscription. Start your 14-day free trial now."
          primaryCtaText="Start Free Trial"
          primaryCtaHref="/signup"
          secondaryCtaText="Compare Plans"
          secondaryCtaHref="/pricing"
        />
      </main>

      <PublicFooter />
    </div>
  );
}
