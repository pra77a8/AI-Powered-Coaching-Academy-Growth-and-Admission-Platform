import React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Target,
  Compass,
  CheckCircle2,
  GraduationCap,
  HeartHandshake,
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
  title: 'About Us — AcademyGrowth | Mission, Vision & Purpose',
  description:
    'Learn how AcademyGrowth empowers coaching academies, educators, and admissions teams with intelligent software built specifically for education.',
};

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-text-primary antialiased">
      <PublicNavbar />

      <main className="flex-1">
        {/* About Hero */}
        <section className="bg-gradient-to-b from-[#EFF7F4]/60 via-background to-background pt-16 pb-12 sm:pt-20 sm:pb-16 text-center">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Badge
              variant="outline"
              className="mb-4 border-brand-300 bg-white/80 px-3.5 py-1 text-xs font-semibold text-brand-900 shadow-soft"
            >
              Our Mission
            </Badge>

            <h1 className="font-heading text-3xl font-extrabold tracking-tight text-text-primary sm:text-5xl lg:text-6xl leading-[1.15]">
              Helping Coaching Institutes{' '}
              <span className="text-brand-900 underline decoration-brand-400 decoration-wavy decoration-from-font underline-offset-8">
                Grow Smarter
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-base sm:text-lg text-text-secondary leading-relaxed">
              We build specialized, high-velocity admissions and growth software so
              educators and institute founders can spend less time wrestling with
              spreadsheets and more time mentoring the next generation of achievers.
            </p>
          </div>
        </section>

        {/* Story & Problem */}
        <section className="border-t border-border-subtle bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
              <div>
                <SectionHeading
                  align="left"
                  badge="The Genesis"
                  title="The Challenge Behind Coaching Admissions"
                  description="Coaching academies in India are vibrant centers of academic aspiration. Yet behind the scenes, their operational reality is overwhelmingly fragmented."
                />

                <div className="mt-6 space-y-4 text-sm text-text-secondary leading-relaxed">
                  <p>
                    Every year during exam announcement seasons, coaching
                    directors are flooded with student inquiries across WhatsApp,
                    paper registers, Facebook lead ads, phone calls, and campus
                    walk-ins.
                  </p>
                  <p>
                    Without purpose-built tools, inquiries get lost. Counsellor
                    follow-ups happen days too late. Marketing budgets are spent
                    blindly on pamphlets and newspaper notices without knowing
                    which campaigns produced actual enrolled students.
                  </p>
                  <p>
                    General-purpose corporate CRMs are designed for B2B enterprise
                    software deals with complex deal stages and bloated pricing.
                    They do not understand batch intakes, scholarship test
                    schedules, parent counselling psychology, or exam timelines.
                  </p>
                  <p className="font-semibold text-text-primary">
                    AcademyGrowth was conceived to solve this exact problem:
                    providing a streamlined, affordable, all-in-one growth platform
                    engineered from the ground up for coaching academies.
                  </p>
                </div>
              </div>

              {/* Visual Placeholder */}
              <div>
                <AssetPlaceholder
                  id="placeholder-about-story"
                  label="Education Innovation & Academy Growth Illustration"
                  assetNeeded="Visual vector illustration symbolizing modern digital tools transforming coaching academy management."
                  searchKeywords="education innovation digital learning illustration SVG"
                  format="SVG"
                  aspectRatio="video"
                  icon="compass"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="border-t border-border-subtle bg-background py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <Card className="border-border-subtle bg-white p-8 shadow-soft">
                <CardContent className="p-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-900 mb-6">
                    <Target className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-text-primary">
                    Our Mission
                  </h3>
                  <p className="mt-4 text-sm text-text-secondary leading-relaxed">
                    To empower coaching academies and educational leaders with
                    accessible, high-velocity admissions management and AI-assisted
                    marketing tools, turning every genuine student inquiry into an
                    opportunity for mentorship and growth.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border-subtle bg-white p-8 shadow-soft">
                <CardContent className="p-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-900 mb-6">
                    <Compass className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-text-primary">
                    Our Vision
                  </h3>
                  <p className="mt-4 text-sm text-text-secondary leading-relaxed">
                    A world where coaching institutes of every size—from single-room
                    neighborhood centers to regional multi-branch academies—possess
                    the same technological sophistication and marketing precision as
                    nationwide educational conglomerates.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Core Principles */}
        <section className="border-t border-border-subtle bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Our Values"
              title="Guiding Principles We Stand By"
              description="How we design our platform and interact with educators every day."
            />

            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-border-subtle bg-surface p-6 shadow-soft">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-100 text-brand-900 mb-4">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <h4 className="font-heading text-base font-bold text-text-primary">
                  Educator First
                </h4>
                <p className="mt-2 text-xs text-text-secondary leading-relaxed">
                  We measure success by how much time and stress we remove from
                  institute directors and teachers.
                </p>
              </div>

              <div className="rounded-2xl border border-border-subtle bg-surface p-6 shadow-soft">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-100 text-brand-900 mb-4">
                  <HeartHandshake className="h-5 w-5" />
                </div>
                <h4 className="font-heading text-base font-bold text-text-primary">
                  Ethical Social Proof
                </h4>
                <p className="mt-2 text-xs text-text-secondary leading-relaxed">
                  We support authentic result management and student consent,
                  promoting honesty in education marketing.
                </p>
              </div>

              <div className="rounded-2xl border border-border-subtle bg-surface p-6 shadow-soft">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-100 text-brand-900 mb-4">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h4 className="font-heading text-base font-bold text-text-primary">
                  Strict Data Privacy
                </h4>
                <p className="mt-2 text-xs text-text-secondary leading-relaxed">
                  Student contact records and counselling discussions belong solely
                  to the institute, secured by tenant-isolated RLS.
                </p>
              </div>

              <div className="rounded-2xl border border-border-subtle bg-surface p-6 shadow-soft">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-100 text-brand-900 mb-4">
                  <Sparkles className="h-5 w-5" />
                </div>
                <h4 className="font-heading text-base font-bold text-text-primary">
                  Practical Innovation
                </h4>
                <p className="mt-2 text-xs text-text-secondary leading-relaxed">
                  We build AI tools that solve real operational headaches, not
                  gimmicks or empty hype.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <CTASection
          title="Join Us in Transforming Coaching Operations"
          description="Experience a growth platform engineered with deep empathy for coaching academies."
          primaryCtaText="Start 14-Day Free Trial"
          primaryCtaHref="/signup"
          secondaryCtaText="Contact Our Team"
          secondaryCtaHref="/contact"
        />
      </main>

      <PublicFooter />
    </div>
  );
}

