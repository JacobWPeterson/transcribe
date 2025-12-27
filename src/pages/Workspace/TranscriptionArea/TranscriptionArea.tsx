import { type ReactElement, useCallback, useEffect, useRef, useState } from 'react';
import { jsPDF } from 'jspdf';
import classNames from 'classnames';
import { ArrowLeft, ArrowRight, Download } from 'react-feather';

import type { Line, Manifest, ManifestSets } from '../../../files/manifests';
import { StatusReport } from '../../../components/StatusReport/StatusReport';
import {
  LocalStorageErrorBoundary,
  PDFErrorBoundary
} from '../../../components/ErrorBoundary/SpecializedErrorBoundaries';
import { loadLessonProgress, saveLessonProgress } from '../../../utils/localStorage';

import { SingleLine } from './SingleLine/SingleLine';
import styles from './TranscriptionArea.module.scss';
import { brillBase64 } from './constants';
import { LessonStatus } from './SingleLine/singleLine.enum';

interface TranscriptionAreaProps {
  changeManuscript: (type: 'next' | 'previous') => void;
  lessonNumber: number;
  manifest: Manifest;
  numberOfLessons: number;
  set: ManifestSets;
}

export const TranscriptionArea = ({
  changeManuscript,
  lessonNumber,
  manifest,
  numberOfLessons,
  set
}: TranscriptionAreaProps): ReactElement => {
  const [requireSpaces, setRequireSpaces] = useState(false);
  const transcriptionAreaRef = useRef<HTMLDivElement>(null);
  const inputContainerRef = useRef<HTMLDivElement>(null);
  const debounceTimeoutRef = useRef<NodeJS.Timeout>(null);
  const { lines, instruction } = manifest;
  const [lessonsStatus, setLessonsStatus] = useState<Record<number, LessonStatus>>(null);

  const [savedAnswers, setSavedAnswers] = useState<Record<number, string>>({});

  // Debounced save function
  const debouncedSave = useCallback(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    debounceTimeoutRef.current = setTimeout(() => {
      if (lessonsStatus) {
        const progress = {
          answers: savedAnswers,
          status: lessonsStatus,
          requireSpaces,
          lastUpdated: Date.now()
        };
        try {
          saveLessonProgress(set, lessonNumber, progress);
        } catch (error) {
          console.error('Error saving lesson progress:', error);
          // Could show a user notification here, but since we have error boundaries, the LocalStorageErrorBoundary will catch this
        }
      }
    }, 500);
  }, [set, lessonNumber, lessonsStatus, savedAnswers, requireSpaces]);

  useEffect(() => {
    // Load saved progress for this lesson
    try {
      const savedProgress = loadLessonProgress(set, lessonNumber);
      if (savedProgress && Object.entries(savedProgress.answers).length) {
        setLessonsStatus(savedProgress.status);
        setSavedAnswers(savedProgress.answers);
        setRequireSpaces(savedProgress.requireSpaces);
      } else {
        // Initialize with default values if no saved progress
        const lessonsStatusObj = lines.reduce(
          (obj, _, index) => ({ ...obj, [index]: LessonStatus.INCOMPLETE }),
          {}
        );
        setLessonsStatus(lessonsStatusObj);
        setSavedAnswers({});
        setRequireSpaces(false);
      }
    } catch (error) {
      console.error('Error loading lesson progress:', error);
      // Initialize with default values if loading failed
      const lessonsStatusObj = lines.reduce(
        (obj, _, index) => ({ ...obj, [index]: LessonStatus.INCOMPLETE }),
        {}
      );
      setLessonsStatus(lessonsStatusObj);
      setSavedAnswers({});
      setRequireSpaces(false);
    }
    if (inputContainerRef.current) {
      inputContainerRef.current.scrollTop = 0;
    }
  }, [set, lessonNumber, lines]);

  // Save progress with debouncing whenever it changes
  useEffect(() => {
    debouncedSave();
    // Cleanup timeout on unmount or dependency change
    return (): void => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [debouncedSave]);

  const handleClick = (type: 'next' | 'previous'): void => {
    changeManuscript(type);
  };

  const handleUpdateLessonStatus = (index: number, status: LessonStatus): void => {
    setLessonsStatus((prevStatus: Record<number, LessonStatus>): Record<number, LessonStatus> => {
      return { ...prevStatus, [index]: status };
    });
  };

  const handleSaveAnswer = (index: number, answer: string): void => {
    setSavedAnswers(prev => ({ ...prev, [index]: answer }));
  };

  const handleDownloadPDF = (): void => {
    try {
      const element = transcriptionAreaRef.current;
      if (!element) {
        throw new Error('Transcription area element not found');
      }

      element.style.setProperty('width', '790px');

      const pdf = new jsPDF({ format: 'a4' });
      pdf.addFileToVFS('Brill-Roman.ttf', brillBase64);
      pdf.addFont('Brill-Roman.ttf', 'Brill-Roman', 'normal');
      pdf.setFont('Brill-Roman');
      pdf.setProperties({ title: `Lesson ${lessonNumber} Report` });

      pdf
        .html(element, {
          margin: [10, 7, 10, 7],
          html2canvas: {
            scale: 0.25,
            ignoreElements: ({ id }) =>
              id === 'prevButton' || id === 'downloadButton' || id === 'nextButton'
          }
        })
        .then(() => {
          pdf.output('pdfobjectnewwindow');
        })
        .catch(error => {
          console.error('PDF generation error:', error);
          throw new Error(`Failed to generate PDF: ${error.message || 'Unknown error'}`);
        })
        .finally(() => {
          element.style.removeProperty('width');
        });
    } catch (error) {
      console.error('PDF download error:', error);
      throw error; // Let the error boundary handle it
    }
  };

  let titleAdjustments = 0;

  return (
    <div className={styles.Container} ref={transcriptionAreaRef}>
      <div className={styles.HeaderContainer}>
        <h2 className={styles.Header}>{`Lesson ${lessonNumber}`}</h2>
        <div className={styles.FormSwitch}>
          <input
            type="checkbox"
            id="require_spaces"
            name="require_spaces"
            className={styles.FormSwitch}
            checked={requireSpaces}
            onChange={() => setRequireSpaces(!requireSpaces)}
          />
          <label htmlFor="require_spaces">Require spaces</label>
        </div>
        <a className="Link" href="/guide" target="_blank">
          Guide
        </a>
      </div>
      {instruction ? (
        <small className={styles.Small}>
          <b>General instructions</b>
          {`: ${instruction}`}
        </small>
      ) : null}
      <LocalStorageErrorBoundary>
        {<StatusReport lessonsStatus={lessonsStatus} />}
        <div className={styles.TranscriptionArea} ref={inputContainerRef}>
          <div className={styles.LinesContainer}>
            {lines.map((line: Line, index) => {
              if (line.isTitle) {
                titleAdjustments++;
              }
              return (
                <SingleLine
                  key={`${lessonNumber}-line.${index + 1 - titleAdjustments}`}
                  passedIndex={index + 1 - titleAdjustments}
                  line={line}
                  requireSpaces={requireSpaces}
                  updateLessonStatus={handleUpdateLessonStatus}
                  savedAnswer={savedAnswers[index + 1 - titleAdjustments]}
                  savedStatus={lessonsStatus?.[index + 1 - titleAdjustments]}
                  onSaveAnswer={handleSaveAnswer}
                />
              );
            })}
          </div>
          <div className={styles.ButtonsContainer}>
            {lessonNumber > 1 ? (
              <button
                aria-label="Previous"
                className={styles.Button}
                onClick={() => handleClick('previous')}
                id="prevButton"
              >
                <ArrowLeft size={18} />
              </button>
            ) : (
              <div className={styles.DummyButton} />
            )}
            <PDFErrorBoundary>
              <button
                className={classNames(styles.Button, styles.Download)}
                onClick={handleDownloadPDF}
                id="downloadButton"
              >
                Report
                <Download className={styles.DownloadIcon} size={14} />
              </button>
            </PDFErrorBoundary>
            {lessonNumber < numberOfLessons ? (
              <button
                aria-label="Next"
                className={styles.Button}
                onClick={() => handleClick('next')}
                id="nextButton"
              >
                <ArrowRight size={18} />
              </button>
            ) : (
              <div className={styles.DummyButton} />
            )}
          </div>
        </div>
      </LocalStorageErrorBoundary>
    </div>
  );
};
