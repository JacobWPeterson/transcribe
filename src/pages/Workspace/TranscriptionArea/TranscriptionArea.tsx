import { type ReactElement, useEffect, useRef, useState } from "react";
import { jsPDF } from "jspdf";
import classNames from "classnames";
import { ArrowLeft, ArrowRight, Download } from "react-feather";

import type { Line, Manifest } from "../../../files/manifests";
import { StatusReport } from "../../../components/StatusReport/StatusReport";
import {
  loadLessonProgress,
  saveLessonProgress,
} from "../../../utils/localStorage";

import { SingleLine } from "./SingleLine/SingleLine";
import styles from "./TranscriptionArea.module.scss";
import { brillBase64 } from "./constants";
import { LessonStatus } from "./SingleLine/singleLine.enum";

interface TranscriptionAreaProps {
  changeManuscript: (type: "next" | "previous") => void;
  lessonNumber: number;
  manifest: Manifest;
  numberOfLessons: number;
}

export const TranscriptionArea = ({
  changeManuscript,
  lessonNumber,
  manifest,
  numberOfLessons,
}: TranscriptionAreaProps): ReactElement => {
  const [requireSpaces, setRequireSpaces] = useState(false);
  const transcriptionAreaRef = useRef<HTMLDivElement>(null);
  const inputContainerRef = useRef<HTMLDivElement>(null);
  const { lines, instruction } = manifest;
  const [lessonsStatus, setLessonsStatus] =
    useState<Record<number, LessonStatus>>(null);

  const [savedAnswers, setSavedAnswers] = useState<Record<number, string>>({});

  useEffect(() => {
    // Load saved progress for this lesson
    const savedProgress = loadLessonProgress(lessonNumber);
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
    inputContainerRef.current.scrollTop = 0;
  }, [lessonNumber, lines]);

  // Save progress whenever it changes
  useEffect(() => {
    if (lessonsStatus) {
      const progress = {
        answers: savedAnswers,
        status: lessonsStatus,
        requireSpaces,
        lastUpdated: Date.now(),
      };
      saveLessonProgress(lessonNumber, progress);
    }
  }, [lessonNumber, lessonsStatus, savedAnswers, requireSpaces]);

  const handleClick = (type: "next" | "previous"): void => {
    changeManuscript(type);
  };

  const handleUpdateLessonStatus = (
    index: number,
    status: LessonStatus
  ): void => {
    setLessonsStatus(
      (
        prevStatus: Record<number, LessonStatus>
      ): Record<number, LessonStatus> => {
        return { ...prevStatus, [index]: status };
      }
    );
  };

  const handleSaveAnswer = (index: number, answer: string): void => {
    setSavedAnswers((prev) => ({ ...prev, [index]: answer }));
  };

  const handleDownloadPDF = (): void => {
    const element = transcriptionAreaRef.current;
    element.style.setProperty("width", "790px");

    const pdf = new jsPDF({ format: "a4" });
    pdf.addFileToVFS("Brill-Roman.ttf", brillBase64);
    pdf.addFont("Brill-Roman.ttf", "Brill-Roman", "normal");
    pdf.setFont("Brill-Roman");
    pdf.setProperties({ title: `Lesson ${lessonNumber} Report` });

    pdf
      .html(element, {
        margin: [10, 7, 10, 7],
        html2canvas: {
          scale: 0.25,
          ignoreElements: ({ id }) =>
            id === "prevButton" ||
            id === "downloadButton" ||
            id === "nextButton",
        },
      })
      .then(() => {
        pdf.output("pdfobjectnewwindow");
      })
      .finally(() => {
        element.style.removeProperty("width");
      });
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
                savedAnswer={savedAnswers[index]}
                savedStatus={lessonsStatus?.[index]}
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
              onClick={() => handleClick("previous")}
              id="prevButton"
            >
              <ArrowLeft size={18} />
            </button>
          ) : (
            <div className={styles.DummyButton} />
          )}
          <button
            className={classNames(styles.Button, styles.Download)}
            onClick={handleDownloadPDF}
            id="downloadButton"
          >
            Report
            <Download className={styles.DownloadIcon} size={14} />
          </button>
          {lessonNumber < numberOfLessons ? (
            <button
              aria-label="Next"
              className={styles.Button}
              onClick={() => handleClick("next")}
              id="nextButton"
            >
              <ArrowRight size={18} />
            </button>
          ) : (
            <div className={styles.DummyButton} />
          )}
        </div>
      </div>
    </div>
  );
};
