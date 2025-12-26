import { type ReactElement } from "react";

import { LessonStatus } from "../../pages/Workspace/TranscriptionArea/SingleLine/singleLine.enum";

import styles from "./StatusReport.module.scss";

interface StatusReportProps {
  lessonsStatus: Record<number, LessonStatus>;
}

export const StatusReport = ({
  lessonsStatus,
}: StatusReportProps): ReactElement => {
  if (!lessonsStatus) {
    return;
  }
  const totalLines = Object.keys(lessonsStatus)?.length;
  const correctLines = Object.values(lessonsStatus).filter(
    (status) => status === LessonStatus.CORRECT,
  ).length;
  const incorrectLines = Object.values(lessonsStatus).filter(
    (status) => status === LessonStatus.INCORRECT,
  ).length;
  const incompleteLines = Object.values(lessonsStatus).filter(
    (status) => status === LessonStatus.INCOMPLETE,
  ).length;

  const correctPercentage =
    totalLines > 0 ? (correctLines / totalLines) * 100 : 0;
  const incorrectPercentage =
    totalLines > 0 ? (incorrectLines / totalLines) * 100 : 0;

  return (
    <div className={styles.StatusReport}>
      <div className={styles.ProgressContainer}>
        <div className={styles.ProgressBar}>
          <div
            className={styles.ProgressFillCorrect}
            style={{ width: `${correctPercentage}%` }}
          />
          <div
            className={styles.ProgressFillIncorrect}
            style={{
              width: `${incorrectPercentage}%`,
              left: `${correctPercentage}%`,
            }}
          />
        </div>
        <div className={styles.ProgressText}>
          {correctLines} / {totalLines} lines correct (
          {Math.round(correctPercentage)}%)
        </div>
      </div>
      <div className={styles.StatusIndicators}>
        <div className={styles.StatusItem}>
          <div className={styles.StatusDot} data-status="correct" />
          <span>Correct: {correctLines}</span>
        </div>
        <div className={styles.StatusItem}>
          <div className={styles.StatusDot} data-status="incorrect" />
          <span>Incorrect: {incorrectLines}</span>
        </div>
        <div className={styles.StatusItem}>
          <div className={styles.StatusDot} data-status="incomplete" />
          <span>Incomplete: {incompleteLines}</span>
        </div>
      </div>
    </div>
  );
};
