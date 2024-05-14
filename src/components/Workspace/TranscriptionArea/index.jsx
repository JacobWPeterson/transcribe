import { useState } from 'react';
import SingleLine from './SingleLine.jsx';
import Form from 'react-bootstrap/Form';
import {
  StyledButton,
  StyledFormSwitch,
  StyledLink,
  TranscriptionContainer,
  TranscriptionHeader,
  TranscriptionNavButtons,
  TranscriptionSubsection,
} from '../../../styles.js';

const TranscriptionArea = ({
  changeManuscript, manifest, manifestLength, manuscriptId,
}) => {
  const [requireSpaces, setRequireSpaces] = useState(false)
  const { lines, title } = manifest;
  const handleClick = (type) => {
    changeManuscript(type);
  };


  return (
    <TranscriptionContainer>
      <TranscriptionHeader>
        Transcription Workspace
      </TranscriptionHeader>
      <TranscriptionSubsection>
        <Form>
          <StyledFormSwitch
            id="mode-switch"
            label="Require spaces"
            onChange={() => setRequireSpaces(!requireSpaces)}
          />
        </Form>
        <StyledLink href="/guide" marginbottom={10} target="_blank">
          Transcription guide
        </StyledLink>
      </TranscriptionSubsection>
      {title && <SingleLine title={title} line={title} requireSpaces={requireSpaces} />}
      {lines.map((line) => (
        <SingleLine key={`${manifest}.${line.key}`} line={line} requireSpaces={requireSpaces} />
      ))}
      <TranscriptionNavButtons>
        {manuscriptId > 1 ? <StyledButton background="#d3d3d3" color="#3e5276" height={38} padding="6px 12px" onClick={() => handleClick('previous')}>Previous</StyledButton> : <div />}
        {manuscriptId < manifestLength ? <StyledButton background="#c9ac5f" height={38} padding="6px 26px" onClick={() => handleClick('next')}>Next</StyledButton> : <div />}
      </TranscriptionNavButtons>
    </TranscriptionContainer>
  );
};

export default TranscriptionArea;
