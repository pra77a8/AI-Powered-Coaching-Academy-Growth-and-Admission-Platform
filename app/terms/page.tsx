import React from 'react';
import Link from 'next/link';
import { FileText, ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { PublicNavbar } from '@/components/marketing/public-navbar';
import { PublicFooter } from '@/components/marketing/public-footer';

export const metadata = {
  title: 'Terms and Conditions — AcademyGrowth',
  description:
    'Terms of service and subscription agreement for AcademyGrowth platform users and coaching institutes.',
};

export default function TermsPage() {
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
            className="mb-4 border-brand-300 bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-900"
          >
            Agreement & Policies
          </Badge>

          <h1 className="font-heading text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl">
            Terms and Conditions
          </h1>
          <p className="mt-2 text-xs text-text-muted">
            Last Updated: November 2026 • Operational Baseline
          </p>

          <div className="mt-8 space-y-8 text-sm text-text-secondary leading-relaxed border-t border-border-subtle pt-8">
            <section>
              <h2 className="font-heading text-lg font-bold text-text-primary">
                1. Acceptance of Terms
              </h2>
              <p className="mt-2">
                By registering an institute account, inviting team members, or
                accessing the AcademyGrowth platform, you agree to be bound by these
                Terms and Conditions. If you are entering into this agreement on
                behalf of a coaching institute or coaching business entity, you
                represent that you have the authority to bind such entity.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-lg font-bold text-text-primary">
                2. Subscription Tiers & 14-Day Free Trial
              </h2>
              <p className="mt-2">
                New institutes receive a 14-day free trial granting complete access
                to the platform. Following the conclusion of the trial period,
                continued usage requires selection of a paid subscription plan
                (Starter ₹499/mo, Growth ₹1,499/mo, or Professional ₹2,999/mo).
                Invoices are generated electronically for monthly or annual billing
                cycles.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-lg font-bold text-text-primary">
                3. Acceptable Use of AI Content Studio
              </h2>
              <p className="mt-2">
                Institutes agree not to use the AI Content Studio to generate
                defamatory, fraudulent, or deceptive advertising materials.
                Advertising claims regarding guaranteed exam ranks, fake faculty
                credentials, or fabricated results violate our acceptable use
                policy and may result in immediate account termination.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-lg font-bold text-text-primary">
                4. Institute Responsibility for Staff Accounts
              </h2>
              <p className="mt-2">
                Institute administrators are responsible for maintaining the
                confidentiality of user credentials and managing invitations
                extended to counsellors, marketers, and teachers. All activities
                conducted under authorized accounts are the responsibility of the
                subscriber institute.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-lg font-bold text-text-primary">
                5. Platform Uptime & Maintenance
              </h2>
              <p className="mt-2">
                We make commercially reasonable efforts to ensure 99.9% platform
                availability. Scheduled maintenance windows are communicated in
                advance and scheduled outside peak coaching counselling hours
                whenever feasible.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-lg font-bold text-text-primary">
                6. Governing Law & Dispute Resolution
              </h2>
              <p className="mt-2">
                These terms are governed by and construed in accordance with the laws
                of India. In the event of any disputes, courts located in Pune /
                Bengaluru, India, shall have exclusive jurisdiction.
              </p>
            </section>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}

