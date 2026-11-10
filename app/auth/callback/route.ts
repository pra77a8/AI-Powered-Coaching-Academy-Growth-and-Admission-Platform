import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import type { EmailOtpType } from '@supabase/supabase-js';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const token_hash = requestUrl.searchParams.get('token_hash');
  const type = requestUrl.searchParams.get('type') as EmailOtpType | null;
  const next = requestUrl.searchParams.get('next') || '/dashboard';

  // Sanitize next to prevent open-redirect vulnerabilities
  const safeRedirect =
    next.startsWith('/') && !next.startsWith('//') ? next : '/dashboard';

  const supabase = createClient();

  // Exchange auth code for session (PKCE)
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(new URL(safeRedirect, requestUrl.origin));
    }
  }

  // Handle email OTP verification (token_hash and type)
  if (token_hash && type) {
    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });
    if (!error) {
      return NextResponse.redirect(new URL(safeRedirect, requestUrl.origin));
    }
  }

  // If validation fails, return to login with explicit error parameter
  return NextResponse.redirect(
    new URL('/login?error=Verification%20failed%20or%20link%20has%20expired', requestUrl.origin)
  );
}
