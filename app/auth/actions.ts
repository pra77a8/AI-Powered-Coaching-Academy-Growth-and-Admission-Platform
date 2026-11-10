'use server';

import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { createClient } from '@/lib/supabase/server';

export type AuthActionResult = {
  error?: string;
  success?: boolean;
  message?: string;
  needsEmailConfirmation?: boolean;
  email?: string;
};

function getOrigin(): string {
  const headersList = headers();
  const host = headersList.get('host') || 'localhost:3000';
  const proto = headersList.get('x-forwarded-proto') || 'http';
  return `${proto}://${host}`;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Server Action: Register new Institute Owner account via Supabase Auth
 */
export async function signUpAction(
  _prevState: AuthActionResult | null,
  formData: FormData
): Promise<AuthActionResult> {
  const fullName = formData.get('fullName')?.toString().trim();
  const email = formData.get('email')?.toString().trim().toLowerCase();
  const password = formData.get('password')?.toString();
  const confirmPassword = formData.get('confirmPassword')?.toString();

  // Server-side validation
  if (!fullName || fullName.length < 2) {
    return { error: 'Please enter your full name (at least 2 characters).' };
  }

  if (!email || !EMAIL_REGEX.test(email)) {
    return { error: 'Please enter a valid email address.' };
  }

  if (!password || password.length < 8) {
    return { error: 'Password must be at least 8 characters long.' };
  }

  if (password !== confirmPassword) {
    return { error: 'Passwords do not match.' };
  }

  const origin = getOrigin();
  const supabase = createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
      emailRedirectTo: `${origin}/auth/callback?next=/dashboard`,
    },
  });

  if (error) {
    return { error: error.message };
  }

  // If user was created but email confirmation is pending
  if (data.user && !data.session) {
    return {
      success: true,
      needsEmailConfirmation: true,
      email,
      message: `Verification link sent to ${email}. Please check your inbox and verify your email to continue.`,
    };
  }

  // If email confirmation is disabled or auto-confirmed, redirect directly
  redirect('/dashboard');
}

/**
 * Server Action: Authenticate user with Email & Password
 */
export async function signInAction(
  _prevState: AuthActionResult | null,
  formData: FormData
): Promise<AuthActionResult> {
  const email = formData.get('email')?.toString().trim().toLowerCase();
  const password = formData.get('password')?.toString();
  const next = formData.get('next')?.toString() || '/dashboard';

  if (!email || !EMAIL_REGEX.test(email)) {
    return { error: 'Please enter a valid email address.' };
  }

  if (!password) {
    return { error: 'Please enter your password.' };
  }

  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    if (error.message.toLowerCase().includes('email not confirmed')) {
      return {
        error:
          'Your email address has not been verified yet. Please check your inbox for the confirmation link before signing in.',
      };
    }
    if (error.message.toLowerCase().includes('invalid login credentials')) {
      return { error: 'Invalid email or password. Please verify your credentials and try again.' };
    }
    return { error: error.message };
  }

  const safeRedirect = next.startsWith('/') && !next.startsWith('//') ? next : '/dashboard';
  redirect(safeRedirect);
}

/**
 * Server Action: Send Password Reset Link to user email
 */
export async function forgotPasswordAction(
  _prevState: AuthActionResult | null,
  formData: FormData
): Promise<AuthActionResult> {
  const email = formData.get('email')?.toString().trim().toLowerCase();

  if (!email || !EMAIL_REGEX.test(email)) {
    return { error: 'Please enter a valid email address.' };
  }

  const origin = getOrigin();
  const supabase = createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?next=/reset-password`,
  });

  // Do not leak whether the email exists in our system (defense against enumeration)
  if (error) {
    // Only return explicit error if it's a rate-limit error
    if (error.status === 429) {
      return { error: 'Too many reset requests. Please wait a few minutes before trying again.' };
    }
  }

  return {
    success: true,
    message:
      'If an account exists with that email address, you will receive password reset instructions shortly.',
  };
}

/**
 * Server Action: Update Password for authenticated user session
 */
export async function updatePasswordAction(
  _prevState: AuthActionResult | null,
  formData: FormData
): Promise<AuthActionResult> {
  const password = formData.get('password')?.toString();
  const confirmPassword = formData.get('confirmPassword')?.toString();

  if (!password || password.length < 8) {
    return { error: 'New password must be at least 8 characters long.' };
  }

  if (password !== confirmPassword) {
    return { error: 'Passwords do not match.' };
  }

  const supabase = createClient();

  const { error } = await supabase.auth.updateUser({
    password,
  });

  if (error) {
    return { error: error.message };
  }

  redirect('/dashboard?message=Password%20updated%20successfully');
}

/**
 * Server Action: Sign Out user and clear session cookies
 */
export async function signOutAction(): Promise<void> {
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect('/login');
}
