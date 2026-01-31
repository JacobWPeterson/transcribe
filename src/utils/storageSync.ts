/* eslint-disable no-console */
import { supabase } from '@config/supabase';
import type { User } from '@supabase/supabase-js';
import manifests, { ManifestSets } from '@files/manifests';
import { LessonStatus } from '@pages/Workspace/TranscriptionArea/SingleLine/singleLine.enum';
import { THEME_STORAGE_KEY, type ThemeSettings } from '@contexts/ThemeContext';

const STORAGE_PREFIX = 'transcribe-progress-';
export const CELEBRATION_SHOWN_KEY = 'transcribe-celebration-shown';
export const ONBOARDING_SEEN_KEY = 'transcribe-onboarding-seen';

export interface LessonProgress {
  answers: Record<number, string>; // line index -> submitted answer
  status: Record<number, LessonStatus>; // line index -> status
  requireSpaces: boolean;
  lastUpdated: number; // timestamp
}

interface SupabaseLessonProgress {
  answers: Record<number, string>;
  status: Record<number, LessonStatus>;
  require_spaces: boolean;
  last_updated: string;
}

interface SupabaseUserSettings extends ThemeSettings {
  onboarding_seen?: boolean;
  celebration_shown?: boolean;
}

/**
 * Enhanced storage utilities that sync with Supabase when user is authenticated
 * Falls back to localStorage for guest users
 */

/**
 * Save lesson progress to both Supabase and localStorage
 */
export const saveLessonProgressSync = async (
  user: User | null,
  set: ManifestSets,
  lessonId: number,
  progress: LessonProgress
): Promise<void> => {
  // Always save to localStorage for immediate access
  const key = `${STORAGE_PREFIX}${set}-${lessonId}`;
  try {
    localStorage.setItem(key, JSON.stringify(progress));
  } catch (error) {
    console.warn('Failed to save to localStorage:', error);
  }

  // If user is authenticated, sync to Supabase
  if (user) {
    try {
      const { error } = await supabase.from('lesson_progress').upsert(
        {
          user_id: user.id,
          lesson_set: set,
          lesson_id: lessonId.toString(),
          answers: progress.answers,
          status: progress.status,
          require_spaces: progress.requireSpaces,
          last_updated: new Date(progress.lastUpdated).toISOString()
        } as never,
        {
          onConflict: 'user_id,lesson_set,lesson_id'
        }
      );

      if (error) {
        console.warn('Failed to sync lesson progress to Supabase:', error);
      }
    } catch (error) {
      console.warn('Failed to sync lesson progress:', error);
    }
  }
};

/**
 * Load lesson progress from Supabase (if authenticated) or localStorage
 */
export const loadLessonProgressSync = async (
  user: User | null,
  set: ManifestSets,
  lessonId: number
): Promise<LessonProgress | null> => {
  // If user is authenticated, try Supabase first
  if (user) {
    try {
      const { data, error } = await supabase
        .from('lesson_progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('lesson_set', set)
        .eq('lesson_id', lessonId.toString())
        .single();

      if (!error && data) {
        const typedData = data as SupabaseLessonProgress;
        return {
          answers: typedData.answers,
          status: typedData.status,
          requireSpaces: typedData.require_spaces,
          lastUpdated: new Date(typedData.last_updated).getTime()
        };
      }
    } catch (error) {
      console.warn('Failed to load from Supabase, falling back to localStorage:', error);
    }
  }

  // Fall back to localStorage
  const key = `${STORAGE_PREFIX}${set}-${lessonId}`;
  try {
    const stored = localStorage.getItem(key);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.warn('Failed to load from localStorage:', error);
  }

  return null;
};

/**
 * Clear lesson progress from both Supabase and localStorage
 */
export const clearLessonProgressSync = async (
  user: User | null,
  set: ManifestSets,
  lessonId: number
): Promise<void> => {
  // Clear from localStorage
  const key = `${STORAGE_PREFIX}${set}-${lessonId}`;
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.warn('Failed to clear from localStorage:', error);
  }

  // Clear from Supabase if authenticated
  if (user) {
    try {
      await supabase
        .from('lesson_progress')
        .delete()
        .eq('user_id', user.id)
        .eq('lesson_set', set)
        .eq('lesson_id', lessonId.toString());
    } catch (error) {
      console.warn('Failed to clear from Supabase:', error);
    }
  }
};

/**
 * Get all stored lesson IDs from Supabase or localStorage
 */
