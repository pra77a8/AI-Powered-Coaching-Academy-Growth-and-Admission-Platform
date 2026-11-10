import { createClient } from './server';
import type { UserRole, MembershipStatus } from '@/types/database';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  phone: string | null;
}

export interface InstituteContext {
  id: string;
  name: string;
  slug: string;
  role: UserRole;
  status: MembershipStatus;
  planTier: string;
}

/**
 * Retrieves the currently authenticated Supabase Auth user securely from server context.
 */
export async function getCurrentUser() {
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  return user;
}

/**
 * Retrieves the profile metadata for the authenticated user from the public.users table.
 */
export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const supabase = createClient();
  const { data, error } = await (supabase
    .from('users') as any)
    .select('id, email, full_name, phone')
    .eq('id', userId)
    .single();

  if (error || !data) {
    return null;
  }

  return {
    id: data.id,
    email: data.email,
    fullName: data.full_name,
    phone: data.phone,
  };
}

/**
 * Retrieves the active institute membership and tenant context for the user.
 */
export async function getActiveInstituteContext(
  userId: string
): Promise<InstituteContext | null> {
  const supabase = createClient();

  const { data, error } = await (supabase
    .from('institute_memberships') as any)
    .select(`
      role,
      status,
      institutes (
        id,
        name,
        slug
      )
    `)
    .eq('user_id', userId)
    .eq('status', 'ACTIVE')
    .limit(1)
    .single();

  if (error || !data || !data.institutes) {
    return null;
  }

  // Type narrowing for joined institutes record
  const institute = data.institutes as unknown as {
    id: string;
    name: string;
    slug: string;
  };

  return {
    id: institute.id,
    name: institute.name,
    slug: institute.slug,
    role: data.role as UserRole,
    status: data.status as MembershipStatus,
    planTier: 'STARTER', // Default or queried from subscriptions
  };
}

