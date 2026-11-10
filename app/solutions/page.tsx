import React from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Atom,
  Binary,
  Compass,
  Building2,
  BookOpen,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { PublicNavbar } from '@/components/marketing/public-navbar';
import { PublicFooter } from '@/components/marketing/public-footer';
import { SectionHeading } from '@/components/marketing/section-heading';
import { CTASection } from '@/components/marketing/cta-section';
import { AssetPlaceholder } from '@/components/marketing/asset-placeholder';

export const metadata = {
  title: 'Solutions — AcademyGrowth | Built for JEE, NEET, MHT-CET & UPSC Academies',
  description:
    'Tailored admissions and marketing workflows for JEE & NEET, MHT-CET, UPSC, and specialized coaching academies.',
};

export default function SolutionsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-text-primary antialiased">
      <PublicNavbar />

      <main className="flex-1">
        {/* Solutions Hero */}
        <section className="bg-gradient-to-b from-[#EFF7F4]/60 via-background to-background pt-16 pb-12 sm:pt-20 sm:pb-16 text-center">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Badge
              variant="outline"
              className="mb-4 border-brand-300 bg-white/80 px-3.5 py-1 text-xs font-semibold text-brand-900 shadow-soft"
            >
              Tailored Solutions
            </Badge>

            <h1 className="font-heading text-3xl font-extrabold tracking-tight text-text-primary sm:text-5xl lg:text-6xl leading-[1.15]">
              One Platform.{' '}
              <span className="text-brand-900 underline decoration-brand-400 decoration-wavy decoration-from-font underline-offset-8">
                Different Coaching Goals.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-base sm:text-lg text-text-secondary leading-relaxed">
              AcademyGrowth helps coaching institutes organize admissions, improve
              marketing, and understand their growth regardless of target exam or
              batch size.
            </p>
          </div>
        </section>

        {/* 1. JEE & NEET Coaching */}
        <section
          id="jee-neet"
          className="border-t border-border-subtle bg-white py-16 sm:py-20"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
              <div>
                <div className="inline-flex items-center gap-2 rounded-lg bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-900 mb-4">
                  <Atom className="h-4 w-4 text-brand-700" />
                  <span>Engineering & Medical Prep</span>
                </div>

                <h2 className="font-heading text-2xl font-bold tracking-tight text-text-primary sm:text-3xl lg:text-4xl">
                  JEE & NEET Coaching Institutes
                </h2>

                <p className="mt-4 text-base text-text-secondary leading-relaxed">
                  High-stakes engineering and medical entrance coaching requires
                  managing enormous seasonal inquiry spikes, coordinating
                  scholarship admission tests (SAT/DAT), and reassuring concerned
                  parents through multi-touch counselling.
                </p>

                <div className="mt-6 space-y-3">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-5 w-5 text-brand-700 shrink-0 mt-0.5" />
                    <span className="text-sm text-text-primary">
                      <strong>High-Volume Inquiry Triage:</strong> Ingest thousands
                      of leads during 10th and 12th board result announcements without
                      system lag.
                    </span>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-5 w-5 text-brand-700 shrink-0 mt-0.5" />
                    <span className="text-sm text-text-primary">
                      <strong>Multi-Touch Parent Follow-ups:</strong> Schedule
                      follow-up calls, campus visits, and faculty interaction
                      sessions.
                    </span>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-5 w-5 text-brand-700 shrink-0 mt-0.5" />
                    <span className="text-sm text-text-primary">
                      <strong>Course & Batch Segmentation:</strong> Separate 2-Year
                      Foundation, 1-Year Dropper/Repeater, and Crash Course pipelines.
                    </span>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-5 w-5 text-brand-700 shrink-0 mt-0.5" />
                    <span className="text-sm text-text-primary">
                      <strong>Ranker Social Proof Generator:</strong> Highlight All
                      India Ranks (AIR) across social media with one-click AI copy.
                    </span>
                  </div>
                </div>

                <div className="mt-8">
                  <Link href="/signup">
                    <Button className="bg-brand-900 text-white hover:bg-brand-800">
                      <span>Start Free Trial for JEE/NEET</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Visual Placeholder */}
              <div>
                <AssetPlaceholder
                  id="placeholder-solution-jee"
                  label="JEE & NEET Admissions Funnel Illustration"
                  assetNeeded="Vector illustration of engineering/medical coaching students and counselor pipeline."
                  searchKeywords="stem medical engineering students learning illustration SVG"
                  format="SVG"
                  aspectRatio="video"
                  icon="compass"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 2. MHT-CET Coaching */}
        <section
          id="mht-cet"
          className="border-t border-border-subtle bg-background py-16 sm:py-20"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
              <div className="order-2 lg:order-1">
                <AssetPlaceholder
                  id="placeholder-solution-cet"
                  label="State CET Entrance Campaign Illustration"
                  assetNeeded="Illustration showing regional examination marketing and student inquiry flow."
                  searchKeywords="regional university student campus illustration SVG"
                  format="SVG"
                  aspectRatio="video"
                  icon="layers"
                />
              </div>

              <div className="order-1 lg:order-2">
                <div className="inline-flex items-center gap-2 rounded-lg bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-900 mb-4">
                  <Binary className="h-4 w-4 text-brand-700" />
                  <span>State Entrance Exams</span>
                </div>

                <h2 className="font-heading text-2xl font-bold tracking-tight text-text-primary sm:text-3xl lg:text-4xl">
                  MHT-CET & State Exam Academies
                </h2>

                <p className="mt-4 text-base text-text-secondary leading-relaxed">
                  State-level CET coaching academies need localized marketing
                  campaigns, regional batch announcements, and structured counsellor
                  conversations focused on state engineering and pharmacy college
                  cutoffs.
                </p>

                <div className="mt-6 space-y-3">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-5 w-5 text-brand-700 shrink-0 mt-0.5" />
                    <span className="text-sm text-text-primary">
                      <strong>Regional Campaign Tracking:</strong> Differentiate
                      leads coming from district newspaper ads, school seminars, and
                      local Meta ads.
                    </span>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-5 w-5 text-brand-700 shrink-0 mt-0.5" />
                    <span className="text-sm text-text-primary">
                      <strong>State Board Syllabus Sync:</strong> Generate AI copy
                      emphasizing Maharashtra State Board + CET syllabus alignment.
                    </span>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-5 w-5 text-brand-700 shrink-0 mt-0.5" />
                    <span className="text-sm text-text-primary">
                      <strong>Fast Inquiry Conversion:</strong> Keep counsellor
                      turnaround time under 15 minutes with automated WhatsApp
                      acknowledgments.
                    </span>
                  </div>
                </div>

                <div className="mt-8">
                  <Link href="/signup">
                    <Button className="bg-brand-900 text-white hover:bg-brand-800">
                      <span>Start Free Trial for MHT-CET</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. UPSC & Competitive Exams */}
        <section
          id="upsc"
          className="border-t border-border-subtle bg-white py-16 sm:py-20"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
              <div>
                <div className="inline-flex items-center gap-2 rounded-lg bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-900 mb-4">
                  <BookOpen className="h-4 w-4 text-brand-700" />
                  <span>Civil Services & Government Exams</span>
                </div>

                <h2 className="font-heading text-2xl font-bold tracking-tight text-text-primary sm:text-3xl lg:text-4xl">
                  UPSC & Competitive Exam Centers
                </h2>

                <p className="mt-4 text-base text-text-secondary leading-relaxed">
                  Civil services and competitive exam aspirants have a thoughtful,
                  longer decision journey. AcademyGrowth helps institutes engage
                  aspirants through demo lectures, optional subject counselling, and
                  topper interview showcases.
                </p>

                <div className="mt-6 space-y-3">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-5 w-5 text-brand-700 shrink-0 mt-0.5" />
                    <span className="text-sm text-text-primary">
                      <strong>Long-Cycle Aspirant Nurturing:</strong> Keep
                      prospective aspirants engaged over weeks through insightful
                      syllabus guides and current affairs webinars.
                    </span>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-5 w-5 text-brand-700 shrink-0 mt-0.5" />
                    <span className="text-sm text-text-primary">
                      <strong>Demo Lecture Attendance Tracking:</strong> Track which
                      leads attended weekend demo classes and their subsequent
                      enrollment rate.
                    </span>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-5 w-5 text-brand-700 shrink-0 mt-0.5" />
                    <span className="text-sm text-text-primary">
                      <strong>Officer Alumni Credibility:</strong> Showcase success
                      stories of IAS, IPS, and state PSC rankers with verified social
                      proof.
                    </span>
                  </div>
                </div>

                <div className="mt-8">
                  <Link href="/signup">
                    <Button className="bg-brand-900 text-white hover:bg-brand-800">
                      <span>Start Free Trial for UPSC</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Visual Placeholder */}
              <div>
                <AssetPlaceholder
                  id="placeholder-solution-upsc"
                  label="UPSC Aspirant Journey Illustration"
                  assetNeeded="Illustration showing civil service aspirants, library study, and mentor consultation."
                  searchKeywords="student reading books library mentor illustration SVG"
                  format="SVG"
                  aspectRatio="video"
                  icon="award"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 4. Other Coaching Academies */}
        <section
          id="other"
          className="border-t border-border-subtle bg-background py-16 sm:py-20"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Broad Applicability"
              title="Tailored for Other Coaching Academies"
              description="Whether you run a Commerce & CA coaching center, a Foundation school, or language institutes, AcademyGrowth provides flexible admission workflows."
            />

            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="border-border-subtle bg-white p-6 shadow-soft">
                <CardContent className="p-0">
                  <h3 className="font-heading text-lg font-bold text-text-primary">
                    Commerce, CA & CS Academies
                  </h3>
                  <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                    Organize admissions for CA Foundation, Inter, and Final batches
                    with custom fee installment stages and orientation dates.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border-subtle bg-white p-6 shadow-soft">
                <CardContent className="p-0">
                  <h3 className="font-heading text-lg font-bold text-text-primary">
                    Foundation & Olympiad Centers
                  </h3>
                  <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                    Connect with parents of 6th-10th graders using child-centric
                    academic counseling workflows and aptitude test schedules.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border-subtle bg-white p-6 shadow-soft">
                <CardContent className="p-0">
                  <h3 className="font-heading text-lg font-bold text-text-primary">
                    Language & Skill Academies
                  </h3>
                  <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                    Manage rolling monthly cohorts for IELTS, TOEFL, coding
                    bootcamps, and professional certifications with ease.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <CTASection
          title="Ready to Elevate Your Institute's Admissions?"
          description="Whatever exam or discipline you teach, AcademyGrowth gives your admissions and marketing team unfair advantage."
          primaryCtaText="Start Your Free 14-Day Trial"
          primaryCtaHref="/signup"
          secondaryCtaText="Talk with Admissions Specialist"
          secondaryCtaHref="/contact"
        />
      </main>

      <PublicFooter />
    </div>
  );
}