export const getStoredLessonIdsSync = async (
  user: User | null,
  set: ManifestSets
): Promise<number[]> => {
  // If authenticated, get from Supabase
  if (user) {
    try {
      const { data, error } = await supabase
        .from('lesson_progress')
        .select('lesson_id')
        .eq('user_id', user.id)
        .eq('lesson_set', set);

      if (!error && data) {
        return data
          .map((item: { lesson_id: string }) => parseInt(item.lesson_id, 10))
          .filter(id => !isNaN(id));
      }
    } catch (error) {
      console.warn('Failed to get lesson IDs from Supabase, falling back to localStorage:', error);
    }
  }

  // Fall back to localStorage
  try {
    const keys = Object.keys(localStorage);
    const setPrefix = `${STORAGE_PREFIX}${set}-`;
    return keys
      .filter(key => key.startsWith(setPrefix))
      .map(key => parseInt(key.replace(setPrefix, ''), 10))
      .filter(id => !isNaN(id));
  } catch (error) {
    console.warn('Failed to get lesson IDs from localStorage:', error);
    return [];
  }
};

/**
 * Migrate localStorage progress to Supabase for authenticated user
 */
export const migrateLocalProgressToSupabase = async (user: User): Promise<void> => {
  console.log('Starting migration of localStorage data to Supabase...');

  try {
    const keys = Object.keys(localStorage);
    const progressKeys = keys.filter(key => key.startsWith(STORAGE_PREFIX));

    for (const key of progressKeys) {
      try {
        const stored = localStorage.getItem(key);
        if (!stored) {
          continue;
        }

        const progress: LessonProgress = JSON.parse(stored);

        // Extract set and lessonId from key (format: transcribe-progress-{set}-{id})
        const parts = key.replace(STORAGE_PREFIX, '').split('-');
        if (parts.length < 2) {
          continue;
        }

        const lessonId = parts.pop()!;
        const set = parts.join('-') as ManifestSets;

        // Upload to Supabase
        await supabase.from('lesson_progress').upsert(
          {
            user_id: user.id,
            lesson_set: set,
            lesson_id: lessonId,
            answers: progress.answers,
            status: progress.status,
            require_spaces: progress.requireSpaces,
            last_updated: new Date(progress.lastUpdated).toISOString()
          } as never,
          {
            onConflict: 'user_id,lesson_set,lesson_id'
          }
        );

        console.log(`Migrated ${set} lesson ${lessonId}`);
      } catch (error) {
        console.warn(`Failed to migrate ${key}:`, error);
      }
    }

    // Migrate settings
    const settingsKey = THEME_STORAGE_KEY;
    const settings = localStorage.getItem(settingsKey);
    if (settings) {
      try {
        const parsed = JSON.parse(settings);
        await supabase.from('user_settings').upsert({
          user_id: user.id,
          dark_mode: parsed.darkMode ?? false,
          font_size: parsed.fontSize ?? 'M',
          high_contrast: parsed.highContrast ?? false,
          reduced_motion: parsed.reducedMotion ?? false,
          onboarding_seen: localStorage.getItem(ONBOARDING_SEEN_KEY) === 'true',
          celebration_shown: localStorage.getItem(CELEBRATION_SHOWN_KEY) === 'true'
        } as never);
        console.log('Migrated user settings');
      } catch (error) {
        console.warn('Failed to migrate settings:', error);
      }
    }

    console.log('Migration completed successfully');
  } catch (error) {
    console.error('Migration failed:', error);
    throw error;
  }
};

/**
 * Determine which lesson to resume based on stored progress
 * Returns the most recently updated incomplete lesson, or the first lesson if no progress exists
 */
export const determineLessonToResumeSync = async (user: User | null): Promise<number> => {
  const storedIds = await getStoredLessonIdsSync(user, ManifestSets.CORE);

  // No stored progress: default to the first available lesson (lowest numeric id)
  if (!storedIds.length) {
    const coreLessonIds = Object.keys(manifests[ManifestSets.CORE]).map(id => Number(id));
    return Math.min(...coreLessonIds);
  }

  // Load progress for all stored lessons
  // eslint-disable-next-line compat/compat
  const progressList = await Promise.all(
    storedIds.map(async id => {
      const progress = await loadLessonProgressSync(user, ManifestSets.CORE, id);
      const statusValues = progress?.status ? Object.values(progress.status) : [];
      const isComplete =
        statusValues.length > 0 && statusValues.every(status => status === LessonStatus.CORRECT);
      return { id, lastUpdated: progress?.lastUpdated ?? 0, isComplete };
    })
  );

  // Sort by most recently updated first
  progressList.sort((a, b) => b.lastUpdated - a.lastUpdated);

  // Return the most recent incomplete lesson, or the most recent lesson if all complete
  const latestIncomplete = progressList.find(item => !item.isComplete);
  return (latestIncomplete ?? progressList[0]).id;
};

