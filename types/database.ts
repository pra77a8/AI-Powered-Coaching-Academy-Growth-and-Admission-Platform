export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type UserRole =
  | 'OWNER'
  | 'ADMIN'
  | 'COUNSELLOR'
  | 'MARKETER'
  | 'FACULTY';

export type MembershipStatus = 'ACTIVE' | 'INVITED' | 'SUSPENDED';

export type InvitationStatus = 'PENDING' | 'ACCEPTED' | 'EXPIRED' | 'REVOKED';

export type ExamCategory =
  | 'JEE'
  | 'NEET'
  | 'MHT_CET'
  | 'UPSC'
  | 'FOUNDATION'
  | 'OTHER';

export type SubscriptionPlanTier = 'STARTER' | 'GROWTH' | 'PROFESSIONAL';

export type SubscriptionStatus =
  | 'TRIAL'
  | 'ACTIVE'
  | 'PAST_DUE'
  | 'RESTRICTED'
  | 'CANCELLED';

export interface Database {
  public: {
    Tables: {
      institutes: {
        Row: {
          id: string;
          parent_institute_id: string | null;
          name: string;
          slug: string;
          phone: string;
          city: string;
          state: string;
          logo_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          parent_institute_id?: string | null;
          name: string;
          slug: string;
          phone: string;
          city: string;
          state: string;
          logo_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          parent_institute_id?: string | null;
          name?: string;
          slug?: string;
          phone?: string;
          city?: string;
          state?: string;
          logo_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      users: {
        Row: {
          id: string;
          email: string;
          full_name: string;
          phone: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name: string;
          phone?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string;
          phone?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      institute_memberships: {
        Row: {
          id: string;
          institute_id: string;
          user_id: string;
          role: UserRole;
          status: MembershipStatus;
          is_default: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          institute_id: string;
          user_id: string;
          role: UserRole;
          status?: MembershipStatus;
          is_default?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          institute_id?: string;
          user_id?: string;
          role?: UserRole;
          status?: MembershipStatus;
          is_default?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      institute_invitations: {
        Row: {
          id: string;
          institute_id: string;
          invited_by: string;
          email: string;
          role: UserRole;
          token: string;
          status: InvitationStatus;
          expires_at: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          institute_id: string;
          invited_by: string;
          email: string;
          role: UserRole;
          token: string;
          status?: InvitationStatus;
          expires_at?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          institute_id?: string;
          invited_by?: string;
          email?: string;
          role?: UserRole;
          token?: string;
          status?: InvitationStatus;
          expires_at?: string;
          created_at?: string;
        };
      };
      courses: {
        Row: {
          id: string;
          institute_id: string;
          name: string;
          exam_category: ExamCategory;
          base_fee: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          institute_id: string;
          name: string;
          exam_category: ExamCategory;
          base_fee?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          institute_id?: string;
          name?: string;
          exam_category?: ExamCategory;
          base_fee?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      subscriptions: {
        Row: {
          id: string;
          institute_id: string;
          plan_tier: SubscriptionPlanTier;
          razorpay_subscription_id: string | null;
          status: SubscriptionStatus;
          current_period_start: string;
          current_period_end: string;
          grace_until: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          institute_id: string;
          plan_tier?: SubscriptionPlanTier;
          razorpay_subscription_id?: string | null;
          status?: SubscriptionStatus;
          current_period_start?: string;
          current_period_end?: string;
          grace_until?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          institute_id?: string;
          plan_tier?: SubscriptionPlanTier;
          razorpay_subscription_id?: string | null;
          status?: SubscriptionStatus;
          current_period_start?: string;
          current_period_end?: string;
          grace_until?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: {
      create_institute_with_owner: {
        Args: {
          p_name: string;
          p_slug: string;
          p_phone: string;
          p_city: string;
          p_state: string;
          p_logo_url?: string;
          p_default_course?: string;
          p_exam_category?: string;
        };
        Returns: string;
      };
      accept_employee_invitation: {
        Args: {
          p_token: string;
        };
        Returns: string;
      };
      update_my_profile: {
        Args: {
          p_full_name: string;
          p_phone?: string | null;
        };
        Returns: Database['public']['Tables']['users']['Row'];
      };
      get_my_institutes: {
        Args: Record<string, never>;
        Returns: {
          institute_id: string;
        }[];
      };
      get_my_role: {
        Args: {
          p_institute_id: string;
        };
        Returns: string | null;
      };
      has_active_membership: {
        Args: {
          p_institute_id: string;
        };
        Returns: boolean;
      };
      get_public_institute_by_slug: {
        Args: {
          p_slug: string;
        };
        Returns: {
          id: string;
          name: string;
          slug: string;
          phone: string;
          city: string;
          state: string;
          logo_url: string | null;
        }[];
      };
      get_public_courses: {
        Args: {
          p_institute_id: string;
        };
        Returns: {
          id: string;
          institute_id: string;
          name: string;
          exam_category: ExamCategory;
          base_fee: number;
        }[];
      };
    };
  };
}
