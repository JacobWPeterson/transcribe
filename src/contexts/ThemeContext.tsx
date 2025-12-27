import type { PropsWithChildren, ReactElement } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

export type FontSize = 'S' | 'M' | 'L';

export interface ThemeSettings {
  darkMode: boolean;
  fontSize: FontSize;
  highContrast: boolean;
}

interface ThemeContextType {
  settings: ThemeSettings;
  toggleDarkMode: () => void;
  setFontSize: (size: FontSize) => void;
  toggleHighContrast: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = 'transcribe-theme-settings';

const defaultSettings: ThemeSettings = {
  darkMode: false,
  fontSize: 'M',
  highContrast: false
};

export const ThemeProvider = ({ children }: PropsWithChildren): ReactElement => {
  const [settings, setSettings] = useState<ThemeSettings>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? { ...defaultSettings, ...JSON.parse(stored) } : defaultSettings;
    } catch {
      return defaultSettings;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // Ignore localStorage errors
    }
  }, [settings]);

  const toggleDarkMode = (): void => {
    setSettings(prev => ({ ...prev, darkMode: !prev.darkMode }));
  };

  const setFontSize = (fontSize: FontSize): void => {
    setSettings(prev => ({ ...prev, fontSize }));
  };

  const toggleHighContrast = (): void => {
    setSettings(prev => ({ ...prev, highContrast: !prev.highContrast }));
  };

  return (
    <ThemeContext.Provider value={{ settings, toggleDarkMode, setFontSize, toggleHighContrast }}>
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
