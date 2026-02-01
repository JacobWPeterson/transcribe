import type { RenderResult } from '@testing-library/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthProvider } from '@contexts/AuthProvider';
import { ThemeProvider } from '@contexts/ThemeProvider';

import { SettingsMenu } from './SettingsMenu';

const renderWithProviders = (): RenderResult => {
  return render(
    <AuthProvider>
      <ThemeProvider>
        <SettingsMenu />
      </ThemeProvider>
    </AuthProvider>
  );
};

describe('SettingsMenu', () => {
  afterEach(() => {
    localStorage.clear();
  });

  it('should render the settings menu button', () => {
    renderWithProviders();
    const settingsButton = screen.getByRole('button', { name: 'Settings' });
    expect(settingsButton).toBeInTheDocument();
  });

  it('should render all menu items when dropdown is opened', async () => {
    const user = userEvent.setup();
    renderWithProviders();

    const settingsButton = screen.getByRole('button', { name: 'Settings' });
    await user.click(settingsButton);

    expect(screen.getByRole('checkbox', { name: 'Switch to dark mode' })).toBeInTheDocument();
    expect(screen.getByText('Font size:')).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: 'Enable high contrast' })).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: /reduced motion/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Reset all saved answers' })).toBeInTheDocument();
  });

  it('should toggle dark mode when dark mode checkbox is clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders();

    const settingsButton = screen.getByRole('button', { name: 'Settings' });
    await user.click(settingsButton);

    const darkModeCheckbox = screen.getByRole('checkbox', { name: 'Switch to dark mode' });
    expect(darkModeCheckbox).not.toBeChecked();

    await user.click(darkModeCheckbox);
    expect(darkModeCheckbox).toBeChecked();

    await user.click(darkModeCheckbox);
    expect(darkModeCheckbox).not.toBeChecked();
  });

  it('should toggle high contrast when high contrast checkbox is clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders();

    const settingsButton = screen.getByRole('button', { name: 'Settings' });
    await user.click(settingsButton);

    const highContrastCheckbox = screen.getByRole('checkbox', { name: 'Enable high contrast' });
    expect(highContrastCheckbox).not.toBeChecked();

    await user.click(highContrastCheckbox);
    expect(highContrastCheckbox).toBeChecked();

    await user.click(highContrastCheckbox);
    expect(highContrastCheckbox).not.toBeChecked();
  });

  it('should disable dark mode checkbox when high contrast is enabled', async () => {
    const user = userEvent.setup();
    renderWithProviders();

    const settingsButton = screen.getByRole('button', { name: 'Settings' });
    await user.click(settingsButton);

    const highContrastCheckbox = screen.getByRole('checkbox', { name: 'Enable high contrast' });
    const darkModeCheckbox = screen.getByRole('checkbox', { name: 'Switch to dark mode' });

    expect(darkModeCheckbox).not.toBeDisabled();

    await user.click(highContrastCheckbox);
    expect(darkModeCheckbox).toBeDisabled();

    await user.click(highContrastCheckbox);
    expect(darkModeCheckbox).not.toBeDisabled();
  });

  it('should change font size when font size button is clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders();

    const settingsButton = screen.getByRole('button', { name: 'Settings' });
    await user.click(settingsButton);

    const fontSizeSmallButton = screen.getByRole('button', { name: 'Set font size to S' });
    const fontSizeMediumButton = screen.getByRole('button', { name: 'Set font size to M' });
    const fontSizeLargeButton = screen.getByRole('button', { name: 'Set font size to L' });

    // Medium should be active by default (className includes the Active class)
    expect(fontSizeMediumButton.className).toMatch(/Active/);

    await user.click(fontSizeSmallButton);
    expect(fontSizeSmallButton.className).toMatch(/Active/);
    expect(fontSizeMediumButton.className).not.toMatch(/Active/);

    await user.click(fontSizeLargeButton);
    expect(fontSizeLargeButton.className).toMatch(/Active/);
    expect(fontSizeSmallButton.className).not.toMatch(/Active/);
  });

  it('should show reset confirmation modal when reset button is clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders();

    const settingsButton = screen.getByRole('button', { name: 'Settings' });
    await user.click(settingsButton);

    const resetButton = screen.getByRole('button', { name: 'Reset all saved answers' });
    await user.click(resetButton);

    expect(screen.getByText('Reset all answers')).toBeInTheDocument();
    expect(
      screen.getByText(/This will permanently delete all your saved answers/)
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Yes, reset everything' })).toBeInTheDocument();
  });

  it('should close modal when cancel button is clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders();

    const settingsButton = screen.getByRole('button', { name: 'Settings' });
    await user.click(settingsButton);

    const resetButton = screen.getByRole('button', { name: 'Reset all saved answers' });
    await user.click(resetButton);

    expect(screen.getByText('Reset all answers')).toBeInTheDocument();

    const cancelButton = screen.getByRole('button', { name: 'Cancel' });
    await user.click(cancelButton);

    expect(screen.queryByText('Reset all answers')).not.toBeInTheDocument();
  });

  it('should clear localStorage when confirming reset', async () => {
    const user = userEvent.setup();

    // Add some test data to localStorage
    localStorage.setItem('transcribe-progress-lessons-1', 'test data 1');
    localStorage.setItem('transcribe-progress-UoEDiv-2', 'test data 2');
    localStorage.setItem('other-key', 'other data');

    renderWithProviders();

    const settingsButton = screen.getByRole('button', { name: 'Settings' });
    await user.click(settingsButton);

    const resetButton = screen.getByRole('button', { name: 'Reset all saved answers' });
    await user.click(resetButton);

    // Before confirming, data should still exist
    expect(localStorage.getItem('transcribe-progress-lessons-1')).toBe('test data 1');
    expect(localStorage.getItem('transcribe-progress-UoEDiv-2')).toBe('test data 2');

    const confirmButton = screen.getByRole('button', {
      name: 'Yes, reset everything'
    });

    // Clear the keysToRemove array and manually test the localStorage clearing logic
    // by checking that transcribe-progress-* keys get removed
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('transcribe-progress-')) {
        keysToRemove.push(key);
      }
    }

    // Verify we found the progress keys
    expect(keysToRemove.length).toBeGreaterThan(0);
    expect(keysToRemove).toContain('transcribe-progress-lessons-1');
    expect(keysToRemove).toContain('transcribe-progress-UoEDiv-2');

    // Confirm clear
    await user.click(confirmButton);

    // Verify transcribe-progress-* keys were removed
    expect(localStorage.getItem('transcribe-progress-lessons-1')).toBeNull();
    expect(localStorage.getItem('transcribe-progress-UoEDiv-2')).toBeNull();

    // Verify non-transcribe-progress keys are still there
    expect(localStorage.getItem('other-key')).toBe('other data');
  });

  it('should have proper accessibility labels', async () => {
    const user = userEvent.setup();
    renderWithProviders();

    const settingsButton = screen.getByRole('button', { name: 'Settings' });
    await user.click(settingsButton);

    // Check dark mode label
    const darkModeCheckbox = screen.getByRole('checkbox', { name: 'Switch to dark mode' });
    expect(darkModeCheckbox).toHaveAttribute('aria-label');

    // Check high contrast label
    const highContrastCheckbox = screen.getByRole('checkbox', { name: 'Enable high contrast' });
    expect(highContrastCheckbox).toHaveAttribute('aria-label');

    // Check font size labels
    const fontSizeSmall = screen.getByRole('button', { name: 'Set font size to S' });
    expect(fontSizeSmall).toHaveAttribute('aria-label');
  });

  it('should update aria-label when dark mode is toggled', async () => {
    const user = userEvent.setup();
    renderWithProviders();

    const settingsButton = screen.getByRole('button', { name: 'Settings' });
    await user.click(settingsButton);

    const darkModeCheckbox = screen.getByRole('checkbox', { name: 'Switch to dark mode' });

    expect(darkModeCheckbox).toHaveAttribute('aria-label', 'Switch to dark mode');

    await user.click(darkModeCheckbox);

    // After clicking, the aria-label should change
    expect(darkModeCheckbox).toHaveAttribute('aria-label', 'Switch to light mode');
  });

  it('should update aria-label when high contrast is toggled', async () => {
    const user = userEvent.setup();
    renderWithProviders();

    const settingsButton = screen.getByRole('button', { name: 'Settings' });
    await user.click(settingsButton);

    const highContrastCheckbox = screen.getByRole('checkbox', { name: 'Enable high contrast' });

    expect(highContrastCheckbox).toHaveAttribute('aria-label', 'Enable high contrast');

    await user.click(highContrastCheckbox);

    // After clicking, the aria-label should change
    expect(highContrastCheckbox).toHaveAttribute('aria-label', 'Disable high contrast');
  });

  it('should toggle reduce motion when checkbox is clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders();

    const settingsButton = screen.getByRole('button', { name: 'Settings' });
    await user.click(settingsButton);

    const reduceMotionCheckbox = screen.getByRole('checkbox', {
      name: /reduced motion/i
    }) as HTMLInputElement;

    // Initial state depends on system preferences, but toggle should work
    const initialState = reduceMotionCheckbox.checked;

    await user.click(reduceMotionCheckbox);
    expect(reduceMotionCheckbox.checked).toBe(!initialState);

    await user.click(reduceMotionCheckbox);
    expect(reduceMotionCheckbox.checked).toBe(initialState);
  });

  it('should initialize reduce motion based on system preference', async () => {
    // Clear localStorage to ensure fresh state
    localStorage.clear();

    // Update mock to simulate prefers-reduced-motion: reduce BEFORE rendering
    vi.mocked(window.matchMedia).mockImplementation((query: string) => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn()
    }));

    const user = userEvent.setup();
    renderWithProviders();

    const settingsButton = screen.getByRole('button', { name: 'Settings' });
    await user.click(settingsButton);

    const reduceMotionCheckbox = screen.getByRole('checkbox', {
      name: /reduced motion/i
    }) as HTMLInputElement;

    // Should be checked when system prefers reduced motion
    expect(reduceMotionCheckbox.checked).toBe(true);
    expect(window.matchMedia).toHaveBeenCalledWith('(prefers-reduced-motion: reduce)');
  });

  it('should not initialize reduce motion when system preference is not set', async () => {
    // Reset mock to default behavior (no reduced motion preference)
    vi.mocked(window.matchMedia).mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn()
    }));

    // Clear localStorage to ensure fresh state
    localStorage.clear();

    const user = userEvent.setup();
    renderWithProviders();

    const settingsButton = screen.getByRole('button', { name: 'Settings' });
    await user.click(settingsButton);

    const reduceMotionCheckbox = screen.getByRole('checkbox', {
      name: /reduced motion/i
    }) as HTMLInputElement;

    // Should not be checked when system does not prefer reduced motion
    expect(reduceMotionCheckbox.checked).toBe(false);
  });

  it('should persist reduce motion setting to localStorage', async () => {
    const user = userEvent.setup();
    localStorage.clear();

    renderWithProviders();

    const settingsButton = screen.getByRole('button', { name: 'Settings' });
    await user.click(settingsButton);

    const reduceMotionCheckbox = screen.getByRole('checkbox', { name: /reduced motion/i });
    await user.click(reduceMotionCheckbox);

    // Check that the setting was persisted
    const storedSettings = JSON.parse(localStorage.getItem('transcribe-theme-settings') || '{}');
    expect(storedSettings.reducedMotion).toBe(true);
  });

  it('should update aria-label when reduce motion is toggled', async () => {
    const user = userEvent.setup();
    renderWithProviders();

    const settingsButton = screen.getByRole('button', { name: 'Settings' });
    await user.click(settingsButton);

    const reduceMotionCheckbox = screen.getByRole('checkbox', { name: 'Enable reduced motion' });

    expect(reduceMotionCheckbox).toHaveAttribute('aria-label', 'Enable reduced motion');

    await user.click(reduceMotionCheckbox);

    // After clicking, the aria-label should change
    expect(reduceMotionCheckbox).toHaveAttribute('aria-label', 'Disable reduced motion');
  });
});
