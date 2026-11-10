import * as React from 'react';
import type { Metadata } from 'next';
import { AuthShell } from '@/components/auth/auth-shell';
import { SignUpForm } from '@/components/auth/signup-form';

export const metadata: Metadata = {
  title: 'Create Academy Workspace · AcademyGrowth',
  description: 'Register as an institute owner and start your 14-day free trial on AcademyGrowth.',
};

export default function SignUpPage() {
  return (
    <AuthShell
      title="Create Academy Workspace"
      subtitle="Register as an institute owner and scale your coaching admissions."
    >
      <SignUpForm />
    </AuthShell>
  );
}
