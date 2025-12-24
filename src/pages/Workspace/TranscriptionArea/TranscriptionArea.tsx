import { type ReactElement, useEffect, useRef, useState } from "react";
import { jsPDF } from "jspdf";
import classNames from "classnames";
import { ArrowLeft, ArrowRight, Download } from "react-feather";

import type { Line, Manifest } from "../../../files/manifests";

import { SingleLine } from "./SingleLine/SingleLine";
import styles from "./TranscriptionArea.module.scss";
import { brillBase64 } from "./constants";

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
  const { lines, instruction } = manifest;
  const handleClick = (type: "next" | "previous"): void => {
    changeManuscript(type);
  };

  useEffect(() => {
    transcriptionAreaRef.current.scrollTop = 0;
  }, [lessonNumber]);

  const handleDownloadPDF = (): void => {
    const element = transcriptionAreaRef.current;
    const heading = document.createElement("h1");
    element.style.setProperty("width", "790px");
    heading.style.setProperty("font-size", "28px");
    const headingText = document.createTextNode(
      `Lesson ${lessonNumber} Report`
    );
    heading.appendChild(headingText);
    element.prepend(heading);

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
        element.removeChild(heading);
        element.style.removeProperty("width");
      });
  };

  let titleAdjustments = 0;

  return (
    <div className={styles.Container}>
      <div className={styles.HeaderContainer}>
        <h2 className={styles.Header}>{`Lesson ${lessonNumber}`}</h2>
        <div className={styles.FormSwitch}>
          <input
            type="checkbox"
            id="require_spaces"
            name="require_spaces"
            className={styles.FormSwitch}
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
      <div className={styles.TranscriptionArea} ref={transcriptionAreaRef}>
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
