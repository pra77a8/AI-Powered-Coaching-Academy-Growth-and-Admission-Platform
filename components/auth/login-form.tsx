'use client';

import * as React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Eye, EyeOff, Loader2, AlertCircle, CheckCircle2, Lock, Mail } from 'lucide-react';
import { signInAction, type AuthActionResult } from '@/app/auth/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function LoginForm() {
  const searchParams = useSearchParams();
  const next = searchParams.get('next') || '/dashboard';
  const queryMessage = searchParams.get('message');

  const [isPending, startTransition] = React.useTransition();
  const [showPassword, setShowPassword] = React.useState(false);
  const [formState, setFormState] = React.useState<AuthActionResult | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormState(null);

    const formData = new FormData(event.currentTarget);
    formData.set('next', next);

    startTransition(async () => {
      const result = await signInAction(null, formData);
      if (result) {
        setFormState(result);
      }
    });
  };

  return (
    <div className="w-full space-y-6">
      {/* Informational Message from Query Param (e.g. after password reset) */}
      {queryMessage && !formState?.error && (
        <div
          role="status"
          className="flex items-start gap-3 rounded-lg border border-brand-200 bg-brand-50 p-4 text-xs font-medium text-brand-900"
        >
          <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-700 mt-0.5" />
          <span>{queryMessage}</span>
        </div>
      )}

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
        {/* Email Field */}
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

        {/* Password Field */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-text-primary"
            >
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-xs font-semibold text-brand-700 hover:text-brand-800 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              required
              placeholder="••••••••"
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
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isPending}
          className="w-full mt-2 font-semibold min-h-[46px]"
          variant="primary"
        >
          {isPending ? (
            <span className="inline-flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Signing in...</span>
            </span>
          ) : (
            'Sign In'
          )}
        </Button>
      </form>

      {/* Footer Navigation */}
      <div className="border-t border-border-subtle pt-6 text-center text-xs text-text-secondary">
        Don&apos;t have an academy account?{' '}
        <Link
          href="/signup"
          className="font-semibold text-brand-700 hover:text-brand-800 hover:underline"
        >
          Create Academy Workspace
        </Link>
      </div>
    </div>
  );
}
