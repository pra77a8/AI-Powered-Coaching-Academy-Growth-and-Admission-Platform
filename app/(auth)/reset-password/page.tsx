import * as React from 'react';
import type { Metadata } from 'next';
import { AuthShell } from '@/components/auth/auth-shell';
import { ResetPasswordForm } from '@/components/auth/reset-password-form';

export const metadata: Metadata = {
  title: 'Set New Password · AcademyGrowth',
  description: 'Set a new secure password for your AcademyGrowth account.',
};

export default function ResetPasswordPage() {
  return (
    <AuthShell
      title="Set new password"
      subtitle="Choose a strong, unique password with at least 8 characters."
    >
      <ResetPasswordForm />
    </AuthShell>
  );
}
