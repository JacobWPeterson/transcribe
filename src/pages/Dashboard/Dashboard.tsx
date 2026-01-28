import { type ReactElement, useMemo, useRef, useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Download } from 'react-feather';
import { jsPDF } from 'jspdf';

import { useTheme } from '../../contexts/ThemeContext';
import type { Manifest } from '../../files/manifests';
import manifests, { ManifestSets } from '../../files/manifests';
import { CELEBRATION_SHOWN_KEY, loadLessonProgress } from '../../utils/localStorage';
import { LessonStatus } from '../Workspace/TranscriptionArea/SingleLine/singleLine.enum';
import { buildDefaultLessonStatus } from '../../utils/lessonStatus';
import { PDFErrorBoundary } from '../../components/ErrorBoundary/SpecializedErrorBoundaries';
import { Confetti } from '../../components/Confetti/Confetti';

import styles from './Dashboard.module.scss';

interface LessonProgressSummary {
  lessonId: string;
  total: number;
  correct: number;
  incorrect: number;
  incomplete: number;
  percent: number;
  correctPercent: number;
  incorrectPercent: number;
  requiredSpaces: boolean;
}

const computeLessonSummary = (lessonId: string, manifest: Manifest): LessonProgressSummary => {
  const saved = loadLessonProgress(ManifestSets.CORE, Number(lessonId));

  const statusMap = saved?.status ?? buildDefaultLessonStatus(manifest.lines);
  const requiredSpaces = saved?.requireSpaces || false;
  const total = Object.keys(statusMap).length;
  const values = Object.values(statusMap);
  const correct = values.filter(v => v === LessonStatus.CORRECT).length;
  const incorrect = values.filter(v => v === LessonStatus.INCORRECT).length;
  const incomplete = values.filter(v => v === LessonStatus.INCOMPLETE).length;
  const percent = total > 0 ? Math.round((correct / total) * 100) : 0;
  const correctPercent = total > 0 ? (correct / total) * 100 : 0;
  const incorrectPercent = total > 0 ? (incorrect / total) * 100 : 0;

  return {
    lessonId,
    total,
    correct,
    incorrect,
    incomplete,
    percent,
    correctPercent,
    incorrectPercent,
    requiredSpaces
  };
};

