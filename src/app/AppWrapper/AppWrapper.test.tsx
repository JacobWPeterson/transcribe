import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { ReactNode } from 'react';
import type { RenderResult } from '@testing-library/react';
import { render, screen } from '@testing-library/react';
import { AuthProvider } from '@contexts/AuthContext';

import { AppWrapper } from './AppWrapper';

vi.mock('../../contexts/ThemeContext', () => ({
  useTheme: (): { settings: { darkMode: boolean; highContrast: boolean; fontSize: string } } => ({
    settings: { darkMode: false, highContrast: false, fontSize: 'medium' }
  })
}));

vi.mock('../../components/ContactModal/ContactModal', () => ({
  ContactModal: (): ReactNode => <div data-testid="contact-modal" />
}));

vi.mock('../../components/SettingsMenu/SettingsMenu', () => ({
  SettingsMenu: (): ReactNode => <div data-testid="settings-menu" />
}));

vi.mock('react-bootstrap/NavDropdown', () => ({
  __esModule: true,
  default: ({ children }: { children: ReactNode }): ReactNode => (
    <div data-testid="nav-dropdown">{children}</div>
  )
}));

vi.mock('../../files/manifests', () => ({
  __esModule: true,
  default: {
    lessons: {
      '1': { lines: [{ text: 'a' }] },
      '2': { lines: [{ text: 'b' }] }
    }
  },
  ManifestSets: {
    CORE: 'lessons'
  }
}));

const getStoredLessonIds = vi.fn();
const loadLessonProgress = vi.fn();
const determineLessonToResume = vi.fn();

vi.mock('../../utils/localStorage', () => ({
  getStoredLessonIds: (): void => getStoredLessonIds(),
  loadLessonProgress: (...args: unknown[]): void => loadLessonProgress(...args),
  determineLessonToResume: (): void => determineLessonToResume()
}));

const renderWithProviders = (): RenderResult => {
  return render(
    <AuthProvider>
      <AppWrapper>child</AppWrapper>
    </AuthProvider>
  );
};

describe('determineLessonToResume', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns the first lesson when no stored progress exists', () => {
    determineLessonToResume.mockReturnValue(1);

    expect(determineLessonToResume()).toBe(1);
  });

  it('prefers the most recent incomplete lesson', () => {
    determineLessonToResume.mockReturnValue(2);

    expect(determineLessonToResume()).toBe(2);
  });

  it('falls back to the most recently updated lesson when all are complete', () => {
    determineLessonToResume.mockReturnValue(2);

    expect(determineLessonToResume()).toBe(2);
  });
});

describe('AppWrapper resume link', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('hides resume link when no progress exists', () => {
    getStoredLessonIds.mockReturnValue([]);

    renderWithProviders();

    expect(screen.queryByText('Resume')).not.toBeInTheDocument();
  });

  it('shows resume link pointing to the determined lesson', () => {
    getStoredLessonIds.mockReturnValue([2]);
    determineLessonToResume.mockReturnValue(2);

    renderWithProviders();

    const resumeLink = screen.getByRole('link', { name: 'Resume' });
    expect(resumeLink).toHaveAttribute('href', '/lessons/2');
  });
});
