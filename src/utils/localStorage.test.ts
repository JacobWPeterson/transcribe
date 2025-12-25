import { describe, it, expect, beforeEach, afterEach } from "vitest";

import { LessonStatus } from "../pages/Workspace/TranscriptionArea/SingleLine/singleLine.enum";

import {
  saveLessonProgress,
  loadLessonProgress,
  clearLessonProgress,
  getStoredLessonIds,
  type LessonProgress,
} from "./localStorage";

describe("localStorage utils", () => {
  beforeEach(() => {
    // Clear all localStorage before each test
    localStorage.clear();
  });

  afterEach(() => {
    // Clean up after each test
    localStorage.clear();
  });

  it("should save and load lesson progress", () => {
    const lessonId = 1;
    const progress: LessonProgress = {
      answers: {
        0: "test answer 1",
        1: "test answer 2",
      },
      status: {
        0: LessonStatus.CORRECT,
        1: LessonStatus.INCORRECT,
      },
      requireSpaces: true,
      lastUpdated: Date.now(),
    };

    saveLessonProgress(lessonId, progress);
    const loaded = loadLessonProgress(lessonId);

    expect(loaded).toEqual(progress);
  });

  it("should return null for non-existent lesson", () => {
    const loaded = loadLessonProgress(999);
    expect(loaded).toBeNull();
  });

  it("should clear lesson progress", () => {
    const lessonId = 1;
    const progress: LessonProgress = {
      answers: { 0: "test" },
      status: { 0: LessonStatus.CORRECT },
      requireSpaces: false,
      lastUpdated: Date.now(),
    };

    saveLessonProgress(lessonId, progress);
    expect(loadLessonProgress(lessonId)).toEqual(progress);

    clearLessonProgress(lessonId);
    expect(loadLessonProgress(lessonId)).toBeNull();
  });

  it("should get stored lesson IDs", () => {
    const progress: LessonProgress = {
      answers: {},
      status: {},
      requireSpaces: false,
      lastUpdated: Date.now(),
    };

    saveLessonProgress(1, progress);
    saveLessonProgress(3, progress);
    saveLessonProgress(5, progress);

    const ids = getStoredLessonIds();
    expect(ids).toEqual(expect.arrayContaining([1, 3, 5]));
    expect(ids).toHaveLength(3);
  });

  it("should handle localStorage errors gracefully", () => {
    // Mock localStorage to throw an error
    const originalSetItem = Storage.prototype.setItem.bind(Storage.prototype);
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("Storage quota exceeded");
    });

    const consoleWarnSpy = vi
      .spyOn(console, "warn")
      .mockImplementation(() => {});

    const progress: LessonProgress = {
      answers: { 0: "test" },
      status: { 0: LessonStatus.CORRECT },
      requireSpaces: false,
      lastUpdated: Date.now(),
    };

    // Should not throw
    expect(() => saveLessonProgress(1, progress)).not.toThrow();
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      "Failed to save lesson progress:",
      expect.any(Error)
    );

    // Restore original localStorage
    Storage.prototype.setItem = originalSetItem;
    consoleWarnSpy.mockRestore();
  });
});
