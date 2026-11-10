'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Sparkles,
  ArrowRight,
  Search,
  FileText,
  Video,
  Lightbulb,
  GraduationCap,
  Download,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { PublicNavbar } from '@/components/marketing/public-navbar';
import { PublicFooter } from '@/components/marketing/public-footer';
import { SectionHeading } from '@/components/marketing/section-heading';
import { CTASection } from '@/components/marketing/cta-section';
import { AssetPlaceholder } from '@/components/marketing/asset-placeholder';

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All',
    'Admissions',
    'Coaching Marketing',
    'Student Engagement',
    'Institute Management',
    'AI for Education',
  ];

  const sampleArticles = [
    {
      id: 'res-1',
      category: 'Admissions',
      title: 'How to Convert Walk-in Inquiries into Admissions in Under 24 Hours',
      readTime: '6 min read',
      tag: 'Guide Placeholder',
      description:
        'A comprehensive playbook for coaching front-desk counsellors on handling parent objections, building trust, and scheduling immediate diagnostic assessments.',
    },
    {
      id: 'res-2',
      category: 'Coaching Marketing',
      title: 'The Ultimate Coaching Institute Meta Ads & WhatsApp Strategy for 2026',
      readTime: '8 min read',
      tag: 'Playbook Placeholder',
      description:
        'Proven campaign structures to reduce cost per lead, filter non-serious inquiries, and nurture student leads via personalized WhatsApp sequences.',
    },
    {
      id: 'res-3',
      category: 'AI for Education',
      title: 'Leveraging AI Copywriting Without Losing Your Academy’s Authentic Voice',
      readTime: '5 min read',
      tag: 'Best Practices',
      description:
        'How coaching founders can use prompt engineering to draft hyper-localized exam tips, ranker celebration posts, and scholarship announcements.',
    },
    {
      id: 'res-4',
      category: 'Student Engagement',
      title: 'Building a High-Trust Student Testimonial & Hall of Fame Strategy',
      readTime: '7 min read',
      tag: 'Case Study Placeholder',
      description:
        'How to capture verified student video testimonials and parental feedback during result season with complete ethical consent workflows.',
    },
    {
      id: 'res-5',
      category: 'Institute Management',
      title: 'Structuring Counsellor Incentives: Aligning Team Workload with Admissions',
      readTime: '6 min read',
      tag: 'Management Guide',
      description:
        'A practical framework for coaching owners to track response times, fair lead distribution, and ethical counsellor conversion targets.',
    },
    {
      id: 'res-6',
      category: 'Admissions',
      title: 'The Pre-Exam Crash Course Admissions Checklist for Institute Directors',
      readTime: '4 min read',
      tag: 'Checklist Placeholder',
      description:
        'A step-by-step 30-day timeline to launch, promote, and fill short-term crash courses right before competitive exam registrations close.',
    },
  ];

  const filteredArticles =
    selectedCategory === 'All'
      ? sampleArticles
      : sampleArticles.filter((a) => a.category === selectedCategory);

  return (
    <div className="flex min-h-screen flex-col bg-background text-text-primary antialiased">
      <PublicNavbar />

      <main className="flex-1">
        {/* Resources Hero */}
        <section className="bg-gradient-to-b from-[#EFF7F4]/60 via-background to-background pt-16 pb-12 sm:pt-20 sm:pb-16 text-center">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Badge
              variant="outline"
              className="mb-4 border-brand-300 bg-white/80 px-3.5 py-1 text-xs font-semibold text-brand-900 shadow-soft"
            >
              Knowledge Hub
            </Badge>

            <h1 className="font-heading text-3xl font-extrabold tracking-tight text-text-primary sm:text-5xl lg:text-6xl leading-[1.15]">
              Insights to Help Your{' '}
              <span className="text-brand-900 underline decoration-brand-400 decoration-wavy decoration-from-font underline-offset-8">
                Coaching Institute Grow
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-base sm:text-lg text-text-secondary leading-relaxed">
              Curated guides, admissions benchmarks, and growth playbooks tailored
              for academy owners, counsellors, and marketing heads.
            </p>
          </div>
        </section>

        {/* Visual Placeholder */}
        <section className="border-t border-border-subtle bg-white py-10">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <AssetPlaceholder
              id="placeholder-resources-banner"
              label="Education Resources & Learning Illustration"
              assetNeeded="Illustration showing digital study resources, strategy guides, and knowledge exchange."
              searchKeywords="online education resources books learning illustration SVG"
              format="SVG"
              aspectRatio="wide"
              icon="compass"
            />
          </div>
        </section>

        {/* Category Tabs & Listing */}
        <section className="border-t border-border-subtle bg-background py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full px-4 py-2 text-xs sm:text-sm font-medium transition-all ${
                    selectedCategory === cat
                      ? 'bg-brand-900 text-white shadow-soft'
                      : 'border border-border-subtle bg-white text-text-secondary hover:border-brand-300 hover:text-text-primary'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredArticles.map((article) => (
                <Card
                  key={article.id}
                  className="flex flex-col justify-between border-border-subtle bg-white transition-all hover:border-brand-300 hover:shadow-medium"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-brand-800 bg-brand-50 px-2 py-0.5 rounded">
                        {article.category}
                      </span>
                      <span className="text-[11px] text-text-muted">
                        {article.readTime}
                      </span>
                    </div>

                    <h3 className="font-heading text-base font-bold text-text-primary line-clamp-2 leading-snug">
                      {article.title}
                    </h3>

                    <p className="mt-3 text-xs text-text-secondary line-clamp-3 leading-relaxed">
                      {article.description}
                    </p>
                  </CardContent>

                  <div className="border-t border-border-subtle p-4 bg-neutral-50/50 rounded-b-xl flex items-center justify-between text-xs">
                    <Badge variant="outline" className="border-border-subtle text-[10px]">
                      {article.tag}
                    </Badge>
                    <span className="inline-flex items-center font-semibold text-brand-900 hover:text-brand-700 cursor-pointer">
                      <span>Read Guide</span>
                      <ArrowRight className="ml-1 h-3.5 w-3.5" />
                    </span>
                  </div>
                </Card>
              ))}
            </div>

            {/* Newsletter Subscription Box */}
            <div className="mt-16 rounded-3xl border border-brand-200 bg-gradient-to-br from-brand-900 to-brand-800 p-8 sm:p-12 text-white shadow-strong text-center">
              <div className="mx-auto max-w-2xl">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-700/80 px-3 py-1 text-xs font-semibold text-brand-100 mb-4">
                  <Lightbulb className="h-3.5 w-3.5 text-brand-300" />
                  <span>Weekly Academy Growth Dispatch</span>
                </div>

                <h3 className="font-heading text-2xl sm:text-3xl font-bold">
                  Get Weekly Admissions Strategies in Your Inbox
                </h3>

                <p className="mt-3 text-sm text-brand-100 leading-relaxed">
                  Join 1,000+ coaching directors, founders, and academic leaders.
                  Actionable admission conversion frameworks delivered every Tuesday.
                </p>

                <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-2 max-w-md mx-auto">
                  <Input
                    type="email"
                    placeholder="Enter your institute email"
                    className="bg-white/90 text-text-primary placeholder:text-neutral-500 h-11 text-base focus-visible:ring-brand-400"
                  />
                  <Button className="w-full sm:w-auto bg-brand-400 text-brand-950 hover:bg-brand-300 font-bold h-11 px-6 shrink-0">
                    Subscribe Free
                  </Button>
                </div>
                <p className="mt-2 text-[11px] text-brand-200">
                  No spam. Unsubscribe anytime with one click.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <CTASection
          title="Turn Insights into Admissions"
          description="Put these growth frameworks into practice with the platform built specifically for coaching academies."
          primaryCtaText="Start Free Trial"
          primaryCtaHref="/signup"
          secondaryCtaText="Explore Features"
          secondaryCtaHref="/features"
        />
      </main>

      <PublicFooter />
    </div>
  );
}

