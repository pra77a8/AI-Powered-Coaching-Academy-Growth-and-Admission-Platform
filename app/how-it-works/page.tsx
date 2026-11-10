import React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  Megaphone,
  Layers,
  MessageSquare,
  GraduationCap,
  BarChart3,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PublicNavbar } from '@/components/marketing/public-navbar';
import { PublicFooter } from '@/components/marketing/public-footer';
import { SectionHeading } from '@/components/marketing/section-heading';
import { CTASection } from '@/components/marketing/cta-section';

export const metadata = {
  title: 'How It Works — AcademyGrowth Admissions Journey',
  description:
    'See how AcademyGrowth connects marketing, inquiries, counselling and admissions into one organized growth journey.',
};

const stages = [
  {
    step: '01',
    name: 'Attract',
    icon: Megaphone,
    description: 'Reach prospective students through targeted marketing.',
  },
  {
    step: '02',
    name: 'Capture',
    icon: Layers,
    description: 'Bring inquiries into one centralized system.',
  },
  {
    step: '03',
    name: 'Connect',
    icon: MessageSquare,
    description: 'Organize counsellor communication and follow-ups.',
  },
  {
    step: '04',
    name: 'Convert',
    icon: GraduationCap,
    description: 'Track admission progress and student conversions.',
  },
  {
    step: '05',
    name: 'Grow',
    icon: BarChart3,
    description: 'Measure performance and improve growth decisions.',
  },
];

export default function HowItWorksPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-text-primary antialiased">
      <PublicNavbar />

      <main className="flex-1">
        {/* Header Hero */}
        <section className="bg-markova-grid-hero border-b border-border-subtle/60 pt-16 pb-12 sm:pt-20 sm:pb-16 text-center">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Badge
              variant="outline"
              className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-brand-300 bg-white/90 px-4 py-1.5 text-xs sm:text-sm font-semibold tracking-wide text-brand-900 shadow-soft"
            >
              The Journey
            </Badge>

            <h1 className="font-heading text-3xl font-extrabold tracking-tight text-text-primary sm:text-5xl lg:text-6xl leading-[1.15]">
              From First Inquiry to{' '}
              <span className="text-brand-900">
                Successful Admission
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-base sm:text-lg text-text-secondary leading-relaxed">
              See how AcademyGrowth connects marketing, inquiries, counselling and
              admissions into one organized growth journey.
            </p>
          </div>
        </section>

        {/* Main Interactive HTML Admissions Journey Animation */}
        <section className="border-t border-border-subtle bg-white py-12 sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="overflow-hidden rounded-3xl border border-brand-200/80 bg-white shadow-strong">
              <div className="relative w-full aspect-[16/9] sm:aspect-[16/8] md:aspect-[16/7] min-h-[440px] sm:min-h-[500px]">
                <iframe
                  src="/assets/admissions-journey.html"
                  title="AcademyGrowth Admissions Journey Interactive Animation"
                  className="absolute inset-0 h-full w-full border-0"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Concise 5-Stage Step Breakdown */}
        <section className="border-t border-border-subtle bg-background py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="5-Stage Process"
              title="A Clear, Predictable Path to Enrollment"
              description="Each stage gives your team complete clarity on student progress."
            />

            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
              {stages.map((stage) => {
                const Icon = stage.icon;
                return (
                  <div
                    key={stage.step}
                    className="group relative flex flex-col justify-between rounded-2xl border border-border-subtle bg-white p-6 shadow-soft transition-all hover:border-brand-300 hover:shadow-medium"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-900 text-white font-heading text-sm font-bold shadow-soft transition-transform group-hover:scale-105">
                          {stage.step}
                        </span>
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-800">
                          <Icon className="h-4 w-4" />
                        </div>
                      </div>

                      <h3 className="font-heading text-lg font-bold text-text-primary">
                        {stage.name}
                      </h3>

                      <p className="mt-2 text-xs sm:text-sm text-text-secondary leading-relaxed">
                        {stage.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-border-subtle/80 flex items-center text-xs font-semibold text-brand-700">
                      <span>Stage {stage.step} of 05</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Unified Platform Advantage */}
        <section className="border-t border-border-subtle bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="The Power of Unity"
              title="Why Disconnected Tools Slow Down Academy Growth"
              description="When inquiry capture, counselling and marketing live in silos, conversion rates drop and costs escalate."
            />

            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
              {/* Disconnected Stack */}
              <div className="rounded-2xl border border-red-200/80 bg-red-50/30 p-8 shadow-soft">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-100 text-red-700 font-bold">
                    ✕
                  </div>
                  <h3 className="font-heading text-xl font-bold text-red-950">
                    The Fragmented Way
                  </h3>
                </div>

                <ul className="space-y-3.5 text-sm text-red-900/80">
                  <li className="flex items-start gap-2.5">
                    <span className="font-bold text-red-600 mt-0.5">•</span>
                    <span>Inquiries lost across WhatsApp, paper registers, and multiple sheets.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="font-bold text-red-600 mt-0.5">•</span>
                    <span>Delayed callbacks: interested parents enroll in rival institutes.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="font-bold text-red-600 mt-0.5">•</span>
                    <span>Unknown marketing ROI: ad money spent blindly without attribution.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="font-bold text-red-600 mt-0.5">•</span>
                    <span>Staff burnout drafting repetitive messages and social posts manually.</span>
                  </li>
                </ul>
              </div>

              {/* AcademyGrowth Stack */}
              <div className="rounded-2xl border border-brand-300 bg-brand-50/50 p-8 shadow-soft">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-900 text-white font-bold">
                    ✓
                  </div>
                  <h3 className="font-heading text-xl font-bold text-brand-950">
                    The AcademyGrowth Way
                  </h3>
                </div>

                <ul className="space-y-3.5 text-sm text-brand-900">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-brand-700 shrink-0 mt-0.5" />
                    <span>Single centralized pipeline for every walk-in, web lead, and ad click.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-brand-700 shrink-0 mt-0.5" />
                    <span>Instant WhatsApp confirmations and automated counsellor callback queue.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-brand-700 shrink-0 mt-0.5" />
                    <span>Real-time CPI and true Cost Per Admission calculated per channel.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-brand-700 shrink-0 mt-0.5" />
                    <span>AI drafts promotional campaigns, topper alerts, and exam notices in seconds.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <CTASection
          title="Ready to Put Your Admissions Journey on Autopilot?"
          description="Experience how AcademyGrowth accelerates enrollment and gives you complete control over your marketing spend."
          primaryCtaText="Start 14-Day Free Trial"
          primaryCtaHref="/signup"
          secondaryCtaText="Watch Live Demo"
          secondaryCtaHref="/contact"
        />
      </main>

      <PublicFooter />
    </div>
  );
}
