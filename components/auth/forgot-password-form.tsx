'use client';

import * as React from 'react';
import Link from 'next/link';
import { Mail, Loader2, AlertCircle, CheckCircle2, ArrowLeft } from 'lucide-react';
import { forgotPasswordAction, type AuthActionResult } from '@/app/auth/actions';
import { Button } from '@/components/ui/button';

export function ForgotPasswordForm() {
  const [isPending, startTransition] = React.useTransition();
  const [formState, setFormState] = React.useState<AuthActionResult | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormState(null);

    const formData = new FormData(event.currentTarget);

    startTransition(async () => {
      const result = await forgotPasswordAction(null, formData);
      if (result) {
        setFormState(result);
      }
    });
  };

  if (formState?.success) {
    return (
      <div className="w-full space-y-6 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 border border-brand-200 text-brand-700 shadow-soft">
          <CheckCircle2 className="h-7 w-7 text-brand-700" />
        </div>

        <div className="space-y-2">
          <h3 className="font-heading text-xl font-bold tracking-tight text-text-primary">
            Reset Link Sent
          </h3>
          <p className="text-sm text-text-secondary leading-relaxed">
            {formState.message ||
              'If an account exists with that email address, you will receive password reset instructions shortly.'}
          </p>
        </div>

        <div className="rounded-xl border border-border-subtle bg-surface-muted/50 p-4 text-xs text-text-secondary text-left space-y-1.5">
          <p className="font-semibold text-text-primary">Didn&apos;t get the email?</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Check your spam or junk folder.</li>
            <li>Ensure you typed the exact work email registered with AcademyGrowth.</li>
            <li>Wait a couple minutes before submitting another request.</li>
          </ul>
        </div>

        <div className="pt-2">
          <Link href="/login" className="w-full">
            <Button variant="outline" className="w-full">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Return to Sign In
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* Error Alert */}
      {formState?.error && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-xs font-medium text-red-900"
        >
          <AlertCircle className="h-4 w-4 shrink-0 text-red-600 mt-0.5" />
          <div className="flex-1">{formState.error}</div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-text-primary mb-1.5"
          >
            Registered Work Email
          </label>
          <div className="relative">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="director@apexacademy.edu"
              disabled={isPending}
              className="flex w-full rounded-btn border border-border-subtle bg-white pl-10 pr-3.5 py-2.5 text-base md:text-sm text-text-primary shadow-sm transition-colors placeholder:text-text-secondary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:border-brand-700 disabled:cursor-not-allowed disabled:opacity-50 min-h-[44px]"
            />
            <Mail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
          </div>
          <p className="text-xs text-text-secondary mt-1.5">
            We will send a secure password reset link to this address.
          </p>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={isPending}
          className="w-full mt-2 font-semibold min-h-[46px]"
          variant="primary"
        >
          {isPending ? (
            <span className="inline-flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Sending reset link...</span>
            </span>
          ) : (
            'Send Reset Link'
          )}
        </Button>
      </form>

      {/* Footer Navigation */}
      <div className="border-t border-border-subtle pt-6 text-center text-xs text-text-secondary">
        Remembered your password?{' '}
        <Link
          href="/login"
          className="font-semibold text-brand-700 hover:text-brand-800 hover:underline"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}
