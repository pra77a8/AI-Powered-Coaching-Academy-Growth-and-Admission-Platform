'use client';

import * as React from 'react';
import { Menu, Bell, User } from 'lucide-react';
import { Badge } from '@/lib/../components/ui/badge';

interface TopHeaderProps {
  onMenuToggle?: () => void;
  title?: string;
  instituteName?: string;
  daysRemainingInTrial?: number;
}

export function TopHeader({
  onMenuToggle,
  title = 'Overview',
  daysRemainingInTrial = 14,
}: TopHeaderProps) {
  return (
    <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-border-subtle bg-white/90 backdrop-blur-sm px-4 md:px-6">
      <div className="flex items-center gap-3">
        {/* Mobile Hamburger Trigger (strictly <768px per responsiveness.md) */}
        <button
          type="button"
          onClick={onMenuToggle}
          aria-label="Open mobile navigation"
          className="flex md:hidden h-11 w-11 items-center justify-center rounded-btn border border-border-subtle text-text-primary hover:bg-surface-muted active:scale-95 transition-transform"
        >
          <Menu className="h-6 w-6" />
        </button>

        <div>
          <h1 className="font-heading text-lg md:text-xl font-bold tracking-tight text-text-primary">
            {title}
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-4">
        {/* Trial Status Badge */}
        {daysRemainingInTrial > 0 && (
          <Badge variant="default" className="hidden sm:inline-flex py-1 px-3">
            Trial · {daysRemainingInTrial} Days Left
          </Badge>
        )}

        {/* Notifications Icon */}
        <button
          type="button"
          aria-label="Notifications"
          className="flex h-11 w-11 items-center justify-center rounded-btn border border-border-subtle text-text-secondary hover:bg-surface-muted hover:text-text-primary transition-colors"
        >
          <Bell className="h-5 w-5" />
        </button>

        {/* User Avatar Placeholder */}
        <div className="flex items-center gap-2 border-l border-border-subtle pl-3 md:pl-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-50 border border-brand-100 text-brand-900 font-semibold text-sm">
            <User className="h-5 w-5 text-brand-900" />
          </div>
        </div>
      </div>
    </header>
  );
}
