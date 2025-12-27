import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

import { ManifestSets } from '../files/manifests';
import { LessonStatus } from '../pages/Workspace/TranscriptionArea/SingleLine/singleLine.enum';

import {
  saveLessonProgress,
  loadLessonProgress,
  clearLessonProgress,
  getStoredLessonIds,
  type LessonProgress
} from './localStorage';

describe('localStorage utils', () => {
  beforeEach(() => {
    // Clear all localStorage before each test
    localStorage.clear();
  });

  afterEach(() => {
    // Clean up after each test
    localStorage.clear();
  });

  it('should save and load lesson progress', () => {
    const set = ManifestSets.CORE;
    const lessonId = 1;
    const progress: LessonProgress = {
      answers: {
        0: 'test answer 1',
        1: 'test answer 2'
      },
      status: {
        0: LessonStatus.CORRECT,
        1: LessonStatus.INCORRECT
      },
      requireSpaces: true,
      lastUpdated: Date.now()
    };

    saveLessonProgress(set, lessonId, progress);
    const loaded = loadLessonProgress(set, lessonId);

    expect(loaded).toEqual(progress);
  });

  it('should return null for non-existent lesson', () => {
    const set = ManifestSets.CORE;
    const loaded = loadLessonProgress(set, 999);
    expect(loaded).toBeNull();
  });

  it('should clear lesson progress', () => {
    const set = ManifestSets.CORE;
    const lessonId = 1;
    const progress: LessonProgress = {
      answers: { 0: 'test' },
      status: { 0: LessonStatus.CORRECT },
      requireSpaces: false,
      lastUpdated: Date.now()
    };

    saveLessonProgress(set, lessonId, progress);
    expect(loadLessonProgress(set, lessonId)).toEqual(progress);

    clearLessonProgress(set, lessonId);
    expect(loadLessonProgress(set, lessonId)).toBeNull();
  });

  it('should get stored lesson IDs for a specific manifest set', () => {
    const coreProgress: LessonProgress = {
      answers: {},
      status: {},
      requireSpaces: false,
      lastUpdated: Date.now()
    };

    const uoeDivProgress: LessonProgress = {
      answers: {},
      status: {},
      requireSpaces: false,
      lastUpdated: Date.now()
    };

    // Save to CORE set
    saveLessonProgress(ManifestSets.CORE, 1, coreProgress);
    saveLessonProgress(ManifestSets.CORE, 3, coreProgress);

    // Save to UoEDiv set
    saveLessonProgress(ManifestSets.UoEDiv, 1, uoeDivProgress);
    saveLessonProgress(ManifestSets.UoEDiv, 2, uoeDivProgress);

    // Should only return CORE lesson IDs
    const coreIds = getStoredLessonIds(ManifestSets.CORE);
    expect(coreIds).toEqual(expect.arrayContaining([1, 3]));
    expect(coreIds).toHaveLength(2);

    // Should only return UoEDiv lesson IDs
    const uoeDivIds = getStoredLessonIds(ManifestSets.UoEDiv);
    expect(uoeDivIds).toEqual(expect.arrayContaining([1, 2]));
    expect(uoeDivIds).toHaveLength(2);
  });

  it('should differentiate between manifest sets', () => {
    const lessonId = 1;
    const coreProgress: LessonProgress = {
      answers: { 0: 'core answer' },
      status: { 0: LessonStatus.CORRECT },
      requireSpaces: false,
      lastUpdated: Date.now()
    };

    const uoeDivProgress: LessonProgress = {
      answers: { 0: 'uoediv answer' },
      status: { 0: LessonStatus.INCORRECT },
      requireSpaces: true,
      lastUpdated: Date.now()
    };

    // Save the same lesson ID to different sets
    saveLessonProgress(ManifestSets.CORE, lessonId, coreProgress);
    saveLessonProgress(ManifestSets.UoEDiv, lessonId, uoeDivProgress);

    // Load from each set and verify they're different
    const loadedCore = loadLessonProgress(ManifestSets.CORE, lessonId);
    const loadedUoEDiv = loadLessonProgress(ManifestSets.UoEDiv, lessonId);

    expect(loadedCore).toEqual(coreProgress);
    expect(loadedUoEDiv).toEqual(uoeDivProgress);
    expect(loadedCore).not.toEqual(loadedUoEDiv);
  });

  it('should handle localStorage errors gracefully', () => {
    // Mock localStorage to throw an error
    const originalSetItem = Storage.prototype.setItem.bind(Storage.prototype);
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('Storage quota exceeded');
    });

    const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const progress: LessonProgress = {
      answers: { 0: 'test' },
      status: { 0: LessonStatus.CORRECT },
      requireSpaces: false,
      lastUpdated: Date.now()
    };

    // Should throw an error that can be caught by error boundaries
    expect(() => saveLessonProgress(ManifestSets.CORE, 1, progress)).toThrow(
      'Failed to save lesson progress for lessons lesson 1: Storage quota exceeded'
    );
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      'Failed to save lesson progress:',
      'Storage quota exceeded'
    );

    // Restore original localStorage
    Storage.prototype.setItem = originalSetItem;
    consoleWarnSpy.mockRestore();
  });
});
