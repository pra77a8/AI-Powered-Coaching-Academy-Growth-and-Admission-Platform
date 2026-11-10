import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CTASectionProps {
  title?: string;
  description?: string;
  primaryCtaText?: string;
  primaryCtaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  showBadge?: boolean;
}

export function CTASection({
  title = 'Ready to Grow Your Coaching Institute?',
  description = 'Bring your admissions, marketing, and growth activities together with AcademyGrowth. Start your 14-day free trial today.',
  primaryCtaText = 'Start Your Free Trial',
  primaryCtaHref = '/signup',
  secondaryCtaText = 'Schedule a Demo',
  secondaryCtaHref = '/contact',
  showBadge = true,
}: CTASectionProps) {
  return (
    <section className="relative overflow-hidden bg-brand-900 py-16 sm:py-20 text-white">
      {/* Subtle background decorative shapes */}
      <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-brand-800/40 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-brand-700/30 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        {showBadge && (
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-700 bg-brand-800/80 px-4 py-1.5 text-xs font-semibold text-brand-200 mb-6">
            <Sparkles className="h-3.5 w-3.5 text-brand-300" />
            <span>14-Day Free Trial • Instant Setup</span>
          </div>
        )}

        <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-white">
          {title}
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg text-brand-100 leading-relaxed">
          {description}
        </p>

        {/* Benefits bullets */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm text-brand-200">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-brand-400" />
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-brand-400" />
            <span>Full feature access for 14 days</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-brand-400" />
            <span>Set up in 15 minutes</span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href={primaryCtaHref} className="w-full sm:w-auto">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-white text-brand-900 hover:bg-neutral-100 font-semibold shadow-medium h-12 px-8"
            >
              <span>{primaryCtaText}</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href={secondaryCtaHref} className="w-full sm:w-auto">
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-brand-700 bg-brand-800/60 text-white hover:bg-brand-800 h-12 px-8 font-medium"
            >
              {secondaryCtaText}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

