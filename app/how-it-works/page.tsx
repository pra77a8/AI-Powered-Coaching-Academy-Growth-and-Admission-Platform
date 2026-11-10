import React from 'react';
import Link from 'next/link';
import {
  Megaphone,
  UserPlus,
  PhoneCall,
  CheckCircle2,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Zap,
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
  title: 'How It Works — AcademyGrowth | 5-Step Admissions Acceleration',
  description:
    'Discover how AcademyGrowth transforms student inquiries into enrolled admissions through a streamlined 5-step growth workflow.',
};

export default function HowItWorksPage() {
  const steps = [
    {
      step: '01',
      title: 'Attract',
      subtitle: 'Create targeted marketing campaigns & promotional content',
      icon: Megaphone,
      description:
        'Use the AI Content Studio to craft compelling ad copy, social posts, WhatsApp messages, and banner headlines tailored to your courses and exam dates. Launch campaigns across Meta, Google, local seminars, and print media with clear tracking attribution.',
      details: [
        'AI-assisted marketing content generation',
        'Ready-to-use WhatsApp broadcast templates',
        'Campaign tracking links to measure inquiry sources',
      ],
    },
    {
      step: '02',
      title: 'Capture',
      subtitle: 'Bring student inquiries into a centralized admission register',
      icon: UserPlus,
      description:
        'Eliminate scattered spreadsheets and lost sticky notes. Inquiries from website landing pages, Meta lead forms, phone calls, and campus walk-ins flow automatically into a single, unified database.',
      details: [
        'Multi-channel lead ingestion in real time',
        'Zero lead duplication or manual copy-pasting',
        'Instant confirmation messages sent to inquiring parents',
      ],
    },
    {
      step: '03',
      title: 'Connect',
      subtitle: 'Organize counsellor assignments and prompt follow-ups',
      icon: PhoneCall,
      description:
        'Inquiries are routed to admission counsellors via round-robin or exam specialty. Counsellors receive immediate notifications, record consultation notes, and schedule timely follow-ups so no interested student gets forgotten.',
      details: [
        'Sub-15 minute initial counsellor response time',
        'Structured consultation notes & parent interaction log',
        'Automated reminder notifications for scheduled calls',
      ],
    },
    {
      step: '04',
      title: 'Convert',
      subtitle: 'Track interested students and manage admission progress',
      icon: CheckCircle2,
      description:
        'Move students smoothly across the interactive Kanban pipeline: from Counselling to Demo Lecture, Scholarship Test, and Confirmed Admission. Track batch seat availability and fee receipt milestones with full team visibility.',
      details: [
        'Drag-and-drop Kanban pipeline progression',
        'Clear visibility into batch seat capacities',
        'Seamless transition from prospect to registered student',
      ],
    },
    {
      step: '05',
      title: 'Grow',
      subtitle: 'Analyze marketing performance & receive AI growth advice',
      icon: TrendingUp,
      description:
        'Review your dashboard to see your exact Cost Per Inquiry (CPI) and Cost Per Admission (CPA) across every marketing channel. The AI Growth Assistant highlights high-performing campaigns and identifies conversion drop-offs.',
      details: [
        'Automated ROI and Cost Per Admission calculation',
        'Counsellor performance and conversion rate analytics',
        'AI recommendations for upcoming batch launches',
      ],
    },
  ];

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
              5-Step Admissions Journey
            </Badge>

            <h1 className="font-heading text-3xl font-extrabold tracking-tight text-text-primary sm:text-5xl lg:text-6xl leading-[1.15]">
              Your Institute&apos;s Growth Journey,{' '}
              <span className="text-brand-900 underline decoration-brand-400 decoration-wavy decoration-from-font underline-offset-8">
                Simplified.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-base sm:text-lg text-text-secondary leading-relaxed">
              From the moment an inquiring parent sees your first announcement to
              the day their child sits in your classroom, AcademyGrowth connects
              every critical milestone.
            </p>
          </div>
        </section>

        {/* Workflow Animation Placeholder */}
        <section className="border-t border-border-subtle bg-white py-12">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <AssetPlaceholder
              id="placeholder-workflow-full"
              label="Marketing to Admission Workflow Animation"
              assetNeeded="Interactive Lottie animation showing end-to-end student journey from campaign click to classroom enrollment."
              searchKeywords="business process workflow connected steps animation Lottie"
              format="Lottie JSON"
              aspectRatio="wide"
              icon="layers"
            />
          </div>
        </section>

        {/* Detailed 5-Step Process */}
        <section className="border-t border-border-subtle bg-background py-16 sm:py-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="space-y-12">
              {steps.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.step}
                    className="relative flex flex-col md:flex-row gap-6 lg:gap-10 rounded-2xl border border-border-subtle bg-white p-6 sm:p-8 shadow-soft transition-all hover:border-brand-300 hover:shadow-medium"
                  >
                    {/* Step indicator */}
                    <div className="flex md:flex-col items-center md:items-start justify-between md:justify-start gap-4 shrink-0">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-900 text-white font-heading text-xl font-bold shadow-soft">
                        {item.step}
                      </div>
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-800">
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>

                    {/* Step Content */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="font-heading text-xl sm:text-2xl font-bold text-text-primary">
                          {item.title}
                        </h2>
                        <span className="text-xs font-medium text-brand-800 bg-brand-50 px-2.5 py-0.5 rounded-full">
                          Stage {idx + 1} of 5
                        </span>
                      </div>

                      <p className="mt-1 font-medium text-sm text-brand-900">
                        {item.subtitle}
                      </p>

                      <p className="mt-3 text-sm text-text-secondary leading-relaxed">
                        {item.description}
                      </p>

                      <div className="mt-4 border-t border-border-subtle pt-4">
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-text-primary">
                          {item.details.map((detail) => (
                            <li key={detail} className="flex items-center gap-2">
                              <CheckCircle2 className="h-4 w-4 text-brand-700 shrink-0" />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* The Value of a Unified Platform */}
        <section className="border-t border-border-subtle bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="The Power of Unity"
              title="Why a Single Platform Changes Everything"
              description="When your marketing, counsellor calls, and student data live in one place, growth becomes predictable."
            />

            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="rounded-2xl border border-border-subtle bg-surface p-6 shadow-soft">
                <h3 className="font-heading text-base font-bold text-text-primary">
                  Zero Data Fragmentation
                </h3>
                <p className="mt-2 text-xs text-text-secondary leading-relaxed">
                  No more copying phone numbers from Facebook Leads into Excel, then
                  forwarding to counsellors on WhatsApp. Every action occurs in one
                  synchronized database.
                </p>
              </div>

              <div className="rounded-2xl border border-border-subtle bg-surface p-6 shadow-soft">
                <h3 className="font-heading text-base font-bold text-text-primary">
                  True Financial Accountability
                </h3>
                <p className="mt-2 text-xs text-text-secondary leading-relaxed">
                  Because campaign spend and confirmed student fees are tracked in the
                  same system, you calculate exact return on investment rather than
                  guessing.
                </p>
              </div>

              <div className="rounded-2xl border border-border-subtle bg-surface p-6 shadow-soft">
                <h3 className="font-heading text-base font-bold text-text-primary">
                  Higher Staff Morale
                </h3>
                <p className="mt-2 text-xs text-text-secondary leading-relaxed">
                  Counsellors spend time having meaningful conversations with
                  students instead of wrestling with unorganized spreadsheets and lost
                  contact lists.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <CTASection
          title="Ready to Streamline Your Admissions Process?"
          description="Start your 14-day free trial today. See how simple managing student inquiries can truly be."
          primaryCtaText="Start Free Trial"
          primaryCtaHref="/signup"
          secondaryCtaText="Book a Platform Tour"
          secondaryCtaHref="/contact"
        />
      </main>

      <PublicFooter />
    </div>
  );
}

