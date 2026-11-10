import { createBrowserClient } from '@supabase/ssr';
import type { Database } from '@/types/database';

let browserClient: ReturnType<typeof createBrowserClient<Database>> | null = null;

/**
 * Creates or retrieves a reusable browser-side Supabase client for React Client Components.
 * Reads public configuration from process.env.
 * Throws a clear development error if required public environment variables are missing.
 */
export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      'Missing Supabase public environment variables. Please ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY are defined in your environment (.env.local).'
    );
  }

  // Reuse browser client singleton in browser environment
  if (typeof window !== 'undefined') {
    if (!browserClient) {
      browserClient = createBrowserClient<Database>(supabaseUrl, supabaseKey);
    }
    return browserClient;
  }

  return createBrowserClient<Database>(supabaseUrl, supabaseKey);
}
