import { render, screen } from '@testing-library/react';

import { LessonStatus } from '../../pages/Workspace/TranscriptionArea/SingleLine/singleLine.enum';

import { StatusReport } from './StatusReport';

describe('StatusReport', () => {
  it('renders progress bar and status indicators correctly', () => {
    const lessonsStatus: Record<number, LessonStatus> = {
      0: LessonStatus.CORRECT,
      1: LessonStatus.INCORRECT,
      2: LessonStatus.INCOMPLETE,
      3: LessonStatus.CORRECT
    };

    render(<StatusReport lessonsStatus={lessonsStatus} />);

    // Check progress text
    expect(screen.getByText('2 / 4 lines correct (50%)')).toBeInTheDocument();

    // Check status indicators
    expect(screen.getByText('Correct: 2')).toBeInTheDocument();
    expect(screen.getByText('Incorrect: 1')).toBeInTheDocument();
    expect(screen.getByText('Incomplete: 1')).toBeInTheDocument();
  });

  it('handles empty lessonsStatus', () => {
    const lessonsStatus: Record<number, LessonStatus> = {};

    render(<StatusReport lessonsStatus={lessonsStatus} />);

    expect(screen.getByText('0 / 0 lines correct (0%)')).toBeInTheDocument();
    expect(screen.getByText('Correct: 0')).toBeInTheDocument();
    expect(screen.getByText('Incorrect: 0')).toBeInTheDocument();
    expect(screen.getByText('Incomplete: 0')).toBeInTheDocument();
  });

  it('shows 100% progress when all lines are correct', () => {
    const lessonsStatus: Record<number, LessonStatus> = {
      0: LessonStatus.CORRECT,
      1: LessonStatus.CORRECT
    };

    render(<StatusReport lessonsStatus={lessonsStatus} />);

    expect(screen.getByText('2 / 2 lines correct (100%)')).toBeInTheDocument();
  });
});
