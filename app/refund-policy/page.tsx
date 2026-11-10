import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { PublicNavbar } from '@/components/marketing/public-navbar';
import { PublicFooter } from '@/components/marketing/public-footer';

export const metadata = {
  title: 'Refund & Cancellation Policy — AcademyGrowth',
  description:
    'Subscription cancellation, refund eligibility, and trial terms for AcademyGrowth platform subscribers.',
};

export default function RefundPolicyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-text-primary antialiased">
      <PublicNavbar />

      <main className="flex-1 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center text-xs font-semibold text-brand-900 hover:text-brand-700"
            >
              <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
              <span>Back to Home</span>
            </Link>
          </div>

          <Badge
            variant="outline"
            className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-brand-300 bg-brand-50 px-3.5 py-1.5 text-xs sm:text-sm font-semibold tracking-wide text-brand-900 shadow-soft"
          >
            Billing & Subscriptions
          </Badge>

          <h1 className="font-heading text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl">
            Refund & Cancellation Policy
          </h1>
          <p className="mt-2 text-xs text-text-muted">
            Last Updated: November 2026 • Operational Baseline
          </p>

          <div className="mt-8 space-y-8 text-sm text-text-secondary leading-relaxed border-t border-border-subtle pt-8">
            <section>
              <h2 className="font-heading text-lg font-bold text-text-primary">
                1. 14-Day Free Trial (Zero Risk)
              </h2>
              <p className="mt-2">
                Every newly registered institute is provisioned with a 14-day free
                trial upon completion of onboarding. No debit card, credit card, or
                bank mandate is captured to initiate the trial. If you choose not to
                subscribe after 14 days, no charges will ever occur.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-lg font-bold text-text-primary">
                2. Subscription Cancellation
              </h2>
              <p className="mt-2">
                You may cancel your monthly or annual subscription at any time
                directly from your institute billing settings. Upon cancellation, your
                access will continue until the conclusion of the currently paid
                billing period. We do not apply cancellation penalties or hidden
                account deactivation fees.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-lg font-bold text-text-primary">
                3. Refund Eligibility
              </h2>
              <p className="mt-2">
                As AcademyGrowth is digital cloud software offering an unrestricted
                14-day free trial prior to any billing commitment, monthly recurring
                subscription fees are generally non-refundable once processed.
              </p>
              <p className="mt-2">
                However, if you experienced technical service unavailability
                exceeding standard service limits, or if duplicate billing
                occurred due to a payment gateway processing anomaly, you may
                request a refund within <strong>7 days</strong> of the transaction date
                by emailing{' '}
                <a
                  href="mailto:billing@academygrowth.com"
                  className="font-medium text-brand-900 underline"
                >
                  billing@academygrowth.com
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="font-heading text-lg font-bold text-text-primary">
                4. Data Export Prior to Termination
              </h2>
              <p className="mt-2">
                In the event of cancellation, you retain the ability to export all
                student inquiries, interaction logs, and campaign history in CSV /
                Excel format before the subscription period concludes.
              </p>
            </section>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}

