'use client';

import * as React from 'react';
import { AppShell } from '@/components/layout/app-shell';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, GraduationCap, TrendingUp, IndianRupee, ArrowUpRight, Sparkles } from 'lucide-react';

export default function DashboardPage() {
  return (
    <AppShell pageTitle="Executive Dashboard" instituteName="Apex Coaching Academy">
      <div className="space-y-6">
        {/* Welcome / Context Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-card bg-brand-50 border border-brand-100">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="font-heading text-lg md:text-xl font-bold text-brand-900">
                Welcome back, Director Rajan
              </h2>
              <Badge variant="primary" className="text-[10px]">
                Active Trial
              </Badge>
            </div>
            <p className="text-xs md:text-sm text-brand-800">
              Your institute workspace foundation is ready. Active batch enrollment is in progress.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="default" className="gap-1.5 shadow-sm">
              <Sparkles className="h-4 w-4" /> Quick Action
            </Button>
          </div>
        </div>

        {/* Foundation Metric Cards Preview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {/* Metric 1 */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <span className="text-xs font-medium text-text-secondary uppercase tracking-wider">
                Total Inquiries (MTD)
              </span>
              <div className="h-8 w-8 rounded-btn bg-brand-50 flex items-center justify-center text-brand-900">
                <Users className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-heading text-text-primary">142</div>
              <p className="text-xs text-semantic-success flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3" /> +18% from last month
              </p>
            </CardContent>
          </Card>

          {/* Metric 2 */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <span className="text-xs font-medium text-text-secondary uppercase tracking-wider">
                Confirmed Admissions
              </span>
              <div className="h-8 w-8 rounded-btn bg-brand-50 flex items-center justify-center text-brand-900">
                <GraduationCap className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-heading text-text-primary">28</div>
              <p className="text-xs text-semantic-success flex items-center gap-1 mt-1">
                <ArrowUpRight className="h-3 w-3" /> 19.7% Conversion Rate
              </p>
            </CardContent>
          </Card>

          {/* Metric 3 */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <span className="text-xs font-medium text-text-secondary uppercase tracking-wider">
                Follow-ups Due Today
              </span>
              <div className="h-8 w-8 rounded-btn bg-amber-50 flex items-center justify-center text-semantic-warning">
                <TrendingUp className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-heading text-text-primary">14</div>
              <p className="text-xs text-semantic-warning mt-1">
                4 Overdue inquiries require action
              </p>
            </CardContent>
          </Card>

          {/* Metric 4 */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <span className="text-xs font-medium text-text-secondary uppercase tracking-wider">
                Cost Per Admission
              </span>
              <div className="h-8 w-8 rounded-btn bg-emerald-50 flex items-center justify-center text-semantic-success">
                <IndianRupee className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-heading text-text-primary">₹1,420</div>
              <p className="text-xs text-text-secondary mt-1">
                Across Meta and School Seminars
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Foundation Layout Demonstration */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Platform Foundation Ready</CardTitle>
              <CardDescription>
                Design tokens, layout system, and responsive shell foundations (TSK-FND-001) verified.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-btn border border-border-subtle bg-surface-muted/50 space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-text-primary">
                  <span>Supabase Architecture Setup</span>
                  <Badge variant="success">Target: TSK-FND-002</Badge>
                </div>
                <p className="text-xs text-text-secondary">
                  Supabase Project URL configured: <code className="text-brand-900 font-mono">https://ktneowmlhwdkixriyjnb.supabase.co</code>
                </p>
              </div>

              <div className="p-4 rounded-btn border border-border-subtle bg-surface-muted/50 space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-text-primary">
                  <span>Mobile Responsiveness & Touch Targets</span>
                  <Badge variant="success">Verified (responsiveness.md)</Badge>
                </div>
                <p className="text-xs text-text-secondary">
                  Touch targets enforce &ge; 44px minimums; inputs enforce &ge; 16px font size; navigation collapses to a slide-over drawer below 768px.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Palette Verification</CardTitle>
              <CardDescription>Approved Direction A visual tokens</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-2 rounded-btn bg-[#0B4F49] text-white text-xs font-medium">
                <span>Primary Brand (#0B4F49)</span>
                <span>brand-900</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-btn bg-[#18796D] text-white text-xs font-medium">
                <span>Accent Teal (#18796D)</span>
                <span>brand-700</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-btn bg-[#EFF7F4] text-[#0B4F49] border border-[#DCEFEA] text-xs font-medium">
                <span>Soft Brand (#EFF7F4)</span>
                <span>brand-50</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-btn bg-[#F7F8F6] text-[#172522] border border-[#E2E8E5] text-xs font-medium">
                <span>App Background (#F7F8F6)</span>
                <span>background</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
