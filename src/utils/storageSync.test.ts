import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ManifestSets } from '@files/manifests';
import { LessonStatus } from '@pages/Workspace/TranscriptionArea/SingleLine/singleLine.enum';
import type { User } from '@supabase/supabase-js';
import { supabase } from '@config/supabase';

import { migrateLocalProgressToSupabase, STORAGE_PREFIX } from './storageSync';

vi.mock('@config/supabase', () => ({
  supabase: {
    from: vi.fn()
  }
}));

describe('storageSync - Migration lesson ID extraction', () => {
  const mockUser: User = {
    id: 'test-user-id',
    app_metadata: {},
    user_metadata: {},
    aud: 'authenticated',
    created_at: new Date().toISOString(),
    email: 'test@example.com',
    email_confirmed_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    last_sign_in_at: new Date().toISOString()
  };

  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('should correctly migrate lesson 3 (CORE set)', async () => {
    // Setup: Create localStorage entry for lesson 3
    const lesson3Key = `${STORAGE_PREFIX}${ManifestSets.CORE}-3`;
    const lesson3Data = {
      answers: { 1: 'answer3-line1', 2: 'answer3-line2' },
      status: { 1: LessonStatus.CORRECT, 2: LessonStatus.INCOMPLETE },
      requireSpaces: false,
      lastUpdated: Date.now()
    };
    localStorage.setItem(lesson3Key, JSON.stringify(lesson3Data));

    const mockUpsert = vi.fn().mockResolvedValue({ data: null, error: null });
    vi.mocked(supabase.from).mockReturnValue({
      upsert: mockUpsert
    });

    // Run migration
    await migrateLocalProgressToSupabase(mockUser);

    // Verify lesson 3 was stored correctly
    expect(mockUpsert).toHaveBeenCalledWith(
      expect.objectContaining({
        user_id: mockUser.id,
        lesson_set: ManifestSets.CORE,
        lesson_id: '3', // Should be '3', not '4' or anything else
        answers: lesson3Data.answers,
        status: lesson3Data.status
      }),
      expect.any(Object)
    );
  });

  it('should correctly migrate lesson 4 (CORE set) without overwriting lesson 3', async () => {
    // Setup: Create entries for both lesson 3 and 4
    const lesson3Key = `${STORAGE_PREFIX}${ManifestSets.CORE}-3`;
    const lesson3Data = {
      answers: { 1: 'answer3-line1' },
      status: { 1: LessonStatus.CORRECT },
      requireSpaces: false,
      lastUpdated: Date.now()
    };
    localStorage.setItem(lesson3Key, JSON.stringify(lesson3Data));

    const lesson4Key = `${STORAGE_PREFIX}${ManifestSets.CORE}-4`;
    const lesson4Data = {
      answers: { 1: 'answer4-line1', 2: 'answer4-line2', 3: 'answer4-line3' },
      status: { 1: LessonStatus.INCORRECT, 2: LessonStatus.INCORRECT, 3: LessonStatus.INCORRECT },
      requireSpaces: true,
      lastUpdated: Date.now()
    };
    localStorage.setItem(lesson4Key, JSON.stringify(lesson4Data));

    const mockUpsert = vi.fn().mockResolvedValue({ data: null, error: null });
    vi.mocked(supabase.from).mockReturnValue({
      upsert: mockUpsert
    });

    // Run migration
    await migrateLocalProgressToSupabase(mockUser);

    // Verify both lessons were migrated with correct IDs
    const calls = mockUpsert.mock.calls;
    expect(calls.length).toBeGreaterThanOrEqual(2);

    // Find the lesson 3 call
    const lesson3Call = calls.find(
      call => call[0].lesson_id === '3' && call[0].lesson_set === ManifestSets.CORE
    );
    expect(lesson3Call).toBeDefined();
    expect(lesson3Call![0]).toMatchObject({
      lesson_id: '3',
      answers: lesson3Data.answers,
      status: lesson3Data.status
    });

    // Find the lesson 4 call
    const lesson4Call = calls.find(
      call => call[0].lesson_id === '4' && call[0].lesson_set === ManifestSets.CORE
    );
    expect(lesson4Call).toBeDefined();
    expect(lesson4Call![0]).toMatchObject({
      lesson_id: '4',
      answers: lesson4Data.answers,
      status: lesson4Data.status,
      require_spaces: true
    });

    // Verify that lesson 3's data was NOT used for lesson 4
    expect(lesson4Call![0].answers).not.toEqual(lesson3Data.answers);
    expect(lesson4Call![0].answers[3]).toBe('answer4-line3');
  });

  it('should handle UoEDiv lesson set correctly', async () => {
    const lesson2Key = `${STORAGE_PREFIX}${ManifestSets.UoEDiv}-2`;
    const lesson2Data = {
      answers: { 0: 'ueodiv-answer' },
      status: { 0: LessonStatus.CORRECT },
      requireSpaces: false,
      lastUpdated: Date.now()
    };
    localStorage.setItem(lesson2Key, JSON.stringify(lesson2Data));

    const mockUpsert = vi.fn().mockResolvedValue({ data: null, error: null });
    vi.mocked(supabase.from).mockReturnValue({
      upsert: mockUpsert
    });

    await migrateLocalProgressToSupabase(mockUser);

    expect(mockUpsert).toHaveBeenCalledWith(
      expect.objectContaining({
        lesson_set: ManifestSets.UoEDiv,
        lesson_id: '2'
      }),
      expect.any(Object)
    );
  });

  it('should handle mixed lesson sets (lessons and UoEDiv)', async () => {
    const lesson3Key = `${STORAGE_PREFIX}${ManifestSets.CORE}-3`;
    const lesson3Data = {
      answers: { 1: 'core-answer' },
      status: { 1: LessonStatus.CORRECT },
      requireSpaces: false,
      lastUpdated: Date.now()
    };
    localStorage.setItem(lesson3Key, JSON.stringify(lesson3Data));

    const lesson1Key = `${STORAGE_PREFIX}${ManifestSets.UoEDiv}-1`;
    const lesson1Data = {
      answers: { 0: 'uoediv-answer' },
      status: { 0: LessonStatus.CORRECT },
      requireSpaces: false,
      lastUpdated: Date.now()
    };
    localStorage.setItem(lesson1Key, JSON.stringify(lesson1Data));

    const mockUpsert = vi.fn().mockResolvedValue({ data: null, error: null });
    vi.mocked(supabase.from).mockReturnValue({
      upsert: mockUpsert
    });

    await migrateLocalProgressToSupabase(mockUser);

    const calls = mockUpsert.mock.calls;

    // Verify lesson set separation
    const coreCall = calls.find(call => call[0].lesson_set === ManifestSets.CORE);
    expect(coreCall![0]).toMatchObject({
      lesson_set: ManifestSets.CORE,
      lesson_id: '3',
      answers: lesson3Data.answers
    });

    const uoedivCall = calls.find(call => call[0].lesson_set === ManifestSets.UoEDiv);
    expect(uoedivCall![0]).toMatchObject({
      lesson_set: ManifestSets.UoEDiv,
      lesson_id: '1',
      answers: lesson1Data.answers
    });
  });

  it('should skip invalid lesson keys with warning logs', async () => {
    const validKey = `${STORAGE_PREFIX}${ManifestSets.CORE}-5`;
    const validData = {
      answers: { 1: 'valid' },
      status: { 1: LessonStatus.CORRECT },
      requireSpaces: false,
      lastUpdated: Date.now()
    };
    localStorage.setItem(validKey, JSON.stringify(validData));

    // Add an invalid key (missing lesson ID)
    const invalidKey = `${STORAGE_PREFIX}invalid-no-id`;
    localStorage.setItem(invalidKey, JSON.stringify({ answers: {}, status: {} }));

    const mockUpsert = vi.fn().mockResolvedValue({ data: null, error: null });
    vi.mocked(supabase.from).mockReturnValue({
      upsert: mockUpsert
    });

    const consoleWarnSpy = vi.spyOn(console, 'warn');

    await migrateLocalProgressToSupabase(mockUser);

    // Should only migrate valid key
    expect(mockUpsert).toHaveBeenCalledTimes(1);
    expect(mockUpsert).toHaveBeenCalledWith(
      expect.objectContaining({
        lesson_id: '5'
      }),
      expect.any(Object)
    );

    // Should warn about invalid key
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      expect.stringContaining('Failed to parse lesson ID from key')
    );

    consoleWarnSpy.mockRestore();
  });
});
