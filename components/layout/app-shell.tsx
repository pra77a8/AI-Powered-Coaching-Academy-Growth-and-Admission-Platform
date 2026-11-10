'use client';

import * as React from 'react';
import { X } from 'lucide-react';
import { Sidebar } from './sidebar';
import { TopHeader } from './top-header';

interface AppShellProps {
  children: React.ReactNode;
  pageTitle?: string;
  instituteName?: string;
}

export function AppShell({
  children,
  pageTitle = 'Dashboard',
  instituteName = 'Apex Coaching Academy',
}: AppShellProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  // Close mobile drawer on resize beyond 768px
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent background scroll when mobile menu is open
  React.useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <div className="flex min-h-screen bg-background text-text-primary">
      {/* Desktop Persistent Sidebar (visible >= 768px) */}
      <div className="hidden md:block shrink-0">
        <div className="sticky top-0 h-screen">
          <Sidebar
            collapsed={isSidebarCollapsed}
            onToggleCollapse={() => setIsSidebarCollapsed((prev) => !prev)}
            instituteName={instituteName}
          />
        </div>
      </div>

      {/* Mobile Slide-Over Drawer Navigation (< 768px per responsiveness.md) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-brand-950/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer content */}
          <div className="relative flex w-full max-w-xs flex-1 flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out">
            {/* Close button (44x44px touch target) */}
            <div className="absolute right-2 top-2 z-10">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close navigation"
                className="flex h-11 w-11 items-center justify-center rounded-btn bg-surface-muted text-text-primary hover:bg-border-subtle"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <Sidebar
              collapsed={false}
              onItemClick={() => setIsMobileMenuOpen(false)}
              instituteName={instituteName}
            />
          </div>
        </div>
      )}

      {/* Main Content Viewport */}
      <div className="flex flex-1 flex-col min-w-0 overflow-x-hidden">
        <TopHeader
          title={pageTitle}
          onMenuToggle={() => setIsMobileMenuOpen(true)}
          instituteName={instituteName}
        />
        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

