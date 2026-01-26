import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { RenderResult } from '@testing-library/react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';

import { LessonStatus } from '../Workspace/TranscriptionArea/SingleLine/singleLine.enum';
import type { LessonProgress } from '../../utils/localStorage';
import { loadLessonProgress } from '../../utils/localStorage';

import { Dashboard } from './Dashboard';

// Mock the localStorage utilities
vi.mock('../../utils/localStorage', () => ({
  loadLessonProgress: vi.fn()
}));

// Mock manifests to control test data
vi.mock('../../files/manifests', () => ({
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
  return render(<BrowserRouter>{component}</BrowserRouter>);
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

  describe('rendering', () => {
    it('should render the dashboard title', () => {
      vi.mocked(loadLessonProgress).mockReturnValue(null);
      renderWithRouter(<Dashboard />);

      expect(
        screen.getByRole('heading', { name: 'Progress Dashboard', level: 1 })
      ).toBeInTheDocument();
    });

    it('should render summary cards', () => {
      vi.mocked(loadLessonProgress).mockReturnValue(null);
      renderWithRouter(<Dashboard />);

      expect(screen.getByText('Correct')).toBeInTheDocument();
      expect(screen.getByText('Incorrect')).toBeInTheDocument();
      expect(screen.getByText('Incomplete')).toBeInTheDocument();
      expect(screen.getByText('Overall')).toBeInTheDocument();
    });

    it('should render lessons section', () => {
      vi.mocked(loadLessonProgress).mockReturnValue(null);
      renderWithRouter(<Dashboard />);

      expect(screen.getByRole('heading', { name: 'Lessons', level: 2 })).toBeInTheDocument();
    });

    it('should render lesson cards with links', () => {
      vi.mocked(loadLessonProgress).mockReturnValue(null);
      renderWithRouter(<Dashboard />);

      const lesson1Link = screen.getByRole('link', { name: 'Lesson 1' });
      const lesson2Link = screen.getByRole('link', { name: 'Lesson 2' });

      expect(lesson1Link).toBeInTheDocument();
      expect(lesson1Link).toHaveAttribute('href', '/lessons/1');
      expect(lesson2Link).toBeInTheDocument();
      expect(lesson2Link).toHaveAttribute('href', '/lessons/2');
    });
  });

  describe('progress calculation', () => {
    it('should show all incomplete when no progress saved', () => {
      vi.mocked(loadLessonProgress).mockReturnValue(null);
      renderWithRouter(<Dashboard />);

      // 3 lines in lesson 1 + 2 lines in lesson 2 = 5 total
      const overallCard = screen.getByText('Overall').parentElement as HTMLElement;
      expect(overallCard).toHaveTextContent('0%');
      expect(overallCard).toHaveTextContent('(0 / 5)');

      // Check summary cards show correct counts
      const summaryCards = screen.getAllByText('0');
      expect(summaryCards.length).toBeGreaterThanOrEqual(2); // Correct and Incorrect cards
    });

    it('should calculate correct progress from saved data', () => {
      vi.mocked(loadLessonProgress).mockImplementation((_, lessonId) => {
        if (lessonId === 1) {
          return buildProgress({
            0: LessonStatus.CORRECT,
            1: LessonStatus.CORRECT,
            2: LessonStatus.INCORRECT
          });
        }
        if (lessonId === 2) {
          return buildProgress({
            0: LessonStatus.CORRECT,
            1: LessonStatus.INCOMPLETE
          });
        }
        return null;
      });

      renderWithRouter(<Dashboard />);

      // 3 correct out of 5 total = 60%
      const overallCard = screen.getByText('Overall').parentElement as HTMLElement;
      expect(overallCard).toHaveTextContent('60%');
      expect(overallCard).toHaveTextContent('(3 / 5)');
    });

    it('should display individual lesson progress correctly', () => {
      vi.mocked(loadLessonProgress).mockImplementation((_, lessonId) => {
        if (lessonId === 1) {
          return buildProgress({
            0: LessonStatus.CORRECT,
            1: LessonStatus.CORRECT,
            2: LessonStatus.INCORRECT
          });
        }
        return null;
      });

      renderWithRouter(<Dashboard />);

      // Lesson 1: 2 correct out of 3 = 67%
      expect(screen.getByText('2 / 3 lines correct (67%)')).toBeInTheDocument();
      // Lesson 2: 0 correct out of 2 = 0%
      expect(screen.getByText('0 / 2 lines correct (0%)')).toBeInTheDocument();
    });

    it('should show 100% when all lines are correct', () => {
      vi.mocked(loadLessonProgress).mockImplementation((_, lessonId) => {
        if (lessonId === 1) {
          return buildProgress({
            0: LessonStatus.CORRECT,
            1: LessonStatus.CORRECT,
            2: LessonStatus.CORRECT
          });
        }
        if (lessonId === 2) {
          return buildProgress({
            0: LessonStatus.CORRECT,
            1: LessonStatus.CORRECT
          });
        }
        return null;
      });

      renderWithRouter(<Dashboard />);

      const overallCard = screen.getByText('Overall').parentElement as HTMLElement;
      expect(overallCard).toHaveTextContent('100%');
      expect(overallCard).toHaveTextContent('(5 / 5)');
    });

    it('should fall back to defaults when progress exists for only one lesson', () => {
      vi.mocked(loadLessonProgress).mockImplementation((_, lessonId) => {
        if (lessonId === 1) {
          return buildProgress({
            0: LessonStatus.CORRECT,
            1: LessonStatus.INCOMPLETE,
            2: LessonStatus.INCOMPLETE
          });
        }
        return null;
      });

      renderWithRouter(<Dashboard />);

      expect(screen.getByText('1 / 3 lines correct (33%)')).toBeInTheDocument();
      expect(screen.getByText('0 / 2 lines correct (0%)')).toBeInTheDocument();
    });

    it('should aggregate incomplete lines correctly', () => {
      vi.mocked(loadLessonProgress).mockImplementation((_, lessonId) => {
        if (lessonId === 1) {
          return buildProgress({
            0: LessonStatus.INCOMPLETE,
            1: LessonStatus.INCOMPLETE,
            2: LessonStatus.INCOMPLETE
          });
        }
        if (lessonId === 2) {
          return buildProgress({
            0: LessonStatus.INCOMPLETE,
            1: LessonStatus.INCOMPLETE
          });
        }
        return null;
      });

      renderWithRouter(<Dashboard />);

      const overallCard = screen.getByText('Overall').parentElement as HTMLElement;
      expect(overallCard).toHaveTextContent('(0 / 5)');
      expect(screen.getByText('Incomplete: 3')).toBeInTheDocument();
    });
  });

  describe('status indicators', () => {
    it('should display status breakdown for each lesson', () => {
      vi.mocked(loadLessonProgress).mockImplementation((_, lessonId) => {
        if (lessonId === 1) {
          return buildProgress({
            0: LessonStatus.CORRECT,
            1: LessonStatus.INCORRECT,
            2: LessonStatus.INCOMPLETE
          });
        }
        return null;
      });

      renderWithRouter(<Dashboard />);

      // Check status indicators are present
      const correctIndicators = screen.getAllByText(/Correct: \d+/);
      const incorrectIndicators = screen.getAllByText(/Incorrect: \d+/);
      const incompleteIndicators = screen.getAllByText(/Incomplete: \d+/);

      expect(correctIndicators.length).toBeGreaterThan(0);
      expect(incorrectIndicators.length).toBeGreaterThan(0);
      expect(incompleteIndicators.length).toBeGreaterThan(0);
    });
  });

  describe('summary totals', () => {
    it('should calculate and display correct summary totals', () => {
      vi.mocked(loadLessonProgress).mockImplementation((_, lessonId) => {
        if (lessonId === 1) {
          return buildProgress({
            0: LessonStatus.CORRECT,
            1: LessonStatus.CORRECT,
            2: LessonStatus.INCORRECT
          });
        }
        if (lessonId === 2) {
          return buildProgress({
            0: LessonStatus.INCORRECT,
            1: LessonStatus.INCOMPLETE
          });
        }
        return null;
      });

      renderWithRouter(<Dashboard />);

      // Find summary cards by their structure
      const correctCard = screen.getByText('Correct').parentElement as HTMLElement;
      expect(correctCard).toHaveTextContent('2');

      const incorrectCard = screen.getByText('Incorrect').parentElement as HTMLElement;
      expect(incorrectCard).toHaveTextContent('2');

      const incompleteCard = screen.getByText('Incomplete').parentElement as HTMLElement;
      expect(incompleteCard).toHaveTextContent('1');
    });
  });

  describe('progress bars', () => {
    it('should render progress bar for each lesson', () => {
      vi.mocked(loadLessonProgress).mockReturnValue(null);
      renderWithRouter(<Dashboard />);

      // Check that progress bars are rendered (using aria-hidden attribute)
      const progressBars = document.querySelectorAll('[aria-hidden="true"]');
      expect(progressBars.length).toBeGreaterThanOrEqual(2); // At least one per lesson
    });
  });
});
