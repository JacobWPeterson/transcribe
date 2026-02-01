/* eslint-disable compat/compat */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { RenderResult } from '@testing-library/react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { AuthProvider } from '@contexts/AuthProvider';
import { ThemeProvider } from '@contexts/ThemeProvider';
import { LessonStatus } from '@pages/Workspace/TranscriptionArea/SingleLine/singleLine.enum';
import type { LessonProgress } from '@utils/storageSync';
import { loadLessonProgressSync } from '@utils/storageSync';

import { Dashboard } from './Dashboard';

// Mock the storage sync utilities
vi.mock('@utils/storageSync', () => ({
  loadLessonProgressSync: vi.fn(),
  saveLessonProgressSync: vi.fn(() => Promise.resolve()),
  saveUserSettingsSync: vi.fn(() => Promise.resolve()),
  loadUserSettingsSync: vi.fn(() => Promise.resolve(null))
}));

// Mock manifests to control test data
vi.mock('@files/manifests', () => ({
  default: {
    lessons: {
      '1': {
        manifestId: 'https://example.com/manifest1',
        canvasIndex: 0,
        lines: [{ text: 'line1' }, { text: 'line2' }, { text: 'line3' }]
      },
      '2': {
        manifestId: 'https://example.com/manifest2',
        canvasIndex: 0,
        lines: [{ text: 'line1' }, { text: 'line2' }]
      }
    }
  },
  ManifestSets: {
    CORE: 'lessons'
  }
}));

const renderWithRouter = (component: React.ReactElement): RenderResult => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>{component}</ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

const buildProgress = (status: LessonProgress['status']): LessonProgress => ({
  status,
  answers: {},
  requireSpaces: false,
  lastUpdated: Date.now()
});

