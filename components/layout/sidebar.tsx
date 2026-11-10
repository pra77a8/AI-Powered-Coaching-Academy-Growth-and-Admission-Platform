'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  GraduationCap,
  Sparkles,
  Megaphone,
  BarChart3,
  Award,
  Users2,
  Settings,
  CreditCard,
  Building2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

const navigationGroups: NavGroup[] = [
  {
    label: 'Overview',
    items: [
      { title: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    ],
  },
  {
    label: 'Admissions',
    items: [
      { title: 'Inquiries & CRM', href: '/admissions/crm', icon: Users },
      { title: 'Follow-ups', href: '/admissions/followups', icon: CalendarCheck },
      { title: 'Admissions', href: '/admissions/confirmed', icon: GraduationCap },
    ],
  },
  {
    label: 'Marketing',
    items: [
      { title: 'AI Content Studio', href: '/marketing/ai-studio', icon: Sparkles, badge: 'AI' },
      { title: 'Campaigns', href: '/marketing/campaigns', icon: Megaphone },
    ],
  },
  {
    label: 'Insights',
    items: [
      { title: 'Analytics', href: '/insights/analytics', icon: BarChart3 },
      { title: 'Success & Testimonials', href: '/insights/testimonials', icon: Award },
    ],
  },
  {
    label: 'Workspace',
    items: [
      { title: 'Team & Roles', href: '/settings/team', icon: Users2 },
      { title: 'Subscription & Billing', href: '/settings/billing', icon: CreditCard },
      { title: 'Institute Settings', href: '/settings/institute', icon: Settings },
    ],
  },
];

interface SidebarProps {
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  onItemClick?: () => void;
  instituteName?: string;
}

export function Sidebar({
  collapsed = false,
  onToggleCollapse,
  onItemClick,
  instituteName = 'Coaching Academy',
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        'relative flex flex-col border-r border-border-subtle bg-white transition-all duration-300 ease-in-out h-full select-none',
        collapsed ? 'w-20' : 'w-64'
      )}
    >
      {/* Brand Header */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-border-subtle">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-btn bg-brand-900 text-white shadow-soft">
            <Building2 className="h-5 w-5" />
          </div>
          {!collapsed && (
            <div className="flex flex-col truncate">
              <span className="font-heading font-bold text-sm tracking-tight text-text-primary truncate">
                {instituteName}
              </span>
              <span className="text-[11px] font-medium text-brand-700">
                Growth Platform
              </span>
            </div>
          )}
        </div>

        {onToggleCollapse && (
          <button
            type="button"
            onClick={onToggleCollapse}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className="hidden md:flex h-8 w-8 items-center justify-center rounded-btn border border-border-subtle text-text-secondary hover:bg-surface-muted hover:text-text-primary transition-colors"
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </button>
        )}
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {navigationGroups.map((group) => (
          <div key={group.label} className="space-y-1">
            {!collapsed && (
              <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-text-secondary/70">
                {group.label}
              </p>
            )}
            <div className="space-y-1">
              {group.items.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onItemClick}
                    title={collapsed ? item.title : undefined}
                    className={cn(
                      'group flex items-center gap-3 rounded-btn px-3 py-2 text-sm font-medium transition-colors min-h-[44px]',
                      isActive
                        ? 'bg-brand-50 text-brand-900 font-semibold'
                        : 'text-text-secondary hover:bg-surface-muted hover:text-text-primary'
                    )}
                  >
                    <Icon
                      className={cn(
                        'h-5 w-5 shrink-0 transition-colors',
                        isActive
                          ? 'text-brand-900'
                          : 'text-text-secondary group-hover:text-text-primary'
                      )}
                    />
                    {!collapsed && (
                      <span className="flex-1 truncate">{item.title}</span>
                    )}
                    {!collapsed && item.badge && (
                      <span className="rounded-full bg-brand-100 px-2 py-0.5 text-[10px] font-bold text-brand-900">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer / System Status */}
      <div className="p-3 border-t border-border-subtle bg-background/50">
        {!collapsed ? (
          <div className="flex items-center gap-2 px-2 py-1.5 text-xs text-text-secondary">
            <span className="h-2 w-2 rounded-full bg-semantic-success animate-pulse" />
            <span>Operational · SaaS v1.0</span>
          </div>
        ) : (
          <div className="flex justify-center py-1">
            <span className="h-2 w-2 rounded-full bg-semantic-success" />
          </div>
        )}
      </div>
    </aside>
  );
}

