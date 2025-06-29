// Database type definitions for TypeScript
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          name: string;
          email: string;
          avatar_url: string | null;
          joined_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          name: string;
          email: string;
          avatar_url?: string | null;
          joined_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          avatar_url?: string | null;
          joined_at?: string;
          updated_at?: string;
        };
      };
      user_preferences: {
        Row: {
          id: string;
          theme: string;
          email_notifications: boolean;
          push_notifications: boolean;
          reminder_notifications: boolean;
          profile_visible: boolean;
          progress_visible: boolean;
          daily_goal_minutes: number;
          reminder_time: string;
          autoplay: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          theme?: string;
          email_notifications?: boolean;
          push_notifications?: boolean;
          reminder_notifications?: boolean;
          profile_visible?: boolean;
          progress_visible?: boolean;
          daily_goal_minutes?: number;
          reminder_time?: string;
          autoplay?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          theme?: string;
          email_notifications?: boolean;
          push_notifications?: boolean;
          reminder_notifications?: boolean;
          profile_visible?: boolean;
          progress_visible?: boolean;
          daily_goal_minutes?: number;
          reminder_time?: string;
          autoplay?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      modules: {
        Row: {
          id: string;
          title: string;
          description: string;
          thumbnail_url: string | null;
          estimated_time_minutes: number;
          difficulty: string;
          category_id: string | null;
          instructor: string;
          rating: number;
          students_enrolled: number;
          is_locked: boolean;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          title: string;
          description: string;
          thumbnail_url?: string | null;
          estimated_time_minutes?: number;
          difficulty: string;
          category_id?: string | null;
          instructor?: string;
          rating?: number;
          students_enrolled?: number;
          is_locked?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          thumbnail_url?: string | null;
          estimated_time_minutes?: number;
          difficulty?: string;
          category_id?: string | null;
          instructor?: string;
          rating?: number;
          students_enrolled?: number;
          is_locked?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      user_progress: {
        Row: {
          id: string;
          user_id: string;
          total_time_spent_minutes: number;
          current_streak_days: number;
          last_activity_date: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          total_time_spent_minutes?: number;
          current_streak_days?: number;
          last_activity_date?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          total_time_spent_minutes?: number;
          current_streak_days?: number;
          last_activity_date?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      user_lesson_completions: {
        Row: {
          id: string;
          user_id: string;
          lesson_id: string;
          module_id: string;
          completed_at: string;
          time_spent_minutes: number;
        };
        Insert: {
          id?: string;
          user_id: string;
          lesson_id: string;
          module_id: string;
          completed_at?: string;
          time_spent_minutes?: number;
        };
        Update: {
          id?: string;
          user_id?: string;
          lesson_id?: string;
          module_id?: string;
          completed_at?: string;
          time_spent_minutes?: number;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}