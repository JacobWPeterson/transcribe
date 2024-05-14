import { type ReactElement, useEffect, useRef, useState, ChangeEvent } from 'react';
import { Badge, OverlayTrigger, Popover } from 'react-bootstrap';
import pluralize from 'pluralize';
import evaluateSubmission from './validators';
import glosses from '../../../libraries/glosses';
import {
  StyledInputWrapper,
  PopoverHeader,
  StyledButton,
  StyledForm,
  StyledInput,
  StyledLabel,
  StyledLink,
  StyledCustomPillBadge,
  StyledSmall,
} from '../../../styles';
import { Line } from '../../../libraries/manifests';

import styles from './SingleLine.module.scss';

interface SingleLineProps {
  isTitle?: boolean,
  line: Line,
  passedIndex: number,
  requireSpaces?: boolean
}

export const SingleLine = ({ isTitle, line, passedIndex, requireSpaces = false }: SingleLineProps): ReactElement => {
  const [lineContent, setLineContent] = useState<string>('');
  const [submissionStatus, setSubmissionStatus] = useState<(boolean | string)[] | null>(null);
  const [showHint, setShowHint] = useState<boolean>(false);
  const guesses = useRef(0);

  useEffect(() => {
    setLineContent('');
    setShowHint(false);
    setSubmissionStatus(null);
  }, [line]);

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
    if (requireSpaces ? lineContent?.length !== line.text.length : lineContent.replace(/\s/g, '').length !== line.text.replace(/\s/g, '').length) {
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
  }, [submissionStatus, lineContent, line.text, requireSpaces]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    event.persist();
    setLineContent(event.target.value);
  };

  const handleSubmit = () => {
    event.preventDefault();
    setSubmissionStatus(evaluateSubmission(lineContent, line.text, requireSpaces));
  }

  const newConcept = (concept: string) => (
    <OverlayTrigger
      key={`${concept}-tooltip`}
      placement="top-end"
      rootClose
      transition
      trigger='click'
      overlay={(
        <Popover id="popover-concepts">
          <PopoverHeader as="h3">{`New Concept: ${concept}`}</PopoverHeader>
          <Popover.Body>
            {glosses?.[concept]?.short}
            &nbsp;
            <StyledLink href={`/glossary#${concept}`} target="_blank">Learn more</StyledLink>
          </Popover.Body>
        </Popover>
      )}
    >
      <StyledCustomPillBadge tabIndex={0} background="#c9ac5f">NC</StyledCustomPillBadge>
    </OverlayTrigger>
  );

  const renderIncorrectAnswerMessaging = () => (
    !submissionStatus[0] ? (
      <OverlayTrigger
        key="error-tooltip"
        placement="top-end"
        rootClose
        transition
        trigger={['hover', 'focus']}
        overlay={(
          <Popover id="popover-error">
            <Popover.Body>
              {submissionStatus[1]}
            </Popover.Body>
          </Popover>
        )}
      >
        <Badge className={styles.Badge} tabIndex={0} pill bg="danger">
          X
        </Badge>
      </OverlayTrigger>
    ) : (
      <Badge className={styles.Badge} pill bg="success">
        Correct!
      </Badge>
    )
  );

  const getHint = (guess: string, answer: string) => {
    const reformattedAnswer = requireSpaces ? answer : answer.replace(/\s/g, '')
    const reformattedGuess = requireSpaces ? guess.replace(/ς|ϲ/gi, 'σ').toLowerCase() : guess.replace(/\s/g, '').replace(/ς|ϲ/gi, 'σ').toLowerCase();
    const mismatches = [];
    for (let i = 0; i < reformattedGuess.length; i += 1) {
      if (reformattedGuess[i] !== reformattedAnswer[i]) {
        mismatches.push(`${reformattedGuess[i]}(${i + 1})`);
      }
    }
    return `Incorrect ${pluralize('letter', mismatches.length)}: ${[...mismatches].join(', ')}.`;
  };

  const hint = () => (
    <OverlayTrigger
      key={`hint-for-line-${passedIndex}`}
      placement="top-end"
      rootClose
      transition
      trigger={['hover', 'focus']}
      overlay={(
        <Popover id="popover-hint">
          <Popover.Body>
            {getHint(lineContent, line.text)}
          </Popover.Body>
        </Popover>
      )}
    >
      <StyledCustomPillBadge tabIndex={0} background="#3e5276">?</StyledCustomPillBadge>
    </OverlayTrigger>
  );

  const titleHelp = () => (
    <OverlayTrigger
      key={`title-help`}
      placement="top"
      rootClose
      transition
      trigger={['hover', 'focus']}
      overlay={(
        <Popover id="popover-hint">
          <Popover.Body>
            {/* eslint-disable-next-line max-len */}
            Titles can be plain or feature elaborate patterns. Titles often feature ligatures and abbreviations and can be much more difficult to read, so don&apos;t worry about them as much early on. Type them as a single line.
          </Popover.Body>
        </Popover>
      )}
    >
      <StyledCustomPillBadge tabIndex={0} background="#6c757d" margin="0 0 0 3px" padding="2px 5px">?</StyledCustomPillBadge>
    </OverlayTrigger>
  );

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledLabel htmlFor={isTitle ? 'title' : `Line ${passedIndex}`} style={{ display: 'flex', alignItems: 'center', marginTop: '3px' }}>
        {isTitle ? 'Title' : `Line ${passedIndex}`}
        {isTitle && titleHelp()}
      </StyledLabel>
      <StyledInputWrapper>
        <StyledInput id={isTitle ? 'title' : `Line ${passedIndex}`} type="text" value={lineContent} onChange={handleChange} autoComplete="off" />
        {line.caption && <StyledSmall>{line.caption}</StyledSmall>}
      </StyledInputWrapper>
      <StyledButton marginTop="2px" type="submit">Check</StyledButton>
      {line.newConcept && newConcept(line.newConcept)}
      {submissionStatus && renderIncorrectAnswerMessaging()}
      {showHint && hint()}
    </StyledForm>
  );
};