export const Dashboard = (): ReactElement => {
  const { settings } = useTheme();
  const dashboardRef = useRef<HTMLDivElement>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  // Check localStorage on mount to see if celebration was already shown
  const [hasShownConfetti] = useState(() => {
    try {
      return localStorage.getItem(CELEBRATION_SHOWN_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const handleDownloadPDF = (): void => {
    try {
      const element = dashboardRef.current;
      if (!element) {
        throw new Error('Dashboard element not found');
      }

      const pdf = new jsPDF({ format: 'a4' });
      pdf.setProperties({ title: 'Progress Dashboard Report' });

      pdf
        .html(element, {
          margin: [10, 7, 10, 7],
          html2canvas: {
            scale: 0.25,
            ignoreElements: ({ id }) => id === 'downloadButton'
          }
        })
        .then(() => {
          pdf.output('pdfobjectnewwindow');
        })
        .catch(error => {
          console.error('PDF generation error:', error);
          throw new Error(`Failed to generate PDF: ${error.message || 'Unknown error'}`);
        });
    } catch (error) {
      console.error('PDF download error:', error);
      throw error;
    }
  };

  const data = useMemo(() => {
    const lessons = Object.keys(manifests[ManifestSets.CORE]).map(id =>
      computeLessonSummary(id, manifests[ManifestSets.CORE][id])
    );

    const totals = lessons.reduce(
      (acc, cur) => {
        acc.total += cur.total;
        acc.correct += cur.correct;
        acc.incorrect += cur.incorrect;
        acc.incomplete += cur.incomplete;
        return acc;
      },
      { total: 0, correct: 0, incorrect: 0, incomplete: 0 }
    );

    const overallPercent = totals.total ? Math.round((totals.correct / totals.total) * 100) : 0;

    return {
      lessons,
      totals: {
        ...totals,
        percent: overallPercent
      }
    };
  }, []);

  // Trigger confetti celebration when 100% is reached
  useEffect((): void => {
    if (data.totals.percent === 100 && data.totals.total > 0 && !hasShownConfetti) {
      setShowConfetti(true);
      // Save to localStorage so celebration only shows once
      try {
        localStorage.setItem(CELEBRATION_SHOWN_KEY, 'true');
      } catch (error) {
        console.warn('Failed to save celebration shown status:', error);
      }
    }
  }, [data.totals.percent, data.totals.total, hasShownConfetti]);

  return (
    <>
      <Confetti show={showConfetti} onClose={() => setShowConfetti(false)} />
      <div className={styles.Wrapper}>
        <div className={styles.Contents} ref={dashboardRef}>
          <div className={styles.HeaderRow}>
            <h1 className={styles.Title}>Progress Dashboard</h1>
            <PDFErrorBoundary>
              <button
                className={styles.DownloadButton}
                onClick={handleDownloadPDF}
                id="downloadButton"
              >
                Report
                <Download
                  className={styles.DownloadIcon}
                  size={settings.fontSize === 'L' ? 20 : 16}
                />
              </button>
            </PDFErrorBoundary>
          </div>
          <div className={styles.Summary}>
            <div className={styles.SummaryCard} data-status="correct">
              <div>Correct</div>
              <strong>{data.totals.correct}</strong>
            </div>
            <div className={styles.SummaryCard} data-status="incorrect">
              <div>Incorrect</div>
              <strong>{data.totals.incorrect}</strong>
            </div>
            <div className={styles.SummaryCard}>
              <div>Incomplete</div>
              <strong>{data.totals.incomplete}</strong>
            </div>
            <div className={styles.SummaryCard}>
              <div>Overall</div>
              <strong>{`${data.totals.percent}%`}</strong>
              <span>{` (${data.totals.correct} / ${data.totals.total})`}</span>
            </div>
          </div>
          <section className={styles.Section}>
            <h2 className={styles.SectionTitle}>Lessons</h2>
            {data.lessons.map(lesson => (
              <div className={styles.LessonCard} key={lesson.lessonId}>
                <div className={styles.LessonHeader}>
                  <Link to={`/lessons/${lesson.lessonId}`} className={styles.LessonTitle}>
                    Lesson {lesson.lessonId}
                  </Link>
                  {lesson.requiredSpaces && (
                    <div className={styles.RequiredSpaces}>
                      <img
                        height={settings.fontSize === 'L' ? 18 : 14}
                        src="/icons/check-circle.png"
                        alt="correct"
                      />{' '}
                      Required spaces
                    </div>
                  )}
                </div>
                <div className={styles.ProgressText}>
                  {lesson.correct} / {lesson.total} lines correct ({Math.round(lesson.percent)}%)
                </div>
                <div className={styles.BarTrack} aria-hidden="true">
                  <div
                    className={styles.BarFillCorrect}
                    style={{ width: `${lesson.correctPercent}%` }}
                  />
                  <div
                    className={styles.BarFillIncorrect}
                    style={{
                      width: `${lesson.incorrectPercent}%`,
                      left: `${lesson.correctPercent}%`
                    }}
                  />
                </div>
                <div className={styles.StatusIndicators}>
                  <div className={styles.StatusItem}>
                    <div className={styles.StatusDot} data-status="correct" />
                    <span>Correct: {lesson.correct}</span>
                  </div>
                  <div className={styles.StatusItem}>
                    <div className={styles.StatusDot} data-status="incorrect" />
                    <span>Incorrect: {lesson.incorrect}</span>
                  </div>
                  <div className={styles.StatusItem}>
                    <div className={styles.StatusDot} data-status="incomplete" />
                    <span>Incomplete: {lesson.incomplete}</span>
                  </div>
                </div>
              </div>
            ))}
          </section>
        </div>
      </div>
    </>
  );
};
