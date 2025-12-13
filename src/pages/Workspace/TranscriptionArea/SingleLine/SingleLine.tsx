import type { ChangeEvent, FormEvent, ReactElement } from "react";
import { useEffect, useRef, useState } from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import pluralize from "pluralize";
import classnames from "classnames";

import glosses from "../../../../files/glosses";
import type { Line } from "../../../../files/manifests";
import { Badge } from "../../../../components/Badge/Badge";
import { BadgeTypes } from "../../../../components/Badge/badge.enum";
import evaluateSubmission from "../validators";

import styles from "./SingleLine.module.scss";

interface SingleLineProps {
  line: Line;
  passedIndex: number;
  requireSpaces?: boolean;
}

const includesNonGreekChars = (text: string): boolean => {
  return !!text.match(/[^Α-Ωα-ωϛ\s]/g)?.length;
};

export const SingleLine = ({
  line,
  passedIndex,
  requireSpaces = false,
}: SingleLineProps): ReactElement => {
  const [lineContent, setLineContent] = useState<string>("");
  const [submissionStatus, setSubmissionStatus] =
    useState<(boolean | string)[]>(null);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [showAnswerEvaluation, setShowAnswerEvaluation] =
    useState<boolean>(false);
  const guesses = useRef(0);
  const hasNonGreekChars = includesNonGreekChars(lineContent);

  useEffect(() => {
    if (lineContent.length > 0 && submissionStatus?.[0]) {
      guesses.current = 0;
      setShowHint(false);
      return;
    }
    /* On the offchance they got all the letters and were seeing the hint,
     * but then deleted a letter, this turns off the hint icon. This also
     * has the effect of re-rendering the hint tooltip when it eligible again.
     */
    if (
      requireSpaces
        ? lineContent?.length !== line.text.length
        : lineContent.replace(/\s/g, "").length !==
          line.text.replace(/\s/g, "").length
    ) {
      setShowHint(false);
      return;
    }
    /*
     * To get here, guess must be incorrect but correct length.
     * To get a hint they must have correctly identified the number of letters.
     */
    guesses.current += 1;
    if (!showHint && guesses.current >= 3) {
      setShowHint(true);
    }
  }, [submissionStatus, line.text, requireSpaces]);

  useEffect(() => {
    if (!lineContent) {
      return;
    }
    setSubmissionStatus(
      evaluateSubmission(lineContent, line.text, requireSpaces)
    );
  }, [requireSpaces]);

  const clearMessages = (): void => {
    setShowHint(false);
    setShowAnswerEvaluation(false);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    event.persist();
    setLineContent(event.target.value);
    clearMessages();
  };

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();
    setSubmissionStatus(
      evaluateSubmission(lineContent, line.text, requireSpaces)
    );
    setShowAnswerEvaluation(true);
  };

  const renderAnswerEvaluation = (): ReactElement =>
    submissionStatus?.[0] === false ? (
      <OverlayTrigger
        key="error-tooltip"
        placement="top"
        rootClose
        transition
        trigger={["hover", "focus", "click"]}
        overlay={
          <Popover id="popover-error">
            <Popover.Body>{submissionStatus[1]}</Popover.Body>
          </Popover>
        }
      >
        <span>
          <Badge type={BadgeTypes.ERROR}>X</Badge>
        </span>
      </OverlayTrigger>
    ) : (
      <Badge type={BadgeTypes.SUCCESS}>✓</Badge>
    );

  const getHint = (guess: string, answer: string): string => {
    const reformattedAnswer = requireSpaces
      ? answer
      : answer.replace(/\s/g, "");
    const reformattedGuess = requireSpaces
      ? guess.replace(/ς|ϲ/gi, "σ").toLowerCase()
      : guess.replace(/\s/g, "").replace(/ς|ϲ/gi, "σ").toLowerCase();
    const mismatches = [];
    for (let i = 0; i < reformattedGuess.length; i += 1) {
      if (reformattedGuess[i] !== reformattedAnswer[i]) {
        mismatches.push(`${reformattedGuess[i]}(${i + 1})`);
      }
    }
    return `Incorrect ${pluralize("letter", mismatches.length)}: ${[...mismatches].join(", ")}.`;
  };

  const hint = (): ReactElement => (
    <OverlayTrigger
      key={`hint-for-line-${passedIndex}`}
      placement="top"
      rootClose
      transition
      trigger={["hover", "focus", "click"]}
      overlay={
        <Popover id="popover-hint">
          <Popover.Body>{getHint(lineContent, line.text)}</Popover.Body>
        </Popover>
      }
    >
      <span>
        <Badge>?</Badge>
      </span>
    </OverlayTrigger>
  );

  const titleHelp = (): ReactElement => (
    <OverlayTrigger
      key={`title-help`}
      placement="auto"
      rootClose
      transition
      trigger={["hover", "focus", "click"]}
      overlay={
        <Popover id="popover-hint">
          <Popover.Body>
            {/* eslint-disable-next-line max-len */}
            Titles can be plain or feature elaborate patterns. Titles often
            feature ligatures and abbreviations and can be much more difficult
            to read, so don&apos;t worry about them as much early on. Type them
            as a single line.
          </Popover.Body>
        </Popover>
      }
    >
      <span>
        <Badge small>T</Badge>
      </span>
    </OverlayTrigger>
  );

  return (
    <form
      className={classnames(styles.Form, {
        [styles.HasHelpText]:
          hasNonGreekChars || line.newConcept || line.caption,
      })}
      onSubmit={(e): void => handleSubmit(e)}
    >
      <div className={styles.Upper}>
        <label
          className={styles.Label}
          htmlFor={line.isTitle ? "title" : `Line ${passedIndex}`}
          style={{ display: "flex", alignItems: "center", marginTop: "3px" }}
        >
          {line.isTitle ? titleHelp() : `L${passedIndex}`}
        </label>
        <div className={styles.InputWrapper}>
          <input
            className={styles.Input}
            id={line.isTitle ? "title" : `Line ${passedIndex}`}
            type="text"
            value={lineContent}
            onChange={handleChange}
            autoComplete="off"
          />
        </div>
        <div className={styles.PostInputItemsContainer}>
          <button
            className={styles.Button}
            disabled={!lineContent.trim()}
            type="submit"
          >
            Check
          </button>
          {showAnswerEvaluation && !showHint && renderAnswerEvaluation()}
          {showHint && hint()}
        </div>
      </div>
      {(hasNonGreekChars || line.newConcept || line.caption) && (
        <div className={styles.Lower}>
          {hasNonGreekChars && (
            <small className={classnames(styles.Small, styles.Error)}>
              Non-Greek characters have been detected
            </small>
          )}
          {!hasNonGreekChars && (line.newConcept || line.caption) && (
            <small className={styles.Small}>
              {line.newConcept && (
                <>
                  <i>{`New concept: ${line.newConcept}. `}</i>
                  {glosses?.[line.newConcept]?.short}
                  &nbsp;
                  {glosses?.[line.newConcept]?.long && (
                    <>
                      <a
                        className="Link"
                        href={`/glossary#${line.newConcept}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Learn more
                      </a>
                      {line?.caption && <>.&nbsp;</>}
                    </>
                  )}
                </>
              )}
              {line?.caption}
            </small>
          )}
        </div>
      )}
    </form>
  );
};
