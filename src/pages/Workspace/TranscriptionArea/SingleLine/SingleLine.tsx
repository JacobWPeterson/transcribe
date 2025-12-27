import type { ChangeEvent, FormEvent, ReactElement } from 'react';
import { useEffect, useRef, useState } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import pluralize from 'pluralize';
import classnames from 'classnames';

import glosses from '../../../../files/glosses';
import type { Line } from '../../../../files/manifests';
import evaluateSubmission from '../validators';

import styles from './SingleLine.module.scss';
import { LessonStatus } from './singleLine.enum';

interface SingleLineProps {
  line: Line;
  passedIndex: number;
  requireSpaces?: boolean;
  updateLessonStatus: (index: number, status: LessonStatus) => void;
  savedAnswer?: string;
  savedStatus?: LessonStatus;
  onSaveAnswer?: (index: number, answer: string) => void;
}

const NON_GREEK_CHARS_REGEX = /[^Α-Ωα-ωϛ\s]/g;

const includesNonGreekChars = (text: string): boolean => {
  return !!text.match(NON_GREEK_CHARS_REGEX)?.length;
};

export const SingleLine = ({
  line,
  passedIndex,
  requireSpaces = false,
  updateLessonStatus,
  savedAnswer,
  savedStatus,
  onSaveAnswer
}: SingleLineProps): ReactElement => {
  const [lineContent, setLineContent] = useState<string>(savedAnswer || '');
  const [submissionStatus, setSubmissionStatus] = useState<(boolean | string)[]>(null);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [showAnswerEvaluation, setShowAnswerEvaluation] = useState<boolean>(false);
  const guesses = useRef(0);
  const hasNonGreekChars = includesNonGreekChars(lineContent);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLineContent(savedAnswer || '');
  }, [savedAnswer]);

  // Set submission status from saved status when available, or reset when no saved data
  useEffect(() => {
    if (savedAnswer) {
      // Convert LessonStatus enum to submission status format
      const isCorrect = savedStatus === LessonStatus.CORRECT;
      const message = isCorrect ? 'correct' : 'Answer is incorrect.';
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSubmissionStatus([isCorrect, message]);
      setShowAnswerEvaluation(true);
    } else {
      // Reset status when no saved data is available for this line
      setSubmissionStatus(null);
      setShowAnswerEvaluation(false);
    }
  }, [savedAnswer]);

  useEffect(() => {
    if (lineContent.length > 0 && submissionStatus?.[0]) {
      guesses.current = 0;
      // eslint-disable-next-line react-hooks/set-state-in-effect
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
        : lineContent.replace(/\s/g, '').length !== line.text.replace(/\s/g, '').length
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

  const prevRequireSpacesRef = useRef(requireSpaces);

  useEffect(() => {
    // Only re-evaluate when requireSpaces changes
    if (prevRequireSpacesRef.current !== requireSpaces && savedAnswer) {
      const submissionStatus = evaluateSubmission(savedAnswer, line.text, requireSpaces);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSubmissionStatus(submissionStatus);
      updateLessonStatus(passedIndex, Number(submissionStatus[0]));
    }
    prevRequireSpacesRef.current = requireSpaces;
  }, [requireSpaces, savedAnswer, line.text, passedIndex]);

  const clearMessages = (): void => {
    setShowHint(false);
    setShowAnswerEvaluation(false);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    event.persist();
    setLineContent(event.target.value);
    updateLessonStatus(passedIndex, LessonStatus.INCOMPLETE);
    clearMessages();
  };

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();
    const submissionStatus = evaluateSubmission(lineContent, line.text, requireSpaces);
    setSubmissionStatus(submissionStatus);
    updateLessonStatus(passedIndex, Number(submissionStatus[0])); // This Number cast works because of the enum order in singleLine.enum.ts
    // Save the answer to localStorage
    onSaveAnswer?.(passedIndex, lineContent);

    setShowAnswerEvaluation(true);
  };

  const renderAnswerEvaluation = (): ReactElement =>
    submissionStatus?.[0] === false ? (
      <OverlayTrigger
        key="error-tooltip"
        placement="top"
        rootClose
        transition
        trigger={['hover', 'focus', 'click']}
        overlay={
          <Popover id="popover-error">
            <Popover.Body>{submissionStatus[1]}</Popover.Body>
          </Popover>
        }
      >
        <div role="button" tabIndex={0}>
          <img src="/icons/x-octagon.png" alt="incorrect" />
        </div>
      </OverlayTrigger>
    ) : (
      <img src="/icons/check-circle.png" alt="correct" />
    );

  const getHint = (guess: string, answer: string): string => {
    const reformattedAnswer = requireSpaces ? answer : answer.replace(/\s/g, '');
    const reformattedGuess = requireSpaces
      ? guess.replace(/ς|ϲ/gi, 'σ').toLowerCase()
      : guess.replace(/\s/g, '').replace(/ς|ϲ/gi, 'σ').toLowerCase();
    const mismatches = [];
    for (let i = 0; i < reformattedGuess.length; i += 1) {
      if (reformattedGuess[i] !== reformattedAnswer[i]) {
        mismatches.push(`${reformattedGuess[i]}(${i + 1})`);
      }
    }
    return `Incorrect ${pluralize('letter', mismatches.length)}: ${[...mismatches].join(', ')}.`;
  };

  const hint = (): ReactElement => (
    <OverlayTrigger
      key={`hint-for-line-${passedIndex}`}
      placement="top"
      rootClose
      transition
      trigger={['hover', 'focus', 'click']}
      overlay={
        <Popover id="popover-hint">
          <Popover.Body>{getHint(lineContent, line.text)}</Popover.Body>
        </Popover>
      }
    >
      <div role="button" tabIndex={0}>
        <img src="/icons/help-circle.png" alt="help" />
      </div>
    </OverlayTrigger>
  );

  const titleHelp = (): ReactElement => (
    <OverlayTrigger
      key={`title-help`}
      placement="auto"
      rootClose
      transition
      trigger={['hover', 'focus', 'click']}
      overlay={
        <Popover id="popover-hint">
          <Popover.Body>
            {/* eslint-disable-next-line max-len */}
            Titles can be plain or feature elaborate patterns. Titles often feature ligatures and
            abbreviations and can be much more difficult to read, so don&apos;t worry about them as
            much early on. Type them as a single line.
          </Popover.Body>
        </Popover>
      }
    >
      <div role="button" tabIndex={0}>
        <img src="/icons/type.png" alt="title" />
      </div>
    </OverlayTrigger>
  );

  return (
    <form
      className={classnames(styles.Form, {
        [styles.HasHelpText]: hasNonGreekChars || line.newConcept || line.caption
      })}
      onSubmit={(e): void => handleSubmit(e)}
    >
      <div className={styles.Upper}>
        <label
          className={styles.Label}
          htmlFor={line.isTitle ? 'title' : `Line ${passedIndex}`}
          style={{ display: 'flex', alignItems: 'center', marginTop: '3px' }}
        >
          {line.isTitle ? titleHelp() : `L${passedIndex}`}
        </label>
        <div className={styles.InputWrapper}>
          <input
            className={styles.Input}
            id={line.isTitle ? 'title' : `Line ${passedIndex}`}
            type="text"
            value={lineContent}
            onChange={handleChange}
            autoComplete="off"
          />
        </div>
        <div className={styles.PostInputItemsContainer}>
          <button className={styles.Button} disabled={!lineContent.trim()} type="submit">
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
              Non-Greek characters have been detected.{' '}
              <a
                className={classnames('Link', 'RedLink')}
                href={'/guide#greekKeyboard'}
                target="_blank"
                rel="noreferrer"
              >
                Help
              </a>
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