describe('Dashboard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render correctly', async () => {
    vi.mocked(loadLessonProgressSync).mockResolvedValue(null);
    renderWithRouter(<Dashboard />);

    // Wait for async data loading
    await screen.findByRole('heading', { name: 'Progress Dashboard', level: 1 });
    expect(screen.getByRole('button', { name: 'Report' })).toBeInTheDocument();

    // Summary cards
    expect(screen.getByText('Correct')).toBeInTheDocument();
    expect(screen.getByText('Incorrect')).toBeInTheDocument();
    expect(screen.getByText('Incomplete')).toBeInTheDocument();
    expect(screen.getByText('Overall')).toBeInTheDocument();

    // Lessons header
    expect(screen.getByRole('heading', { name: 'Lessons', level: 2 })).toBeInTheDocument();

    // Lesson cards
    const lesson1Link = screen.getByRole('link', { name: 'Lesson 1' });
    const lesson2Link = screen.getByRole('link', { name: 'Lesson 2' });

    expect(lesson1Link).toBeInTheDocument();
    expect(lesson1Link).toHaveAttribute('href', '/lessons/1');
    expect(lesson2Link).toBeInTheDocument();
    expect(lesson2Link).toHaveAttribute('href', '/lessons/2');
  });

  describe('Progress calculations', () => {
    it('should show all incomplete when no progress saved', async () => {
      vi.mocked(loadLessonProgressSync).mockResolvedValue(null);
      renderWithRouter(<Dashboard />);

      // 3 lines in lesson 1 + 2 lines in lesson 2 = 5 total
      const overallCard = (await screen.findByText('Overall')).parentElement as HTMLElement;
      expect(overallCard).toHaveTextContent('0%');
      expect(overallCard).toHaveTextContent('(0 / 5)');

      // Check summary cards show correct counts
      const summaryCards = screen.getAllByText('0');
      expect(summaryCards.length).toBeGreaterThanOrEqual(2); // Correct and Incorrect cards
    });

    it('should calculate correct progress from saved data', async () => {
      vi.mocked(loadLessonProgressSync).mockImplementation((_user, _set, lessonId) => {
        if (lessonId === 1) {
          return Promise.resolve(
            buildProgress({
              0: LessonStatus.CORRECT,
              1: LessonStatus.CORRECT,
              2: LessonStatus.INCORRECT
            })
          );
        }
        if (lessonId === 2) {
          return Promise.resolve(
            buildProgress({
              0: LessonStatus.CORRECT,
              1: LessonStatus.INCOMPLETE
            })
          );
        }
        return Promise.resolve(null);
      });

      renderWithRouter(<Dashboard />);

      // 3 correct out of 5 total = 60%
      const overallCard = (await screen.findByText('Overall')).parentElement as HTMLElement;
      expect(overallCard).toHaveTextContent('60%');
      expect(overallCard).toHaveTextContent('(3 / 5)');
    });

    it('should display individual lesson progress correctly', async () => {
      vi.mocked(loadLessonProgressSync).mockImplementation((_user, _set, lessonId) => {
        if (lessonId === 1) {
          return Promise.resolve(
            buildProgress({
              0: LessonStatus.CORRECT,
              1: LessonStatus.CORRECT,
              2: LessonStatus.INCORRECT
            })
          );
        }
        return Promise.resolve(null);
      });

      renderWithRouter(<Dashboard />);

      // Lesson 1: 2 correct out of 3 = 67%
      expect(await screen.findByText('2 / 3 lines correct (67%)')).toBeInTheDocument();
      // Lesson 2: 0 correct out of 2 = 0%
      expect(screen.getByText('0 / 2 lines correct (0%)')).toBeInTheDocument();
    });

    it('should show 100% when all lines are correct', async () => {
      vi.mocked(loadLessonProgressSync).mockImplementation((_user, _set, lessonId) => {
        if (lessonId === 1) {
          return Promise.resolve(
            buildProgress({
              0: LessonStatus.CORRECT,
              1: LessonStatus.CORRECT,
              2: LessonStatus.CORRECT
            })
          );
        }
        if (lessonId === 2) {
          return Promise.resolve(
            buildProgress({
              0: LessonStatus.CORRECT,
              1: LessonStatus.CORRECT
            })
          );
        }
        return Promise.resolve(null);
      });

      renderWithRouter(<Dashboard />);

      const overallCard = (await screen.findByText('Overall')).parentElement as HTMLElement;
      expect(overallCard).toHaveTextContent('100%');
      expect(overallCard).toHaveTextContent('(5 / 5)');
    });

    it('should fall back to defaults when progress exists for only one lesson', async () => {
      vi.mocked(loadLessonProgressSync).mockImplementation((_user, _set, lessonId) => {
        if (lessonId === 1) {
          return Promise.resolve(
            buildProgress({
              0: LessonStatus.CORRECT,
              1: LessonStatus.INCOMPLETE,
              2: LessonStatus.INCOMPLETE
            })
          );
        }
        return Promise.resolve(null);
      });

      renderWithRouter(<Dashboard />);

      expect(await screen.findByText('1 / 3 lines correct (33%)')).toBeInTheDocument();
      expect(screen.getByText('0 / 2 lines correct (0%)')).toBeInTheDocument();
    });

    it('should aggregate incomplete lines correctly', async () => {
      vi.mocked(loadLessonProgressSync).mockImplementation((_user, _set, lessonId) => {
        if (lessonId === 1) {
          return Promise.resolve(
            buildProgress({
              0: LessonStatus.INCOMPLETE,
              1: LessonStatus.INCOMPLETE,
              2: LessonStatus.INCOMPLETE
            })
          );
        }
        if (lessonId === 2) {
          return Promise.resolve(
            buildProgress({
              0: LessonStatus.INCOMPLETE,
              1: LessonStatus.INCOMPLETE
            })
          );
        }
        return Promise.resolve(null);
      });

      renderWithRouter(<Dashboard />);

      const overallCard = (await screen.findByText('Overall')).parentElement as HTMLElement;
      expect(overallCard).toHaveTextContent('(0 / 5)');
      expect(screen.getByText('Incomplete: 3')).toBeInTheDocument();
    });
  });

  describe('Status indicators', () => {
    it('should display status breakdown for each lesson', async () => {
      vi.mocked(loadLessonProgressSync).mockImplementation((_user, _set, lessonId) => {
        if (lessonId === 1) {
          return Promise.resolve(
            buildProgress({
              0: LessonStatus.CORRECT,
              1: LessonStatus.INCORRECT,
              2: LessonStatus.INCOMPLETE
            })
          );
        }
        return Promise.resolve(null);
      });

      renderWithRouter(<Dashboard />);

      // Check status indicators are present
      const correctIndicators = await screen.findAllByText(/Correct: \d+/);
      const incorrectIndicators = screen.getAllByText(/Incorrect: \d+/);
      const incompleteIndicators = screen.getAllByText(/Incomplete: \d+/);

      expect(correctIndicators.length).toBeGreaterThan(0);
      expect(incorrectIndicators.length).toBeGreaterThan(0);
      expect(incompleteIndicators.length).toBeGreaterThan(0);
    });
  });

  describe('Summary totals', () => {
    it('should calculate and display correct summary totals', async () => {
      vi.mocked(loadLessonProgressSync).mockImplementation((_user, _set, lessonId) => {
        if (lessonId === 1) {
          return Promise.resolve(
            buildProgress({
              0: LessonStatus.CORRECT,
              1: LessonStatus.CORRECT,
              2: LessonStatus.INCORRECT
            })
          );
        }
        if (lessonId === 2) {
          return Promise.resolve(
            buildProgress({
              0: LessonStatus.INCORRECT,
              1: LessonStatus.INCOMPLETE
            })
          );
        }
        return Promise.resolve(null);
      });

      renderWithRouter(<Dashboard />);

      // Find summary cards by their structure
      const correctCard = (await screen.findByText('Correct')).parentElement as HTMLElement;
      expect(correctCard).toHaveTextContent('2');

      const incorrectCard = screen.getByText('Incorrect').parentElement as HTMLElement;
      expect(incorrectCard).toHaveTextContent('2');

      const incompleteCard = screen.getByText('Incomplete').parentElement as HTMLElement;
      expect(incompleteCard).toHaveTextContent('1');
    });
  });

  describe('Progress bars', () => {
    it('should render progress bar for each lesson', async () => {
      vi.mocked(loadLessonProgressSync).mockResolvedValue(null);
      renderWithRouter(<Dashboard />);

      // Wait for data to load first
      await screen.findByRole('heading', { name: 'Progress Dashboard', level: 1 });

      // Check that progress bars are rendered (using aria-hidden attribute)
      const progressBars = document.querySelectorAll('[aria-hidden="true"]');
      expect(progressBars.length).toBeGreaterThanOrEqual(2); // At least one per lesson
    });
  });
});
