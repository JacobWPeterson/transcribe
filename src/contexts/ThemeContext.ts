import { createContext } from 'react';

export type FontSize = 'S' | 'M' | 'L';

export interface ThemeSettings {
  darkMode: boolean;
  fontSize: FontSize;
  highContrast: boolean;
  reducedMotion: boolean;
}

export interface ThemeContextType {
  settings: ThemeSettings;
  toggleDarkMode: () => void;
  setFontSize: (size: FontSize) => void;
  toggleHighContrast: () => void;
  toggleReducedMotion: () => void;
}

export const THEME_STORAGE_KEY = 'transcribe-theme-settings';

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
