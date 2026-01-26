import { type ReactElement, useMemo } from 'react';
import { Link } from 'react-router';

import type { Manifest } from '../../files/manifests';
import manifests, { ManifestSets } from '../../files/manifests';
import { loadLessonProgress } from '../../utils/localStorage';
import { LessonStatus } from '../Workspace/TranscriptionArea/SingleLine/singleLine.enum';
import { buildDefaultLessonStatus } from '../../utils/lessonStatus';

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
}

const computeLessonSummary = (lessonId: string, manifest: Manifest): LessonProgressSummary => {
  const saved = loadLessonProgress(ManifestSets.CORE, Number(lessonId));
  const statusMap = saved?.status ?? buildDefaultLessonStatus(manifest.lines);
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
    incorrectPercent
  };
};

export const Dashboard = (): ReactElement => {
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

  return (
    <div className={styles.Wrapper}>
      <div className={styles.Contents}>
        <h1 className={styles.Title}>Progress Dashboard</h1>
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
              <Link to={`/lessons/${lesson.lessonId}`} className={styles.LessonTitle}>
                Lesson {lesson.lessonId}
              </Link>
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
  );
};
