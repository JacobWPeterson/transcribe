import type { ManifestSets } from '@files/manifests';

import type { LessonProgress } from './storageSync';
import { STORAGE_PREFIX } from './storageSync';

/**
 * Generate a storage key that includes both the manifest set and lesson ID
 * This ensures lessons in different manifest sets don't collide
 */
const generateStorageKey = (set: ManifestSets, lessonId: number): string => {
  return `${STORAGE_PREFIX}${set}-${lessonId}`;
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
