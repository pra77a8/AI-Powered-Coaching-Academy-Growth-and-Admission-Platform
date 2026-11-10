import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  ArrowLeft,
} from 'lucide-react';

interface AuthShellProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export function AuthShell({ children, title, subtitle }: AuthShellProps) {
  return (
    <div className="flex min-h-screen bg-background text-text-primary antialiased">
      {/* Left Brand Panel (Desktop) */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-brand-900 p-12 text-white lg:flex xl:p-16">
        {/* Background Decorative Blur */}
        <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-brand-800/60 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-brand-700/40 blur-3xl" />

        {/* Brand Header */}
        <div className="relative z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 rounded-lg group"
          >
            <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 backdrop-blur-md border border-white/20 p-1.5 shadow-soft transition-transform group-hover:scale-105">
              <Image
                src="/assets/images/logo-academicgrowth-tight.png"
                alt="AcademyGrowth Logo"
                width={44}
                height={44}
                className="h-full w-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-xl font-bold tracking-tight text-white leading-tight">
                AcademyGrowth
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-brand-300">
                Coaching Growth Platform
              </span>
            </div>
          </Link>
        </div>

        {/* Value Proposition & Testimonial */}
        <div className="relative z-10 my-auto max-w-lg space-y-8">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-brand-700 bg-brand-800/80 px-3.5 py-1 text-xs font-semibold text-brand-200 mb-4">
              <Sparkles className="h-3.5 w-3.5 text-brand-300" />
              <span>Smarter Admissions Management</span>
            </div>
            <h2 className="font-heading text-3xl font-extrabold tracking-tight xl:text-4xl text-white leading-tight">
              Empowering Coaching Academies to Scale with Confidence.
            </h2>
            <p className="mt-3 text-sm text-brand-100/90 leading-relaxed">
              Unify inquiry capture, counsellor follow-ups, and AI marketing in
              one secure, tenant-isolated workspace.
            </p>
          </div>

          <div className="space-y-3.5 border-t border-brand-800/70 pt-6">
            <div className="flex items-center gap-3">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-800 text-brand-300">
                <CheckCircle2 className="h-4 w-4" />
              </div>
              <span className="text-xs font-medium text-brand-100">
                14-day free trial on Pro features
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-800 text-brand-300">
                <CheckCircle2 className="h-4 w-4" />
              </div>
              <span className="text-xs font-medium text-brand-100">
                Unlimited lead pipeline with instant WhatsApp triggers
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-800 text-brand-300">
                <CheckCircle2 className="h-4 w-4" />
              </div>
              <span className="text-xs font-medium text-brand-100">
                Enterprise tenant data isolation with PostgreSQL RLS
              </span>
            </div>
          </div>

          {/* Social Proof Quote */}
          <div className="rounded-xl border border-brand-800/60 bg-brand-950/40 p-5 backdrop-blur-sm">
            <p className="text-xs italic text-brand-100 leading-relaxed">
              &ldquo;AcademyGrowth transformed our NEET batch intake. We captured
              over 450 inquiries and converted 38% into confirmed admissions
              without missing a single callback.&rdquo;
            </p>
            <div className="mt-3 flex items-center justify-between text-xs text-brand-300 font-medium">
              <span>Dr. R. K. Sharma, Director</span>
              <span className="text-brand-400">Apex IIT-JEE Academy</span>
            </div>
          </div>
        </div>

        {/* Footer Meta */}
        <div className="relative z-10 flex items-center justify-between border-t border-brand-800/70 pt-6 text-xs text-brand-300">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-brand-300" />
            <span>Bank-grade security & isolated data</span>
          </div>
          <span>&copy; {new Date().getFullYear()} AcademyGrowth</span>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="flex w-full flex-col justify-between p-6 sm:p-10 lg:w-1/2 lg:p-16">
        <div className="mx-auto w-full max-w-md">
          {/* Top navigation helper */}
          <div className="mb-8 flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center text-xs font-semibold text-text-secondary hover:text-brand-900 transition-colors"
            >
              <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
              <span>Back to Home</span>
            </Link>

            {/* Mobile Brand Logo */}
            <div className="flex items-center gap-2 lg:hidden">
              <div className="relative h-8 w-8 flex-shrink-0 overflow-hidden rounded-lg bg-brand-900/5 p-1">
                <Image
                  src="/assets/images/logo-academicgrowth-tight.png"
                  alt="AcademyGrowth Logo"
                  width={32}
                  height={32}
                  className="h-full w-full object-contain"
                />
              </div>
              <span className="font-heading text-sm font-bold text-text-primary">
                AcademyGrowth
              </span>
            </div>
          </div>

          {/* Form Header */}
          <div className="mb-6">
            <h1 className="font-heading text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
              {title}
            </h1>
            <p className="mt-2 text-sm text-text-secondary leading-relaxed">
              {subtitle}
            </p>
          </div>

          {/* Form Body */}
          {children}
        </div>

        {/* Security / Help Footer */}
        <div className="mx-auto mt-8 w-full max-w-md border-t border-border-subtle pt-6 text-center text-xs text-text-muted">
          <p>
            Protected by enterprise Row-Level Security • Need help?{' '}
            <Link
              href="/contact"
              className="font-medium text-brand-900 hover:underline"
            >
              Contact Support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
