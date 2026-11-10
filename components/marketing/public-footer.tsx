import React from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Mail,
  MapPin,
} from 'lucide-react';

export function PublicFooter() {
  return (
    <footer className="border-t border-border-subtle bg-white text-text-primary">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Info & Mission */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 rounded-lg"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-900 text-white shadow-soft">
                <GraduationCap className="h-5 w-5 text-brand-300" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-lg font-bold tracking-tight text-text-primary leading-tight">
                  AcademyGrowth
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-brand-700">
                  Coaching Platform
                </span>
              </div>
            </Link>

            <p className="mt-4 max-w-sm text-sm text-text-secondary leading-relaxed">
              The all-in-one AI-powered growth and admissions management platform
              designed specifically for coaching institutes, competitive exam
              academies, and educational founders.
            </p>

            <div className="mt-6 flex items-center gap-2 text-xs font-medium text-brand-800 bg-brand-50 border border-brand-200/70 rounded-lg px-3 py-2 w-fit">
              <ShieldCheck className="h-4 w-4 text-brand-700 flex-shrink-0" />
              <span>14-Day Free Trial • No Credit Card Required</span>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-heading text-xs font-bold uppercase tracking-wider text-text-primary">
              Product
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link
                  href="/features"
                  className="text-text-secondary transition-colors hover:text-brand-900"
                >
                  Features & Tools
                </Link>
              </li>
              <li>
                <Link
                  href="/solutions"
                  className="text-text-secondary transition-colors hover:text-brand-900"
                >
                  Institute Solutions
                </Link>
              </li>
              <li>
                <Link
                  href="/how-it-works"
                  className="text-text-secondary transition-colors hover:text-brand-900"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-text-secondary transition-colors hover:text-brand-900"
                >
                  Pricing Plans
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Resources Links */}
          <div>
            <h3 className="font-heading text-xs font-bold uppercase tracking-wider text-text-primary">
              Company
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-text-secondary transition-colors hover:text-brand-900"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/resources"
                  className="text-text-secondary transition-colors hover:text-brand-900"
                >
                  Resource Hub
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-text-secondary transition-colors hover:text-brand-900"
                >
                  Contact & Demo
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-text-secondary transition-colors hover:text-brand-900"
                >
                  Institute Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Compliance Links */}
          <div>
            <h3 className="font-heading text-xs font-bold uppercase tracking-wider text-text-primary">
              Legal & Policy
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link
                  href="/privacy"
                  className="text-text-secondary transition-colors hover:text-brand-900"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-text-secondary transition-colors hover:text-brand-900"
                >
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/refund-policy"
                  className="text-text-secondary transition-colors hover:text-brand-900"
                >
                  Refund & Cancellation Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="text-text-secondary transition-colors hover:text-brand-900"
                >
                  Staff Sign In
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between border-t border-border-subtle pt-8 text-xs text-text-secondary sm:flex-row gap-4">
          <p>© 2026 AcademyGrowth Platform. All rights reserved.</p>
          <p className="text-center sm:text-right">
            Engineered for high-performing coaching academies, competitive exam
            centers, and admission teams.
          </p>
        </div>
      </div>
    </footer>
  );
}

