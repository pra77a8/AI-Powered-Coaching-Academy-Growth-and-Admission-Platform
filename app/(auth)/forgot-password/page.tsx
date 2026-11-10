import * as React from 'react';
import type { Metadata } from 'next';
import { AuthShell } from '@/components/auth/auth-shell';
import { ForgotPasswordForm } from '@/components/auth/forgot-password-form';

export const metadata: Metadata = {
  title: 'Reset Password · AcademyGrowth',
  description: 'Request a password reset link for your AcademyGrowth workspace.',
};

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      title="Reset your password"
      subtitle="Enter your registered work email and we'll send you recovery instructions."
    >
      <ForgotPasswordForm />
    </AuthShell>
  );
}
