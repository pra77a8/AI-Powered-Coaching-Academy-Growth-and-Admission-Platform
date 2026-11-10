import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import type { Database } from '@/types/database';

export type CookieToSet = {
  name: string;
  value: string;
  options: CookieOptions;
};

/**
 * Refreshes the user's Supabase auth session on incoming requests and propagates updated cookies.
 * Adheres to the official @supabase/ssr Next.js middleware pattern with getAll / setAll.
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // If environment configuration is missing, allow request to proceed without throwing
  if (!supabaseUrl || !supabaseKey) {
    return supabaseResponse;
  }

  const supabase = createServerClient<Database>(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet: CookieToSet[]) {
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value);
        });
        supabaseResponse = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) => {
          supabaseResponse.cookies.set(name, value, options);
        });
      },
    },
  });

  // IMPORTANT: Do not run code between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.
  // Using getUser() ensures token validation with Supabase Auth backend.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  // Protected application routes
  const isProtectedRoute =
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/settings') ||
    pathname.startsWith('/admissions') ||
    pathname.startsWith('/marketing') ||
    pathname.startsWith('/insights') ||
    pathname.startsWith('/onboarding') ||
    pathname === '/reset-password';

  // Auth routes (redirect already authenticated users to dashboard)
  const isAuthRoute =
    pathname === '/login' ||
    pathname === '/signup';

  if (!user && isProtectedRoute) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('next', pathname);
    const redirectResponse = NextResponse.redirect(loginUrl);
    supabaseResponse.cookies.getAll().forEach((cookie) => {
      redirectResponse.cookies.set(cookie.name, cookie.value, cookie);
    });
    return redirectResponse;
  }

  if (user && isAuthRoute) {
    const redirectResponse = NextResponse.redirect(new URL('/dashboard', request.url));
    supabaseResponse.cookies.getAll().forEach((cookie) => {
      redirectResponse.cookies.set(cookie.name, cookie.value, cookie);
    });
    return redirectResponse;
  }

  // IMPORTANT: Return the supabaseResponse object as it contains the updated cookies.
  return supabaseResponse;
}
