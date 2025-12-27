import type { ManifestSets } from '../files/manifests';
import type { LessonStatus } from '../pages/Workspace/TranscriptionArea/SingleLine/singleLine.enum';

export interface LessonProgress {
  answers: Record<number, string>; // line index -> submitted answer
  status: Record<number, LessonStatus>; // line index -> status
  requireSpaces: boolean;
  lastUpdated: number; // timestamp
}

const STORAGE_PREFIX = 'transcribe-progress-';

/**
 * Generate a storage key that includes both the manifest set and lesson ID
 * This ensures lessons in different manifest sets don't collide
 */
const generateStorageKey = (set: ManifestSets, lessonId: number): string => {
  return `${STORAGE_PREFIX}${set}-${lessonId}`;
};

/**
 * Save lesson progress to localStorage
 */
export const saveLessonProgress = (
  set: ManifestSets,
  lessonId: number,
  progress: LessonProgress
): void => {
  try {
    const key = generateStorageKey(set, lessonId);
    const serialized = JSON.stringify(progress);
    localStorage.setItem(key, serialized);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.warn('Failed to save lesson progress:', errorMessage);

    // Re-throw with more context for error boundaries
    throw new Error(
      `Failed to save lesson progress for ${set} lesson ${lessonId}: ${errorMessage}`
    );
  }
};

/**
 * Load lesson progress from localStorage
 */
export const loadLessonProgress = (set: ManifestSets, lessonId: number): LessonProgress | null => {
  try {
    const key = generateStorageKey(set, lessonId);
    const stored = localStorage.getItem(key);
    if (!stored) {
      return null;
    }
    return JSON.parse(stored);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.warn('Failed to load lesson progress:', errorMessage);

    // Re-throw with more context for error boundaries
    throw new Error(
      `Failed to load lesson progress for ${set} lesson ${lessonId}: ${errorMessage}`
    );
  }
};

/**
 * Clear lesson progress from localStorage
 */
export const clearLessonProgress = (set: ManifestSets, lessonId: number): void => {
  try {
    const key = generateStorageKey(set, lessonId);
    localStorage.removeItem(key);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.warn('Failed to clear lesson progress:', errorMessage);

    // Re-throw with more context for error boundaries
    throw new Error(
      `Failed to clear lesson progress for ${set} lesson ${lessonId}: ${errorMessage}`
    );
  }
};

/**
 * Get all stored lesson IDs for a specific manifest set
 */
export const getStoredLessonIds = (set: ManifestSets): number[] => {
  try {
    const keys = Object.keys(localStorage);
    const setPrefix = `${STORAGE_PREFIX}${set}-`;
    return keys
      .filter(key => key.startsWith(setPrefix))
      .map(key => parseInt(key.replace(setPrefix, ''), 10))
      .filter(id => !isNaN(id));
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.warn(`Failed to get stored lesson IDs for ${set}:`, errorMessage);

    // Re-throw with more context for error boundaries
    throw new Error(`Failed to get stored lesson IDs for ${set}: ${errorMessage}`);
  }
};

const ONBOARDING_KEY = 'transcribe-onboarding-seen';

/**
 * Check if user has seen the onboarding flow
 */
export const hasSeenOnboarding = (): boolean => {
  try {
    return localStorage.getItem(ONBOARDING_KEY) === 'true';
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.warn('Failed to check onboarding status:', errorMessage);
    return false; // Default to showing onboarding if localStorage fails
  }
};

/**
 * Mark onboarding as seen by the user
 */
export const markOnboardingAsSeen = (): void => {
  try {
    localStorage.setItem(ONBOARDING_KEY, 'true');
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.warn('Failed to mark onboarding as seen:', errorMessage);
  }
};
