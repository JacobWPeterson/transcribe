export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface UserSettings {
  user_id: string;
  dark_mode: boolean;
  font_size: 'S' | 'M' | 'L';
  high_contrast: boolean;
  reduced_motion: boolean;
  onboarding_seen: boolean;
  celebration_shown: boolean;
  created_at: string;
  updated_at: string;
}

export interface LessonProgressRow {
  id: string;
  user_id: string;
  lesson_set: string;
  lesson_id: string;
  answers: Record<string, string> | Record<number, string>;
  status: Record<string, string> | Record<number, string>;
  require_spaces: boolean;
  last_updated: string;
  created_at: string;
}

export interface Database {
  public: {
    Tables: {
      user_settings: {
        Row: UserSettings;
        Insert: Omit<UserSettings, 'created_at' | 'updated_at'>;
        Update: Partial<Omit<UserSettings, 'user_id' | 'created_at'>>;
      };
      lesson_progress: {
        Row: LessonProgressRow;
        Insert: Omit<LessonProgressRow, 'id' | 'created_at'>;
        Update: Partial<
          Omit<LessonProgressRow, 'id' | 'user_id' | 'lesson_set' | 'lesson_id' | 'created_at'>
        >;
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
