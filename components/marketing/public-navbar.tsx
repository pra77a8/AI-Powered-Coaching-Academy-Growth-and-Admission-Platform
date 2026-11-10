'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavItem {
  label: string;
  href: string;
}

const NAV_LINKS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Features', href: '/features' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export function PublicNavbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border-subtle bg-white/95 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link
          href="/"
          className="group flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 rounded-lg"
          aria-label="AcademyGrowth Homepage"
        >
          <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-xl bg-brand-900/5 p-1 transition-transform group-hover:scale-105">
            <Image
              src="/assets/images/logo-academicgrowth-tight.png"
              alt="AcademyGrowth Logo"
              width={40}
              height={40}
              priority
              className="h-full w-full object-contain"
            />
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

        {/* Desktop Nav Links */}
        <nav
          className="hidden lg:flex items-center gap-1 xl:gap-2"
          aria-label="Primary Navigation"
        >
          {NAV_LINKS.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? 'bg-brand-50 text-brand-900 font-semibold'
                    : 'text-text-secondary hover:bg-neutral-100 hover:text-text-primary'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Action CTAs */}
        <div className="hidden sm:flex items-center gap-3">
          <Link href="/login">
            <Button
              variant="ghost"
              size="sm"
              className="text-text-secondary hover:text-text-primary font-medium"
            >
              Sign In
            </Button>
          </Link>
          <Link href="/signup">
            <Button
              size="sm"
              className="bg-brand-900 text-white hover:bg-brand-800 font-semibold shadow-soft"
            >
              <Sparkles className="mr-1.5 h-3.5 w-3.5 text-brand-300" />
              <span>Start Free Trial</span>
            </Button>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex lg:hidden items-center gap-2">
          <Link href="/signup" className="sm:hidden">
            <Button
              size="sm"
              className="bg-brand-900 text-white hover:bg-brand-800 text-xs px-2.5 h-8 font-semibold shadow-soft"
            >
              <span>Trial</span>
            </Button>
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center rounded-lg p-2 text-text-secondary hover:bg-neutral-100 hover:text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-700"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-border-subtle bg-white px-4 pt-2 pb-6 shadow-medium animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-1">
            {NAV_LINKS.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`rounded-lg px-3 py-2.5 text-base font-medium transition-colors ${
                    active
                      ? 'bg-brand-50 text-brand-900 font-semibold'
                      : 'text-text-secondary hover:bg-neutral-50 hover:text-text-primary'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-6 border-t border-border-subtle pt-4 flex flex-col gap-3">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full"
            >
              <Button
                variant="outline"
                className="w-full justify-center border-border-subtle text-text-primary font-medium"
              >
                Sign In
              </Button>
            </Link>

            <Link
              href="/signup"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full"
            >
              <Button className="w-full justify-center bg-brand-900 text-white hover:bg-brand-800 font-semibold shadow-soft">
                <Sparkles className="mr-2 h-4 w-4 text-brand-300" />
                <span>Start 14-Day Free Trial</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>

            <div className="mt-2 flex items-center justify-center gap-1.5 text-xs text-text-muted">
              <ShieldCheck className="h-3.5 w-3.5 text-brand-700" />
              <span>No credit card required • Instant access</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
