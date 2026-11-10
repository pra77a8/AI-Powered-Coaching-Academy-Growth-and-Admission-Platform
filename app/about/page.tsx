import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Target,
  Compass,
  CheckCircle2,
  GraduationCap,
  Users,
  Award,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PublicNavbar } from '@/components/marketing/public-navbar';
import { PublicFooter } from '@/components/marketing/public-footer';
import { SectionHeading } from '@/components/marketing/section-heading';
import { CTASection } from '@/components/marketing/cta-section';

export const metadata = {
  title: 'About AcademyGrowth — Dedicated to Coaching Academy Growth',
  description:
    'Learn why we built AcademyGrowth: a modern, intelligent admissions and marketing platform purpose-built for Indian coaching institutes.',
};

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-text-primary antialiased">
      <PublicNavbar />

      <main className="flex-1">
        {/* About Hero */}
        <section className="bg-markova-grid-hero border-b border-border-subtle/60 pt-16 pb-12 sm:pt-20 sm:pb-16 text-center">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Badge
              variant="outline"
              className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-brand-300 bg-white/90 px-4 py-1.5 text-xs sm:text-sm font-semibold tracking-wide text-brand-900 shadow-soft"
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

        {/* Story & Problem (The Genesis - Approved Refined Concise Copy) */}
        <section className="border-t border-border-subtle bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
              <div>
                <SectionHeading
                  align="left"
                  badge="The Genesis"
                  title="Why Coaching Institutes Need a Better Growth System"
                  description="Coaching institutes manage student inquiries through WhatsApp, spreadsheets, phone calls, advertisements and walk-ins. When these activities remain disconnected, inquiries get missed, follow-ups are delayed and marketing performance becomes difficult to measure."
                />

                <div className="mt-6 space-y-4 text-base text-text-secondary leading-relaxed">
                  <p>
                    General-purpose CRMs often fail to address the specific admission and marketing workflows of coaching academies.
                  </p>
                  <p className="font-semibold text-text-primary">
                    AcademyGrowth brings these activities together in one streamlined platform, helping institutes manage admissions, improve marketing and make informed growth decisions.
                  </p>
                </div>

                <div className="mt-8">
                  <Link href="/signup">
                    <Button className="bg-brand-900 text-white hover:bg-brand-800 shadow-soft">
                      <span>Experience AcademyGrowth Free</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Integrated Visual Illustration: Education Innovation */}
              <div className="flex w-full items-center justify-center">
                <div className="relative flex h-[280px] sm:h-[340px] lg:h-[380px] w-full max-w-[540px] items-center justify-center overflow-hidden rounded-3xl border border-brand-200/80 bg-white p-3 shadow-medium transition-all hover:shadow-strong">
                  <Image
                    src="/assets/images/Education Innovation & Academy Growth Illustration.png"
                    alt="Education Innovation & Academy Growth Illustration"
                    width={1536}
                    height={1024}
                    className="h-full w-full object-contain"
                    sizes="(max-width: 768px) 100vw, 540px"
                  />
                </div>
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
                    A vibrant Indian coaching ecosystem where quality coaching centers
                    thrive sustainably through disciplined operational clarity,
                    uncompromising student trust, and intelligent data-guided
                    expansion.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="border-t border-border-subtle bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Our Values"
              title="Guiding Principles Behind Every Feature"
              description="How we think about software for coaching academies."
            />

            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-2xl border border-border-subtle bg-surface p-6 shadow-soft">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-900 mb-4">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <h4 className="font-heading text-lg font-bold text-text-primary">
                  Student-Centric Velocity
                </h4>
                <p className="mt-2 text-xs text-text-secondary leading-relaxed">
                  Every inquiry represents an aspiring student and anxious parents.
                  Our tools prioritize response speed and respectful counselling.
                </p>
              </div>

              <div className="rounded-2xl border border-border-subtle bg-surface p-6 shadow-soft">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-900 mb-4">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h4 className="font-heading text-lg font-bold text-text-primary">
                  Ironclad Data Isolation
                </h4>
                <p className="mt-2 text-xs text-text-secondary leading-relaxed">
                  Your student inquiries, counsellor notes, and financial figures
                  belong strictly to your institute. Enforced by PostgreSQL RLS.
                </p>
              </div>

              <div className="rounded-2xl border border-border-subtle bg-surface p-6 shadow-soft">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-900 mb-4">
                  <Sparkles className="h-5 w-5" />
                </div>
                <h4 className="font-heading text-lg font-bold text-text-primary">
                  Pragmatic AI Assist
                </h4>
                <p className="mt-2 text-xs text-text-secondary leading-relaxed">
                  AI shouldn&apos;t replace human educators. It should eliminate
                  tedious marketing drafting and surface actionable growth signals.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <CTASection
          title="Join Institutes Growing with AcademyGrowth"
          description="Transform your admission operations and marketing predictability with our 14-day free trial."
          primaryCtaText="Start Free Trial"
          primaryCtaHref="/signup"
          secondaryCtaText="Contact Our Team"
          secondaryCtaHref="/contact"
        />
      </main>

      <PublicFooter />
    </div>
  );
}
