'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Eye,
  EyeOff,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Lock,
  Mail,
  User,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';
import { signUpAction, type AuthActionResult } from '@/app/auth/actions';
import { Button } from '@/components/ui/button';

export function SignUpForm() {
  const [isPending, startTransition] = React.useTransition();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const [passwordValue, setPasswordValue] = React.useState('');
  const [confirmPasswordValue, setConfirmPasswordValue] = React.useState('');
  const [clientError, setClientError] = React.useState<string | null>(null);
  const [formState, setFormState] = React.useState<AuthActionResult | null>(null);

  // Client validation
  const passwordsMatch =
    confirmPasswordValue.length > 0 ? passwordValue === confirmPasswordValue : true;
  const isLengthValid = passwordValue.length >= 8;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setClientError(null);
    setFormState(null);

    const formData = new FormData(event.currentTarget);
    const password = formData.get('password')?.toString() || '';
    const confirmPassword = formData.get('confirmPassword')?.toString() || '';

    if (password.length < 8) {
      setClientError('Password must be at least 8 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setClientError('Passwords do not match.');
      return;
    }

    startTransition(async () => {
      const result = await signUpAction(null, formData);
      if (result) {
        setFormState(result);
      }
    });
  };

  // If email confirmation is required, show the confirmation screen
  if (formState?.needsEmailConfirmation) {
    return (
      <div className="w-full space-y-6 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50 border border-brand-200 text-brand-700 shadow-soft">
          <Mail className="h-8 w-8 text-brand-700 animate-pulse" />
        </div>

        <div className="space-y-2">
          <h3 className="font-heading text-xl font-bold tracking-tight text-text-primary">
            Check your inbox
          </h3>
          <p className="text-sm text-text-secondary leading-relaxed">
            We sent a verification link to{' '}
            <span className="font-semibold text-text-primary">
              {formState.email}
            </span>
            . Please click the link to activate your academy workspace.
          </p>
        </div>

        <div className="rounded-xl border border-border-subtle bg-surface-muted/50 p-4 text-xs text-text-secondary text-left space-y-2">
          <div className="flex items-center gap-2 font-semibold text-text-primary">
            <ShieldCheck className="h-4 w-4 text-brand-700" />
            <span>Next Steps</span>
          </div>
          <p>
            1. Open the email from <strong>AcademyGrowth</strong>.
          </p>
          <p>
            2. Click the verification link to confirm ownership.
          </p>
          <p>
            3. You will be redirected straight to your new dashboard.
          </p>
        </div>

        <div className="pt-2">
          <Link href="/login" className="w-full">
            <Button variant="outline" className="w-full">
              Back to Sign In
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const activeError = clientError || formState?.error;

  return (
    <div className="w-full space-y-6">
      {/* Error Alert */}
      {activeError && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-xs font-medium text-red-900"
        >
          <AlertCircle className="h-4 w-4 shrink-0 text-red-600 mt-0.5" />
          <div className="flex-1">{activeError}</div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div>
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-text-primary mb-1.5"
          >
            Full Name
          </label>
          <div className="relative">
            <input
              id="fullName"
              name="fullName"
              type="text"
              autoComplete="name"
              required
              placeholder="Dr. Rajesh Sharma"
              disabled={isPending}
              className="flex w-full rounded-btn border border-border-subtle bg-white pl-10 pr-3.5 py-2.5 text-base md:text-sm text-text-primary shadow-sm transition-colors placeholder:text-text-secondary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:border-brand-700 disabled:cursor-not-allowed disabled:opacity-50 min-h-[44px]"
            />
            <User className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
          </div>
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-text-primary mb-1.5"
          >
            Work Email
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
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-text-primary mb-1.5"
          >
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              required
              value={passwordValue}
              onChange={(e) => setPasswordValue(e.target.value)}
              placeholder="At least 8 characters"
              disabled={isPending}
              className="flex w-full rounded-btn border border-border-subtle bg-white pl-10 pr-11 py-2.5 text-base md:text-sm text-text-primary shadow-sm transition-colors placeholder:text-text-secondary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:border-brand-700 disabled:cursor-not-allowed disabled:opacity-50 min-h-[44px]"
            />
            <Lock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="absolute right-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-btn text-text-secondary hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {passwordValue.length > 0 && (
            <p
              className={`text-xs mt-1.5 flex items-center gap-1 ${
                isLengthValid ? 'text-semantic-success' : 'text-text-secondary'
              }`}
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Minimum 8 characters</span>
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-text-primary mb-1.5"
          >
            Confirm Password
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              autoComplete="new-password"
              required
              value={confirmPasswordValue}
              onChange={(e) => setConfirmPasswordValue(e.target.value)}
              placeholder="Re-enter password"
              disabled={isPending}
              className="flex w-full rounded-btn border border-border-subtle bg-white pl-10 pr-11 py-2.5 text-base md:text-sm text-text-primary shadow-sm transition-colors placeholder:text-text-secondary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:border-brand-700 disabled:cursor-not-allowed disabled:opacity-50 min-h-[44px]"
            />
            <Lock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
              className="absolute right-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-btn text-text-secondary hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {confirmPasswordValue.length > 0 && !passwordsMatch && (
            <p className="text-xs text-semantic-danger mt-1.5">
              Passwords do not match
            </p>
          )}
        </div>

        {/* Terms note */}
        <p className="text-[11px] text-text-secondary leading-normal pt-1">
          By signing up, you agree to our Terms of Service and Privacy Policy.
          Your workspace includes 14 days of Pro access.
        </p>

        {/* Submit */}
        <Button
          type="submit"
          disabled={isPending || !passwordsMatch}
          className="w-full mt-2 font-semibold min-h-[46px]"
          variant="primary"
        >
          {isPending ? (
            <span className="inline-flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Creating your workspace...</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-2">
              <span>Create Academy Workspace</span>
              <ArrowRight className="h-4 w-4" />
            </span>
          )}
        </Button>
      </form>

      {/* Footer Navigation */}
      <div className="border-t border-border-subtle pt-6 text-center text-xs text-text-secondary">
        Already have an account?{' '}
        <Link
          href="/login"
          className="font-semibold text-brand-700 hover:text-brand-800 hover:underline"
        >
          Sign in to your workspace
        </Link>
      </div>
    </div>
  );
}
