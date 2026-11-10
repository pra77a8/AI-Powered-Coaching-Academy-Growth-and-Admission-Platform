import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import type { Database } from '@/types/database';

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    '';

  const supabase = createServerClient<Database>(supabaseUrl, supabaseKey, {
    cookies: {
      get(name: string) {
        return request.cookies.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        request.cookies.set({
          name,
          value,
          ...options,
        });
        response = NextResponse.next({
          request: {
            headers: request.headers,
          },
        });
        response.cookies.set({
          name,
          value,
          ...options,
        });
      },
      remove(name: string, options: CookieOptions) {
        request.cookies.set({
          name,
          value: '',
          ...options,
        });
        response = NextResponse.next({
          request: {
            headers: request.headers,
          },
        });
        response.cookies.set({
          name,
          value: '',
          ...options,
        });
      },
    },
  });

  // Refresh auth token by reading user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // Protected paths that require authenticated session
  const protectedPrefixes = [
    '/dashboard',
    '/admissions',
    '/marketing',
    '/insights',
    '/settings',
  ];

  const isProtectedPath = protectedPrefixes.some((prefix) =>
    pathname.startsWith(prefix)
  );

  // Auth pages (login, signup, forgot-password)
  const isAuthPage =
    pathname === '/login' ||
    pathname === '/signup' ||
    pathname === '/forgot-password';

  // If user is accessing protected path without session, redirect to login
  // Note: For initial preview when database is not yet hooked to live credentials,
  // we only redirect if in live production environment with real keys
  if (isProtectedPath && !user && process.env.NODE_ENV === 'production' && !pathname.includes('preview')) {
    // Only enforce redirect if configured
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('returnUrl', pathname);
    return NextResponse.redirect(url);
  }

  // If user is already logged in and navigates to login/signup, redirect to dashboard
  if (isAuthPage && user) {
    const url = request.nextUrl.clone();
    url.pathname = '/dashboard';
    return NextResponse.redirect(url);
  }

  return response;
}

