import * as React from 'react';
import type { Metadata } from 'next';
import { AuthShell } from '@/components/auth/auth-shell';
import { LoginForm } from '@/components/auth/login-form';

export const metadata: Metadata = {
  title: 'Sign In · AcademyGrowth',
  description: 'Sign in to your AcademyGrowth coaching institute workspace.',
};

export default function LoginPage() {
  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to manage admissions, campaigns, and student inquiries."
    >
      <React.Suspense
        fallback={
          <div className="flex h-48 w-full items-center justify-center">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-brand-700 border-t-transparent" />
          </div>
        }
      >
        <LoginForm />
      </React.Suspense>
    </AuthShell>
  );
}
