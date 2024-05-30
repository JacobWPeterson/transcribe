import { type ReactElement, useState } from "react";
import { Form } from "react-bootstrap";
import classNames from "classnames";

import type { Line, Manifest } from "../../../assets/files/manifests";

import { SingleLine } from "./SingleLine";
import styles from "./index.module.scss";

interface TranscriptionAreaProps {
  changeManuscript: (type: "next" | "previous") => void;
  manifest: Manifest;
  manifestLength: number;
  manuscriptId: number;
}

export const TranscriptionArea = ({
  changeManuscript,
  manifest,
  manifestLength,
  manuscriptId,
}: TranscriptionAreaProps): ReactElement => {
  const [requireSpaces, setRequireSpaces] = useState(false);
  const { lines, instruction } = manifest;
  const handleClick = (type: "next" | "previous"): void => {
    changeManuscript(type);
  };

  let titleAdjustments = 0;

  return (
    <div className={styles.Container}>
      <div className={styles.HeaderContainer}>
        <h2 className={styles.Header}>{`Lesson ${manuscriptId}`}</h2>
        <Form>
          <Form.Switch
            className={styles.FormSwitch}
            id="mode-switch"
            label="Require spaces"
            onChange={() => setRequireSpaces(!requireSpaces)}
          />
        </Form>
        <a className="Link" href="/guide" target="_blank">
          Guide
        </a>
      </div>
      {instruction ? (
        <small
          className={styles.Small}
        >{`General instructions: ${instruction}`}</small>
      ) : null}
      <div className={styles.LinesContainer}>
        {lines.map((line: Line, index) => {
          if (line.isTitle) {
            titleAdjustments++;
          }
          return (
            <SingleLine
              key={`line.${index + 1 - titleAdjustments}`}
              passedIndex={index + 1 - titleAdjustments}
              line={line}
              requireSpaces={requireSpaces}
              isTitle={line.isTitle}
            />
          );
        })}
      </div>
      <div className={styles.ButtonsContainer}>
        {manuscriptId > 1 ? (
          <button
            className={classNames(styles.Button, styles.Back)}
            onClick={() => handleClick("previous")}
          >
            Previous
          </button>
        ) : (
          <div />
        )}
        {manuscriptId < manifestLength ? (
          <button className={styles.Button} onClick={() => handleClick("next")}>
            Next
          </button>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
};
