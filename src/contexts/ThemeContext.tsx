import type { PropsWithChildren, ReactElement } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import { saveUserSettingsSync, loadUserSettingsSync } from '@utils/storageSync';

import { useAuth } from './AuthContext';

export type FontSize = 'S' | 'M' | 'L';

export interface ThemeSettings {
  darkMode: boolean;
  fontSize: FontSize;
  highContrast: boolean;
  reducedMotion: boolean;
}

interface ThemeContextType {
  settings: ThemeSettings;
  toggleDarkMode: () => void;
  setFontSize: (size: FontSize) => void;
  toggleHighContrast: () => void;
  toggleReducedMotion: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const THEME_STORAGE_KEY = 'transcribe-theme-settings';

const getSystemReducedMotion = (): boolean => {
  if (typeof window === 'undefined') {
    return false;
  }
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

const defaultSettings: ThemeSettings = {
  darkMode: false,
  fontSize: 'M',
  highContrast: false,
  reducedMotion: false // Will be overridden by system preference or localStorage
};

export const ThemeProvider = ({ children }: PropsWithChildren): ReactElement => {
  const { user, loading: authLoading } = useAuth();
  const [settings, setSettings] = useState<ThemeSettings>(() => {
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      if (stored) {
        return { ...defaultSettings, ...JSON.parse(stored) };
      }
      // No stored settings, use defaults with system preference for reducedMotion
      return {
        ...defaultSettings,
        reducedMotion: getSystemReducedMotion()
      };
    } catch {
      return {
        ...defaultSettings,
        reducedMotion: getSystemReducedMotion()
      };
    }
  });

  // Load settings from Supabase when user is authenticated
  useEffect(() => {
    if (!authLoading && user) {
      loadUserSettingsSync(user).then(syncedSettings => {
        if (syncedSettings) {
          setSettings({
            darkMode: syncedSettings.darkMode,
            fontSize: syncedSettings.fontSize,
            highContrast: syncedSettings.highContrast,
            reducedMotion: syncedSettings.reducedMotion
          });
        }
      });
    }
  }, [user, authLoading]);

  // Save settings to both localStorage and Supabase
  useEffect(() => {
    saveUserSettingsSync(user, settings).catch(error => {
      console.warn('Failed to save settings:', error);
    });
  }, [settings, user]);

  const toggleDarkMode = (): void => {
    setSettings(prev => ({ ...prev, darkMode: !prev.darkMode }));
  };

  const setFontSize = (fontSize: FontSize): void => {
    setSettings(prev => ({ ...prev, fontSize }));
  };

  const toggleHighContrast = (): void => {
    setSettings(prev => ({ ...prev, highContrast: !prev.highContrast }));
  };

  const toggleReducedMotion = (): void => {
    setSettings(prev => ({ ...prev, reducedMotion: !prev.reducedMotion }));
  };

  return (
    <ThemeContext.Provider
      value={{ settings, toggleDarkMode, setFontSize, toggleHighContrast, toggleReducedMotion }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
