// Utility functions to work with CSS variables in TypeScript

import type { ThemeSettings, FontSize } from 'src/contexts/ThemeContext';

/**
 * Get the value of a CSS custom property (variable) from the root element
 * @param variableName - The CSS variable name (without --)
 * @param fallback - Optional fallback value if variable is not found
 * @returns The computed value of the CSS variable
 */
export const getCssVariable = (variableName: string, fallback = ''): string => {
  if (typeof document === 'undefined') {
    return fallback;
  }

  const root = document.documentElement;
  const value = getComputedStyle(root).getPropertyValue(`--${variableName}`).trim();

  return value || fallback;
};

/**
 * Get the value of a CSS custom property as a number (for sizes, etc.)
 * @param variableName - The CSS variable name (without --)
 * @param fallback - Optional fallback number if variable is not found or parsing fails
 * @returns The numeric value of the CSS variable
 */
export const getCssVariableAsNumber = (variableName: string, fallback = 0): number => {
  const value = getCssVariable(variableName);
  if (!value) {
    return fallback;
  }

  // Remove units like 'px', 'em', etc. and parse as number
  const numericValue = parseFloat(value.replace(/[^\d.-]/g, ''));
  return isNaN(numericValue) ? fallback : numericValue;
};

/**
 * Check if a specific data attribute is set on the root element
 * @param attribute - The data attribute name (without data-)
 * @param value - Optional value to check for
 * @returns True if the attribute is set (or matches the value)
 */
export const hasDataAttribute = (attribute: string, value?: string): boolean => {
  if (typeof document === 'undefined') {
    return false;
  }

  const root = document.documentElement;
  const attrValue = root.getAttribute(`data-${attribute}`);

  if (value !== undefined) {
    return attrValue === value;
  }

  return attrValue !== null;
};

/**
 * Get the current theme settings based on data attributes
 * @returns Object with current theme state
 */
export const getCurrentThemeState = (): ThemeSettings => {
  return {
    darkMode: hasDataAttribute('theme', 'dark'),
    highContrast: hasDataAttribute('high-contrast', 'true'),
    fontSize: document.documentElement.getAttribute('data-font-size') || ('M' as FontSize)
  } as ThemeSettings;
};

/**
 * Get a color value that respects the current theme
 * @param colorKey - The color key from theme.colors
 * @returns The current color value
 */
export const getThemeColor = (colorKey: string): string => {
  const state = getCurrentThemeState();

  if (state.highContrast) {
    // For high contrast, we could return specific colors, but since we have CSS variables,
    // it's better to let CSS handle it
    return getCssVariable(colorKey);
  }

  if (state.darkMode) {
    // For dark mode, we could return dark theme colors, but again CSS variables are better
    return getCssVariable(colorKey);
  }

  return getCssVariable(colorKey);
};