/**
 * Load user settings from Supabase or localStorage
 */
interface SupabaseUserSettingsRow {
  user_id: string;
  dark_mode: boolean;
  font_size: 'S' | 'M' | 'L';
  high_contrast: boolean;
  reduced_motion: boolean;
  onboarding_seen: boolean;
  celebration_shown: boolean;
}

export const loadUserSettingsSync = async (
  user: User | null
): Promise<{
  darkMode: boolean;
  fontSize: 'S' | 'M' | 'L';
  highContrast: boolean;
  reducedMotion: boolean;
  onboardingSeen: boolean;
  celebrationShown: boolean;
} | null> => {
  if (user) {
    try {
      const { data, error } = await supabase
        .from('user_settings')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (!error && data) {
        const row = data as SupabaseUserSettingsRow;
        return {
          darkMode: row.dark_mode,
          fontSize: row.font_size,
          highContrast: row.high_contrast,
          reducedMotion: row.reduced_motion,
          onboardingSeen: row.onboarding_seen,
          celebrationShown: row.celebration_shown
        };
      }
    } catch (error) {
      console.warn('Failed to load settings from Supabase:', error);
    }
  }

  // Fall back to localStorage
  const settingsKey = THEME_STORAGE_KEY;
  const settings = localStorage.getItem(settingsKey);
  if (settings) {
    return JSON.parse(settings) as {
      darkMode: boolean;
      fontSize: 'S' | 'M' | 'L';
      highContrast: boolean;
      reducedMotion: boolean;
      onboardingSeen: boolean;
      celebrationShown: boolean;
    };
  }

  return null;
};

/**
 * Save user settings to both Supabase and localStorage
 */
export const saveUserSettingsSync = async (
  user: User | null,
  settings: SupabaseUserSettings
): Promise<void> => {
  // Save to localStorage
  const settingsKey = THEME_STORAGE_KEY;
  try {
    localStorage.setItem(settingsKey, JSON.stringify(settings));
  } catch (error) {
    console.warn('Failed to save settings to localStorage:', error);
  }

  // Save to Supabase if authenticated
  if (user) {
    try {
      await supabase.from('user_settings').upsert({
        user_id: user.id,
        dark_mode: settings.darkMode,
        font_size: settings.fontSize,
        high_contrast: settings.highContrast,
        reduced_motion: settings.reducedMotion
      } as never);
    } catch (error) {
      console.warn('Failed to save settings to Supabase:', error);
    }
  }
};

/**
 * Check if user has seen the onboarding flow (Supabase if authenticated, otherwise localStorage)
 */
export const hasSeenOnboardingSync = async (user: User | null): Promise<boolean> => {
  if (user) {
    try {
      const { data, error } = await supabase
        .from('user_settings')
        .select('onboarding_seen')
        .eq('user_id', user.id)
        .single();

      const row = data as { onboarding_seen: boolean | null } | null;
      if (!error && row && typeof row.onboarding_seen === 'boolean') {
        return row.onboarding_seen;
      }
    } catch (error) {
      console.warn('Failed to check onboarding status from Supabase:', error);
    }
  }

  try {
    return localStorage.getItem(ONBOARDING_SEEN_KEY) === 'true';
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.warn('Failed to check onboarding status:', errorMessage);
    return false;
  }
};

/**
 * Mark onboarding as seen (Supabase if authenticated, otherwise localStorage)
 */
export const markOnboardingAsSeenSync = async (user: User | null): Promise<void> => {
  try {
    localStorage.setItem(ONBOARDING_SEEN_KEY, 'true');
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.warn('Failed to mark onboarding as seen:', errorMessage);
  }

  if (user) {
    try {
      await supabase.from('user_settings').upsert({
        user_id: user.id,
        onboarding_seen: true
      } as never);
    } catch (error) {
      console.warn('Failed to mark onboarding as seen in Supabase:', error);
    }
  }
};
