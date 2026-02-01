import type { RenderResult } from '@testing-library/react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import manifests, { ManifestSets } from '../../../files/manifests';
import { AuthProvider } from '../../../contexts/AuthProvider';

import { LessonStatus } from './SingleLine/singleLine.enum';
import { TranscriptionArea } from './TranscriptionArea';

const mockChangeManuscript = vi.fn();

// Helper to render with AuthProvider
const renderWithAuth = (component: React.ReactElement): RenderResult => {
  return render(<AuthProvider>{component}</AuthProvider>);
};

describe('TranscriptionArea', () => {
  beforeEach(() => {
    // Clear localStorage before each test to ensure clean state
    localStorage.clear();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });
  it('should render correctly for first lesson', async () => {
    renderWithAuth(
      <TranscriptionArea
        changeManuscript={mockChangeManuscript}
        numberOfLessons={3}
        lessonNumber={1}
        manifest={manifests[ManifestSets.CORE][1]}
        set={ManifestSets.CORE}
      />
    );
    const user = userEvent.setup();

    // Header area
    expect(screen.getByRole('heading', { level: 2, name: 'Lesson 1' })).toBeInTheDocument();
    const requireSpacesCheckbox = screen.getByRole('checkbox', {
      name: 'Require spaces'
    });
    expect(requireSpacesCheckbox).toBeInTheDocument();
    expect(requireSpacesCheckbox).not.toBeChecked();
    expect(screen.getByRole('link', { name: 'Guide' })).toBeInTheDocument();

    // Instructions
    expect(screen.getByText('General instructions')).toBeInTheDocument();
    expect(
      screen.getByText(
        /This lesson is about the right column. The title is above the green rectangle. Treat indented lines as part of the preceding line when entering them in the forms./
      )
    ).toBeInTheDocument();

    // Lines
    expect(screen.getAllByRole('textbox')).toHaveLength(
      manifests[ManifestSets.CORE][1].lines.length
    );
    expect(screen.getByRole('textbox', { name: 'title' })).toBeInTheDocument();
    expect(screen.queryByRole('textbox', { name: 'L0' })).not.toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'L1' })).toBeInTheDocument();

    // Buttons
    expect(screen.queryByRole('button', { name: 'Previous' })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Next' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Next' }));
    expect(mockChangeManuscript).toHaveBeenCalledWith('next');
  });

  it('should render correctly for middle lesson', async () => {
    renderWithAuth(
      <TranscriptionArea
        changeManuscript={mockChangeManuscript}
        numberOfLessons={3}
        lessonNumber={2}
        manifest={manifests[ManifestSets.CORE][2]}
        set={ManifestSets.CORE}
      />
    );
    const user = userEvent.setup();

    // Header area
    expect(screen.getByRole('heading', { level: 2, name: 'Lesson 2' })).toBeInTheDocument();
    const requireSpacesCheckbox = screen.getByRole('checkbox', {
      name: 'Require spaces'
    });
    expect(requireSpacesCheckbox).toBeInTheDocument();
    expect(requireSpacesCheckbox).not.toBeChecked();
    expect(screen.getByRole('link', { name: 'Guide' })).toBeInTheDocument();

    // Instructions
    expect(screen.getByText('General instructions')).toBeInTheDocument();
    expect(
      screen.getByText(
        /A papyrus manuscript by a trained scribe in a slightly irregular majuscule script/
      )
    ).toBeInTheDocument();

    // Lines
    expect(screen.getAllByRole('textbox')).toHaveLength(
      manifests[ManifestSets.CORE][2].lines.length
    );
    expect(screen.queryByRole('textbox', { name: 'title' })).not.toBeInTheDocument();
    expect(screen.queryByRole('textbox', { name: 'L0' })).not.toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'L1' })).toBeInTheDocument();

    // Buttons
    expect(screen.getByRole('button', { name: 'Previous' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Next' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Next' }));
    expect(mockChangeManuscript).toHaveBeenCalledWith('next');
    await user.click(screen.getByRole('button', { name: 'Previous' }));
    expect(mockChangeManuscript).toHaveBeenCalledWith('previous');
  });

  it('should render correctly for last lesson', async () => {
    renderWithAuth(
      <TranscriptionArea
        changeManuscript={mockChangeManuscript}
        numberOfLessons={3}
        lessonNumber={3}
        manifest={manifests[ManifestSets.CORE][3]}
        set={ManifestSets.CORE}
      />
    );
    const user = userEvent.setup();

    // Header area
    expect(screen.getByRole('heading', { level: 2, name: 'Lesson 3' })).toBeInTheDocument();
    const requireSpacesCheckbox = screen.getByRole('checkbox', {
      name: 'Require spaces'
    });
    expect(requireSpacesCheckbox).toBeInTheDocument();
    expect(requireSpacesCheckbox).not.toBeChecked();
    expect(screen.getByRole('link', { name: 'Guide' })).toBeInTheDocument();

    // Instructions
    expect(screen.getByText('General instructions')).toBeInTheDocument();
    expect(
      screen.getByText(
        /No new concepts again in this lesson, just more examples of those learned in the previous lessons but in a different style of majuscule script./
      )
    ).toBeInTheDocument();

    // Lines
    expect(screen.getAllByRole('textbox')).toHaveLength(
      manifests[ManifestSets.CORE][3].lines.length
    );
    expect(screen.getByRole('textbox', { name: 'title' })).toBeInTheDocument();
    expect(screen.queryByRole('textbox', { name: 'L0' })).not.toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'L1' })).toBeInTheDocument();

    // Buttons
    expect(screen.getByRole('button', { name: 'Previous' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Previous' }));
    expect(mockChangeManuscript).toHaveBeenCalledWith('previous');
    expect(screen.queryByRole('button', { name: 'Next' })).not.toBeInTheDocument();
  });

  it('correctly revalidates a line when user changes from requireSpaces false to true', async () => {
    renderWithAuth(
      <TranscriptionArea
        changeManuscript={mockChangeManuscript}
        numberOfLessons={3}
        lessonNumber={3}
        manifest={manifests[ManifestSets.CORE][3]}
        set={ManifestSets.CORE}
      />
    );
    const user = userEvent.setup();

    // Spaces not required by default
    expect(screen.getByRole('heading', { level: 2, name: 'Lesson 3' })).toBeInTheDocument();
    const requireSpacesCheckbox = screen.getByRole('checkbox', {
      name: 'Require spaces'
    });
    expect(requireSpacesCheckbox).toBeInTheDocument();
    expect(requireSpacesCheckbox).not.toBeChecked();

    const line1 = screen.getByRole('textbox', { name: 'title' });
    await user.type(line1, 'ευαγγελιονκαταμαρκον');

    const checkButtons = screen.getAllByRole('button', { name: 'Check' });
    await user.click(checkButtons[0]);
    expect(screen.getByRole('img', { name: 'correct' })).toBeInTheDocument();

    // Now require spaces
    await user.click(requireSpacesCheckbox);
    expect(requireSpacesCheckbox).toBeChecked();
    expect(screen.queryByRole('img', { name: 'correct' })).not.toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'incorrect' })).toBeInTheDocument();
  });

  it('correctly revalidates a line when user changes from requireSpaces true to false', async () => {
    renderWithAuth(
      <TranscriptionArea
        changeManuscript={mockChangeManuscript}
        numberOfLessons={3}
        lessonNumber={3}
        manifest={manifests[ManifestSets.CORE][3]}
        set={ManifestSets.CORE}
      />
    );
    const user = userEvent.setup();

    // Spaces not required by default
    expect(screen.getByRole('heading', { level: 2, name: 'Lesson 3' })).toBeInTheDocument();
    const requireSpacesCheckbox = screen.getByRole('checkbox', {
      name: 'Require spaces'
    });
    expect(requireSpacesCheckbox).not.toBeChecked();

    // Now require spaces
    await user.click(requireSpacesCheckbox);
    expect(requireSpacesCheckbox).toBeChecked();
    expect(screen.queryByRole('img', { name: 'correct' })).not.toBeInTheDocument();
    expect(screen.queryByRole('img', { name: 'incorrect' })).not.toBeInTheDocument();

    const line1 = screen.getByRole('textbox', { name: 'title' });
    await user.type(line1, 'ευαγγελιον κατα μαρκον');

    const checkButtons = screen.getAllByRole('button', { name: 'Check' });
    await user.click(checkButtons[0]);
    expect(screen.getByRole('img', { name: 'correct' })).toBeInTheDocument();

    // Now unrequire spaces
    await user.click(requireSpacesCheckbox);
    expect(screen.getByRole('img', { name: 'correct' })).toBeInTheDocument();
    expect(screen.queryByRole('img', { name: 'incorrect' })).not.toBeInTheDocument();
  });

  it('hydrates saved progress and shows correct indicators and StatusReport on first render', async () => {
    const set = ManifestSets.CORE;
    const lessonNumber = 1;
    const lesson = manifests[set][lessonNumber];
    const nonTitleLines = lesson.lines.filter(l => !l.isTitle);
    const total = nonTitleLines.length;

    const status: Record<number, LessonStatus> = {};
    for (let i = 1; i <= total; i += 1) {
      status[i] = LessonStatus.INCOMPLETE;
    }
    status[1] = LessonStatus.CORRECT;

    const answers: Record<number, string> = {
      1: nonTitleLines[0].text
    };

    localStorage.setItem(
      `transcribe-progress-${set}-${lessonNumber}`,
      JSON.stringify({
        answers,
        status,
        requireSpaces: false,
        lastUpdated: Date.now()
      })
    );

    renderWithAuth(
      <TranscriptionArea
        changeManuscript={mockChangeManuscript}
        numberOfLessons={Object.keys(manifests[set]).length}
        lessonNumber={lessonNumber}
        manifest={lesson}
        set={set}
      />
    );

    // Wait for async hydration from loadLessonProgressSync
    await waitFor(() => {
      expect(screen.getAllByRole('img', { name: 'correct' })).toHaveLength(1);
    });

    // StatusReport reflects 1 correct (we don't assert totals to avoid coupling)
    expect(screen.getByText(/Correct:\s*1/)).toBeInTheDocument();
  });

  it('hydrates with requireSpaces=true and mixed saved statuses', async () => {
    const set = ManifestSets.CORE;
    const lessonNumber = 3;
    const lesson = manifests[set][lessonNumber];
    const nonTitleLines = lesson.lines.filter(l => !l.isTitle);
    const total = nonTitleLines.length;

    const status: Record<number, LessonStatus> = {};
    for (let i = 1; i <= total; i += 1) {
      status[i] = LessonStatus.INCOMPLETE;
    }
    status[1] = LessonStatus.CORRECT;
    status[2] = LessonStatus.INCORRECT;

    const answers: Record<number, string> = {
      1: nonTitleLines[0].text,
      2: 'wrong answer' // saved answer is actually wrong
    };

    localStorage.setItem(
      `transcribe-progress-${set}-${lessonNumber}`,
      JSON.stringify({
        answers,
        status,
        requireSpaces: true,
        lastUpdated: Date.now()
      })
    );

    renderWithAuth(
      <TranscriptionArea
        changeManuscript={mockChangeManuscript}
        numberOfLessons={Object.keys(manifests[set]).length}
        lessonNumber={lessonNumber}
        manifest={lesson}
        set={set}
      />
    );

    // Wait for async hydration from loadLessonProgressSync
    await waitFor(() => {
      expect(screen.getAllByRole('img', { name: 'correct' })).toHaveLength(1);
      expect(screen.getAllByRole('img', { name: 'incorrect' })).toHaveLength(1);
    });

    // StatusReport reflects mixed state (1 correct, 1 incorrect)
    expect(screen.getByText(/Correct:\s*1/)).toBeInTheDocument();
    expect(screen.getByText(/Incorrect:\s*1/)).toBeInTheDocument();

    const expectedIncomplete = total - 2;
    expect(
      screen.getByText(new RegExp(`Incomplete:\\s*${expectedIncomplete}`))
    ).toBeInTheDocument();
  });

  it('correctly initializes lessonsStatusObj starting at key 1 for lesson without title (no key 0)', async () => {
    const set = ManifestSets.CORE;
    const lessonNumber = 2; // Lesson 2 has no title line
    const lesson = manifests[set][lessonNumber];

    // Ensure localStorage is empty for this lesson
    expect(localStorage.getItem(`transcribe-progress-${set}-${lessonNumber}`)).toBeNull();

    renderWithAuth(
      <TranscriptionArea
        changeManuscript={mockChangeManuscript}
        numberOfLessons={Object.keys(manifests[set]).length}
        lessonNumber={lessonNumber}
        manifest={lesson}
        set={set}
      />
    );

    // Verify no zero index status exists on the new localStorage object
    await waitFor(() => {
      expect(localStorage.getItem(`transcribe-progress-${set}-${lessonNumber}`)).not.toBeNull();
    });
    const storedProgress = localStorage.getItem(`transcribe-progress-${set}-${lessonNumber}`);
    expect(storedProgress).not.toBeNull();
    const parsedLocalStatus = JSON.parse(storedProgress as string).status;
    expect(parsedLocalStatus[0]).toBeUndefined();
    expect(parsedLocalStatus[1]).toBeDefined();

    // Verify no title textbox exists
    expect(screen.queryByRole('textbox', { name: 'title' })).not.toBeInTheDocument();

    // Verify no L0 textbox exists (keys should start at 1)
    expect(screen.queryByRole('textbox', { name: 'L0' })).not.toBeInTheDocument();

    // Verify L1 textbox exists
    expect(screen.getByRole('textbox', { name: 'L1' })).toBeInTheDocument();

    // Count rendered textboxes - should match the number of lines
    const renderedInputs = screen.getAllByRole('textbox');
    expect(renderedInputs).toHaveLength(lesson.lines.length);

    // Verify StatusReport shows correct totals matching the number of lines
    // All lines should be incomplete initially
    const totalLinesRegex = new RegExp(`0 / ${lesson.lines.length} lines correct`);
    expect(screen.getByText(totalLinesRegex)).toBeInTheDocument();
    expect(screen.getByText(/Correct:\s*0/)).toBeInTheDocument();
    expect(screen.getByText(/Incorrect:\s*0/)).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(`Incomplete:\\s*${lesson.lines.length}`))
    ).toBeInTheDocument();
  });
});
