'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Check,
  HelpCircle,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { PublicNavbar } from '@/components/marketing/public-navbar';
import { PublicFooter } from '@/components/marketing/public-footer';
import { SectionHeading } from '@/components/marketing/section-heading';
import { CTASection } from '@/components/marketing/cta-section';

export default function PricingPage() {
  const [annualBilling, setAnnualBilling] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const plans = [
    {
      name: 'Starter',
      target: 'Small coaching institutes & solo tutors',
      monthlyPrice: 499,
      annualPrice: 399,
      popular: false,
      features: [
        '1 Center / Branch',
        'Up to 300 active inquiries/month',
        '2 Staff Accounts (1 Admin + 1 Counsellor)',
        'Core Admission CRM & Kanban',
        'Basic AI Content Studio (25 gens/mo)',
        'Student Lead Source Tracking',
        'Standard Email Support',
      ],
      ctaText: 'Start 14-Day Free Trial',
      ctaHref: '/signup?plan=starter',
    },
    {
      name: 'Growth',
      target: 'Growing academies expanding batch sizes',
      monthlyPrice: 1499,
      annualPrice: 1199,
      popular: true,
      features: [
        '1 Center (Multi-course ready)',
        'Up to 1,500 active inquiries/month',
        'Up to 6 Staff Accounts (Admin, Counsellors, Marketer)',
        'Full CRM Kanban & Auto-assignment',
        'Advanced AI Content Studio (200 gens/mo)',
        'Marketing Campaign ROI & CPI/CPA Tracker',
        'Student Success Vault (Rankers & Testimonials)',
        'Priority WhatsApp & Email Support',
      ],
      ctaText: 'Start 14-Day Free Trial',
      ctaHref: '/signup?plan=growth',
    },
    {
      name: 'Professional',
      target: 'Established coaching institutes & regional leaders',
      monthlyPrice: 2999,
      annualPrice: 2399,
      popular: false,
      features: [
        '1 Center (Multi-branch architectural ready)',
        'Unlimited active inquiries/month',
        'Unlimited Staff Accounts & custom permissions',
        'Full AI Content Studio (Unlimited gens)',
        'Advanced Analytics, Custom Reports & Exports',
        'AI Growth Assistant & Drop-off Alerts',
        'Dedicated Onboarding & Account Manager',
        'Priority 24/7 Support Escalation',
      ],
      ctaText: 'Start 14-Day Free Trial',
      ctaHref: '/signup?plan=professional',
    },
  ];

  const faqs = [
    {
      q: 'How does the 14-day free trial work?',
      a: 'When you create an account for your coaching institute, you immediately receive complete access to AcademyGrowth for 14 days. No credit card, debit card, or payment details are required to start.',
    },
    {
      q: 'What happens when my 14-day trial ends?',
      a: 'At the end of your 14 days, you can choose one of the approved subscription plans (Starter ₹499, Growth ₹1,499, or Professional ₹2,999/month) to continue using all features. Your existing inquiries, student leads, and settings remain completely intact.',
    },
    {
      q: 'Can I change my plan or cancel at any time?',
      a: 'Yes. You can upgrade, downgrade, or cancel your subscription at any time directly from your institute billing settings. If you cancel, your subscription remains active until the end of your billing cycle.',
    },
    {
      q: 'Are my institute and student inquiry data private?',
      a: 'Absolutely. We enforce strict database-level Row-Level Security (RLS). Your student phone numbers, counselling notes, and marketing budgets can never be viewed or accessed by other institutes.',
    },
    {
      q: 'Does AcademyGrowth support multiple staff accounts?',
      a: 'Yes! Even the Starter plan includes 2 staff accounts. Growth supports up to 6 staff members, and Professional includes unlimited accounts for all your counsellors, marketers, and administrators.',
    },
    {
      q: 'Can I export my student leads and analytics data?',
      a: 'Yes. You can export inquiries, student contact information, and campaign analytics to CSV or Excel at any time with one click.',
    },
    {
      q: 'How long does onboarding and initial setup take?',
      a: 'Most coaching institutes are fully operational within 15 minutes. Just name your institute, configure your target courses (e.g. JEE, NEET, MHT-CET, UPSC), and start logging leads immediately.',
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background text-text-primary antialiased">
      <PublicNavbar />

      <main className="flex-1">
        {/* Pricing Hero */}
        <section className="bg-gradient-to-b from-[#EFF7F4]/60 via-background to-background pt-16 pb-12 sm:pt-20 sm:pb-16 text-center">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Badge
              variant="outline"
              className="mb-4 border-brand-300 bg-white/80 px-3.5 py-1 text-xs font-semibold text-brand-900 shadow-soft"
            >
              Transparent Pricing
            </Badge>

            <h1 className="font-heading text-3xl font-extrabold tracking-tight text-text-primary sm:text-5xl lg:text-6xl leading-[1.15]">
              Simple Plans for{' '}
              <span className="text-brand-900 underline decoration-brand-400 decoration-wavy decoration-from-font underline-offset-8">
                Growing Coaching Institutes
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-text-secondary leading-relaxed">
              Choose a plan that fits your institute&apos;s requirements. All plans
              include a 14-day free trial with no credit card required.
            </p>

            {/* Monthly / Annual Toggle */}
            <div className="mt-10 flex items-center justify-center gap-3">
              <span
                className={`text-sm font-medium ${
                  !annualBilling ? 'text-text-primary font-bold' : 'text-text-secondary'
                }`}
              >
                Monthly Billing
              </span>
              <button
                type="button"
                onClick={() => setAnnualBilling(!annualBilling)}
                className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-700 ${
                  annualBilling ? 'bg-brand-900' : 'bg-neutral-300'
                }`}
                role="switch"
                aria-checked={annualBilling}
                aria-label="Toggle annual billing discount"
              >
                <span
                  className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-soft ring-0 transition duration-200 ease-in-out ${
                    annualBilling ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
              <div className="flex items-center gap-1.5">
                <span
                  className={`text-sm font-medium ${
                    annualBilling
                      ? 'text-text-primary font-bold'
                      : 'text-text-secondary'
                  }`}
                >
                  Annual Billing
                </span>
                <span className="rounded-full bg-brand-100 px-2 py-0.5 text-[11px] font-bold text-brand-900">
                  Save 20%
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="border-t border-border-subtle bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {plans.map((plan) => {
                const price = annualBilling ? plan.annualPrice : plan.monthlyPrice;
                return (
                  <div
                    key={plan.name}
                    className={`relative flex flex-col rounded-3xl p-8 transition-all ${
                      plan.popular
                        ? 'border-2 border-brand-800 bg-[#EFF7F4]/30 shadow-strong'
                        : 'border border-border-subtle bg-white shadow-soft hover:border-brand-200'
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                        <span className="rounded-full bg-brand-900 px-4 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-soft">
                          Most Popular
                        </span>
                      </div>
                    )}

                    <div>
                      <h3 className="font-heading text-2xl font-bold text-text-primary">
                        {plan.name}
                      </h3>
                      <p className="mt-1 text-xs text-text-secondary">
                        {plan.target}
                      </p>

                      <div className="mt-6 flex items-baseline gap-1">
                        <span className="font-heading text-4xl font-extrabold text-brand-900">
                          ₹{price}
                        </span>
                        <span className="text-sm font-medium text-text-secondary">
                          / month
                        </span>
                      </div>
                      {annualBilling && (
                        <p className="mt-1 text-xs text-brand-700">
                          Billed annually (₹{price * 12}/year)
                        </p>
                      )}
                    </div>

                    <div className="mt-8 border-t border-border-subtle pt-6 flex-1">
                      <p className="text-xs font-semibold uppercase tracking-wider text-text-secondary mb-4">
                        What&apos;s Included:
                      </p>
                      <ul className="space-y-3 text-xs sm:text-sm text-text-primary">
                        {plan.features.map((feat) => (
                          <li key={feat} className="flex items-start gap-2.5">
                            <Check className="h-4 w-4 text-brand-700 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-8 border-t border-border-subtle pt-6">
                      <Link href={plan.ctaHref} className="w-full">
                        <Button
                          className={`w-full h-11 text-sm font-semibold ${
                            plan.popular
                              ? 'bg-brand-900 text-white hover:bg-brand-800 shadow-soft'
                              : 'bg-white border border-border-subtle text-text-primary hover:bg-neutral-50'
                          }`}
                        >
                          <span>{plan.ctaText}</span>
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                      <p className="mt-2 text-center text-[11px] text-text-muted">
                        14-day free trial • Cancel anytime
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Free Trial Banner */}
            <div className="mt-12 rounded-2xl border border-brand-200 bg-brand-50 p-6 text-center sm:p-8">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 text-left">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-900 text-white shrink-0">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-heading text-base font-bold text-brand-950">
                      Unconditional 14-Day Free Trial on All Tiers
                    </h4>
                    <p className="text-xs text-brand-800">
                      Experience the full power of AcademyGrowth with your team. Zero
                      payment credentials required to sign up.
                    </p>
                  </div>
                </div>
                <Link href="/signup">
                  <Button className="bg-brand-900 text-white hover:bg-brand-800 shrink-0">
                    Start Trial Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="border-t border-border-subtle bg-background py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Frequently Asked Questions"
              title="Got Questions? We Have Answers."
              description="Everything you need to know about our plans, free trial, and institute setup."
            />

            <div className="mt-12 space-y-4">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={faq.q}
                    className="rounded-2xl border border-border-subtle bg-white shadow-soft transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(index)}
                      className="flex w-full items-center justify-between p-5 text-left font-heading text-base font-bold text-text-primary hover:text-brand-900 focus:outline-none"
                      aria-expanded={isOpen}
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`h-5 w-5 text-text-secondary transition-transform duration-200 shrink-0 ${
                          isOpen ? 'rotate-180 text-brand-900' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="border-t border-border-subtle px-5 pb-5 pt-3 text-sm text-text-secondary leading-relaxed">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <CTASection
          title="Start Growing Your Coaching Institute Today"
          description="Get started in minutes with our 14-day free trial. No credit card required."
          primaryCtaText="Start Free Trial"
          primaryCtaHref="/signup"
          secondaryCtaText="Contact Us"
          secondaryCtaHref="/contact"
        />
      </main>

      <PublicFooter />
    </div>
  );
}

