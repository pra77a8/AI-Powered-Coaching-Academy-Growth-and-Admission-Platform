import Link from 'next/link';
import {
  Building2,
  Users,
  Sparkles,
  BarChart3,
  Award,
  ArrowRight,
  CheckCircle2,
  PhoneCall,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-text-primary">
      {/* Public Header */}
      <header className="sticky top-0 z-30 flex h-16 md:h-20 w-full items-center justify-between border-b border-border-subtle bg-white/90 backdrop-blur-md px-4 md:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-btn bg-brand-900 text-white shadow-soft">
            <Building2 className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-heading text-lg font-bold tracking-tight text-text-primary leading-tight">
              AcademyGrowth
            </span>
            <span className="text-[11px] font-medium text-brand-700">
              Coaching Platform
            </span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-text-secondary">
          <a href="#features" className="hover:text-brand-900 transition-colors">
            Features
          </a>
          <a href="#architecture" className="hover:text-brand-900 transition-colors">
            Architecture
          </a>
          <a href="#pricing" className="hover:text-brand-900 transition-colors">
            Pricing
          </a>
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <Link href="/login">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
              Sign in
            </Button>
          </Link>
          <Link href="/signup">
            <Button variant="default" size="sm">
              Start Free Trial
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 pt-12 pb-16 md:pt-20 md:pb-24 lg:pt-28">
        <div className="mx-auto max-w-5xl text-center space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 border border-brand-100 px-3.5 py-1 text-xs font-semibold text-brand-900 shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-brand-700" />
            <span>AI-Powered Operating System for Test-Prep Academies</span>
          </div>

          <h1 className="font-heading text-3xl font-extrabold tracking-tight text-text-primary sm:text-5xl lg:text-6xl text-balance leading-tight">
            Turn more prospective inquiries into{' '}
            <span className="text-brand-700 underline decoration-brand-100 underline-offset-8">
              confirmed admissions.
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-base text-text-secondary md:text-lg leading-relaxed text-balance">
            The growth and admissions operating system engineered for JEE, NEET, CET, and UPSC coaching academies. Eliminate inquiry leakage, create exam marketing in seconds, and measure cost per admission.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <Link href="/signup" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto gap-2 text-base font-semibold shadow-elevation">
                Start 14-Day Free Trial <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-base">
                View Workspace Shell
              </Button>
            </Link>
          </div>

          {/* Quick trust metrics */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-text-secondary">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-semantic-success" />
              No credit card required
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-semantic-success" />
              14-day fully featured trial
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-semantic-success" />
              Strict multi-tenant data isolation
            </span>
          </div>
        </div>
      </section>

      {/* Visual Design Tokens & Foundation Preview */}
      <section id="features" className="border-t border-border-subtle bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <Badge variant="default" className="text-xs uppercase tracking-wider font-semibold">
              Design Foundations & Architecture
            </Badge>
            <h2 className="font-heading text-2xl md:text-3xl font-bold tracking-tight text-text-primary">
              Engineered for Coaching Academy Operations
            </h2>
            <p className="text-sm md:text-base text-text-secondary">
              Built using Next.js App Router, Supabase, and verified design tokens from UI.md.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1: CRM */}
            <Card>
              <CardHeader>
                <div className="flex h-11 w-11 items-center justify-center rounded-btn bg-brand-50 text-brand-900 border border-brand-100 mb-2">
                  <Users className="h-5 w-5" />
                </div>
                <CardTitle>Smart Admission CRM</CardTitle>
                <CardDescription>
                  Capture walk-ins, calls, and public web inquiries into an 8-stage Kanban pipeline.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-xs text-text-secondary">
                  <div className="flex items-center justify-between p-2 rounded-btn bg-surface-muted">
                    <span>New Leads Today</span>
                    <span className="font-bold text-brand-900">18 Inquiries</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-btn bg-surface-muted">
                    <span>Demo Scheduled</span>
                    <span className="font-bold text-semantic-info">8 Students</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Card 2: AI Studio */}
            <Card>
              <CardHeader>
                <div className="flex h-11 w-11 items-center justify-center rounded-btn bg-brand-50 text-brand-900 border border-brand-100 mb-2">
                  <Sparkles className="h-5 w-5" />
                </div>
                <CardTitle>AI Marketing Studio</CardTitle>
                <CardDescription>
                  Generate exam-specific reels scripts, WhatsApp copy, and repurpose raw syllabus notes.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-xs text-text-secondary">
                  <div className="flex items-center justify-between p-2 rounded-btn bg-surface-muted">
                    <span>Target Exams</span>
                    <span className="font-bold text-brand-900">JEE · NEET · UPSC</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-btn bg-surface-muted">
                    <span>Generation Speed</span>
                    <span className="font-bold text-semantic-success">&lt; 3 Seconds</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Card 3: Marketing Analytics */}
            <Card>
              <CardHeader>
                <div className="flex h-11 w-11 items-center justify-center rounded-btn bg-brand-50 text-brand-900 border border-brand-100 mb-2">
                  <BarChart3 className="h-5 w-5" />
                </div>
                <CardTitle>Marketing Attribution</CardTitle>
                <CardDescription>
                  Connect ad spend on Meta and hoardings directly to confirmed student enrollments.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-xs text-text-secondary">
                  <div className="flex items-center justify-between p-2 rounded-btn bg-surface-muted">
                    <span>Avg. Cost Per Inquiry</span>
                    <span className="font-bold text-brand-900">₹145</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-btn bg-surface-muted">
                    <span>Cost Per Admission</span>
                    <span className="font-bold text-semantic-success">₹1,450</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Card 4: Student Success */}
            <Card>
              <CardHeader>
                <div className="flex h-11 w-11 items-center justify-center rounded-btn bg-brand-50 text-brand-900 border border-brand-100 mb-2">
                  <Award className="h-5 w-5" />
                </div>
                <CardTitle>Student Success Vault</CardTitle>
                <CardDescription>
                  Record verified rank scores, mark sheets, and parent consent to amplify authentic proof.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-xs text-text-secondary">
                  <div className="flex items-center justify-between p-2 rounded-btn bg-surface-muted">
                    <span>Consent Governance</span>
                    <span className="font-bold text-semantic-success">Verified</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-btn bg-surface-muted">
                    <span>Victory Announcement</span>
                    <span className="font-bold text-brand-900">AI Assisted</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Public Footer */}
      <footer className="mt-auto border-t border-border-subtle bg-surface-muted/60 py-12 px-4 md:px-8 text-xs text-text-secondary">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-brand-900 text-white">
              <Building2 className="h-4 w-4" />
            </div>
            <span className="font-heading font-bold text-text-primary text-sm">
              AcademyGrowth Platform
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link href="/pricing" className="hover:text-brand-900 transition-colors">
              Pricing Plans
            </Link>
            <Link href="/privacy" className="hover:text-brand-900 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-brand-900 transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/refund-policy" className="hover:text-brand-900 transition-colors">
              Refund Policy
            </Link>
            <Link href="/contact" className="hover:text-brand-900 transition-colors">
              Contact Us
            </Link>
          </div>

          <p>© 2026 AcademyGrowth. Multi-tenant B2B SaaS for Coaching Academies.</p>
        </div>
      </footer>
    </div>
  );
}
