import { describe, it, expect, beforeEach, afterEach } from 'vitest';

import { hasSeenOnboarding, markOnboardingAsSeen } from './localStorage';

describe('Onboarding localStorage utilities', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  afterEach(() => {
    // Clean up after each test
    localStorage.clear();
  });

  describe('hasSeenOnboarding', () => {
    it('should return false when user has not seen onboarding', () => {
      expect(hasSeenOnboarding()).toBe(false);
    });

    it('should return true when user has seen onboarding', () => {
      localStorage.setItem('transcribe-onboarding-seen', 'true');
      expect(hasSeenOnboarding()).toBe(true);
    });

    it('should return false if localStorage has non-true value', () => {
      localStorage.setItem('transcribe-onboarding-seen', 'false');
      expect(hasSeenOnboarding()).toBe(false);
    });

    it('should handle localStorage errors gracefully', () => {
      // Mock localStorage.getItem to throw an error
      const originalGetItem = localStorage.getItem.bind(localStorage);
      localStorage.getItem = (): string => {
        throw new Error('localStorage error');
      };

      // Should default to false (show onboarding) when error occurs
      expect(hasSeenOnboarding()).toBe(false);

      // Restore original method
      localStorage.getItem = originalGetItem;
    });
  });

  describe('markOnboardingAsSeen', () => {
    it('should set localStorage item to true', () => {
      markOnboardingAsSeen();
      expect(localStorage.getItem('transcribe-onboarding-seen')).toBe('true');
    });

    it('should make hasSeenOnboarding return true after being called', () => {
      markOnboardingAsSeen();
      expect(hasSeenOnboarding()).toBe(true);
    });

    it('should handle localStorage errors gracefully', () => {
      // Mock localStorage.setItem to throw an error
      const originalSetItem = localStorage.setItem.bind(localStorage);
      localStorage.setItem = (): void => {
        throw new Error('localStorage error');
      };

      // Should not throw error
      expect(() => markOnboardingAsSeen()).not.toThrow();

      // Restore original method
      localStorage.setItem = originalSetItem;
    });
  });
});
