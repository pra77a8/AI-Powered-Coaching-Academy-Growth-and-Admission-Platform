import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, FileText, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PublicNavbar } from '@/components/marketing/public-navbar';
import { PublicFooter } from '@/components/marketing/public-footer';

export const metadata = {
  title: 'Privacy Policy — AcademyGrowth',
  description:
    'AcademyGrowth privacy policy, student data security commitments, and Row-Level Security isolation standards.',
};

export default function PrivacyPage() {
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
            Data Privacy & Security
          </Badge>

          <h1 className="font-heading text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-2 text-xs text-text-muted">
            Last Updated: November 2026 • Operational Baseline
          </p>

          <div className="mt-8 space-y-8 text-sm text-text-secondary leading-relaxed border-t border-border-subtle pt-8">
            <section>
              <h2 className="font-heading text-lg font-bold text-text-primary">
                1. Overview & Commitment to Educational Privacy
              </h2>
              <p className="mt-2">
                AcademyGrowth Technologies (&quot;AcademyGrowth&quot;, &quot;we&quot;, &quot;us&quot;, or
                &quot;our&quot;) provides a multi-tenant SaaS growth and admissions
                management platform for coaching institutes, competitive exam
                centers, and educational academies. We are committed to protecting
                the privacy, confidentiality, and integrity of student inquiry
                records, parental communications, and institutional operational
                data.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-lg font-bold text-text-primary">
                2. Multi-Tenant Data Isolation
              </h2>
              <p className="mt-2">
                All data stored within AcademyGrowth is strictly isolated at the
                database level through Supabase Row-Level Security (RLS) policies.
                No coaching institute can access, query, or infer data belonging to
                another institute. Inquiries, counsellor notes, and financial
                expenditures remain the exclusive property of your institution.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-lg font-bold text-text-primary">
                3. Student Information & No-Sale Guarantee
              </h2>
              <p className="mt-2">
                Student inquiry information (names, phone numbers, academic scores,
                target examinations, and parent contact details) entered into
                AcademyGrowth is processed solely on behalf of the subscriber
                institute. <strong>We do not sell, rent, broker, or monetize student
                or parent contact information to third parties or marketing brokers
                under any circumstance.</strong>
              </p>
            </section>

            <section>
              <h2 className="font-heading text-lg font-bold text-text-primary">
                4. Information We Collect
              </h2>
              <ul className="mt-2 list-disc pl-5 space-y-1.5">
                <li>
                  <strong>Account Registration:</strong> Name, work email address,
                  institute name, phone number, and password credentials.
                </li>
                <li>
                  <strong>Admission Inquiries:</strong> Inquiries logged by your staff
                  or captured via connected forms for the purpose of admission
                  pipeline management.
                </li>
                <li>
                  <strong>Usage & Analytics:</strong> Aggregate platform usage metrics
                  to monitor system reliability and token quotas.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-lg font-bold text-text-primary">
                5. Student Testimonial & Hall of Fame Consent
              </h2>
              <p className="mt-2">
                The Student Success Vault module requires affirmative consent tags
                prior to publicizing topper rank cards or student testimonials.
                Institutes are responsible for obtaining parental consent before
                displaying minor student likenesses or scores.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-lg font-bold text-text-primary">
                6. Contact for Privacy Matters
              </h2>
              <p className="mt-2">
                If you have questions regarding our privacy practices or wish to
                request export or deletion of your institute&apos;s data, please contact
                our Data Protection Officer at{' '}
                <a
                  href="mailto:privacy@academygrowth.com"
                  className="font-medium text-brand-900 underline"
                >
                  privacy@academygrowth.com
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}

