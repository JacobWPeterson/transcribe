import type { LessonStatus } from "../pages/Workspace/TranscriptionArea/SingleLine/singleLine.enum";

export interface LessonProgress {
  answers: Record<number, string>; // line index -> submitted answer
  status: Record<number, LessonStatus>; // line index -> status
  requireSpaces: boolean;
  lastUpdated: number; // timestamp
}

const STORAGE_PREFIX = "transcribe-progress-";

/**
 * Save lesson progress to localStorage
 */
export const saveLessonProgress = (
  lessonId: number,
  progress: LessonProgress
): void => {
  try {
    const key = `${STORAGE_PREFIX}${lessonId}`;
    const serialized = JSON.stringify(progress);
    localStorage.setItem(key, serialized);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.warn("Failed to save lesson progress:", errorMessage);

    // Re-throw with more context for error boundaries
    throw new Error(
      `Failed to save lesson progress for lesson ${lessonId}: ${errorMessage}`
    );
  }
};

/**
 * Load lesson progress from localStorage
 */
export const loadLessonProgress = (lessonId: number): LessonProgress | null => {
  try {
    const key = `${STORAGE_PREFIX}${lessonId}`;
    const stored = localStorage.getItem(key);
    if (!stored) {
      return null;
    }
    return JSON.parse(stored);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.warn("Failed to load lesson progress:", errorMessage);

    // Re-throw with more context for error boundaries
    throw new Error(
      `Failed to load lesson progress for lesson ${lessonId}: ${errorMessage}`
    );
  }
};

/**
 * Clear lesson progress from localStorage
 */
export const clearLessonProgress = (lessonId: number): void => {
  try {
    const key = `${STORAGE_PREFIX}${lessonId}`;
    localStorage.removeItem(key);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.warn("Failed to clear lesson progress:", errorMessage);

    // Re-throw with more context for error boundaries
    throw new Error(
      `Failed to clear lesson progress for lesson ${lessonId}: ${errorMessage}`
    );
  }
};

/**
 * Get all stored lesson IDs
 */
export const getStoredLessonIds = (): number[] => {
  try {
    const keys = Object.keys(localStorage);
    return keys
      .filter((key) => key.startsWith(STORAGE_PREFIX))
      .map((key) => parseInt(key.replace(STORAGE_PREFIX, ""), 10))
      .filter((id) => !isNaN(id));
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.warn("Failed to get stored lesson IDs:", errorMessage);

    // Re-throw with more context for error boundaries
    throw new Error(`Failed to get stored lesson IDs: ${errorMessage}`);
  }
};
