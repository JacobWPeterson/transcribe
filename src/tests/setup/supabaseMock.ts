/* eslint-disable compat/compat */
import { vi } from 'vitest';

/**
 * Mock Supabase client for testing
 * Prevents tests from making real API calls
 */
export const mockSupabase = {
  auth: {
    signUp: vi.fn(() =>
      Promise.resolve({
        data: { user: { id: 'test-user-id', email: 'test@example.com' }, session: null },
        error: null
      })
    ),
    signInWithPassword: vi.fn(() =>
      Promise.resolve({
        data: { user: { id: 'test-user-id', email: 'test@example.com' }, session: {} },
        error: null
      })
    ),
    signOut: vi.fn(() => Promise.resolve({ error: null })),
    getSession: vi.fn(() =>
      Promise.resolve({
        data: { session: null },
        error: null
      })
    ),
    onAuthStateChange: vi.fn(() => ({
      data: { subscription: { unsubscribe: vi.fn() } }
    })),
    resetPasswordForEmail: vi.fn(() => Promise.resolve({ data: {}, error: null }))
  },
  from: vi.fn(() => ({
    select: vi.fn().mockReturnThis(),
    insert: vi.fn(() => Promise.resolve({ data: [], error: null })),
    upsert: vi.fn(() => Promise.resolve({ data: [], error: null })),
    update: vi.fn().mockReturnThis(),
    delete: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    single: vi.fn(() => Promise.resolve({ data: null, error: null }))
  }))
};

// Mock the Supabase module
vi.mock('@config/supabase', () => ({
  supabase: mockSupabase
}));
