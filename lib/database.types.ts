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
          rating: number; // This is actually numeric in the DB
          students_enrolled: number;
          is_locked: boolean;
          sort_order: number | null;
          created_at: string;
          updated_at: string;
          learning_outcomes: string[];
          prerequisites: string[] | null;
        };
        Insert: {
          id: string;
          title: string;
          description: string;
          thumbnail_url?: string | null;
          estimated_time_minutes?: number; // Default: 0
          difficulty: string;
          category_id?: string | null;
          instructor?: string; // Default: 'GrowthGround Staff'
          rating?: number; // Default: 4.9
          students_enrolled?: number; // Default: 0
          is_locked?: boolean; // Default: false
          sort_order?: number | null; // Default: 0
          created_at?: string;
          updated_at?: string;
          learning_outcomes?: string[]; // Default: '{}'
          prerequisites?: string[] | null; // Default: '{}'
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
          sort_order?: number | null;
          created_at?: string;
          updated_at?: string;
          learning_outcomes?: string[];
          prerequisites?: string[] | null;
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
      lessons: {
        Row: {
          id: string;
          module_id: string;
          title: string;
          description: string | null;
          duration_minutes: number; // Default: 10
          core_concepts: string[]; // Default: '{}'
          analogy: string | null;
          sort_order: number | null; // Default: 0
          content: object | null; // This is jsonb in DB
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          module_id: string;
          title: string;
          description?: string | null;
          duration_minutes?: number; // Default: 10
          core_concepts?: string[]; // Default: '{}'
          analogy?: string | null;
          sort_order?: number | null; // Default: 0
          content?: object | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          module_id?: string;
          title?: string;
          description?: string | null;
          duration_minutes?: number;
          core_concepts?: string[];
          analogy?: string | null;
          sort_order?: number | null;
          content?: object | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      categories: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          color: string | null;
          created_at: string;
          updated_at: string;
          sort_order: number | null;
        };
        Insert: {
          id: string;
          name: string;
          description?: string | null;
          color?: string | null;
          created_at?: string;
          updated_at?: string;
          sort_order?: number | null;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          color?: string | null;
          sort_order?: number | null;
          created_at?: string;
          updated_at?: string;
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