import { type ReactElement, useEffect, useRef, useState } from "react";
import classNames from "classnames";

import type { Line, Manifest } from "../../../files/manifests";

import { SingleLine } from "./SingleLine/SingleLine";
import styles from "./TranscriptionArea.module.scss";

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
              className={classNames(styles.Button, styles.Back)}
              onClick={() => handleClick("previous")}
            >
              Previous
            </button>
          ) : (
            <div />
          )}
          {lessonNumber < numberOfLessons ? (
            <button
              className={styles.Button}
              onClick={() => handleClick("next")}
            >
              Next
            </button>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
};
