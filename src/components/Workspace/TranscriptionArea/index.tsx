import { useState } from 'react';
import { SingleLine } from './SingleLine';
import Form from 'react-bootstrap/Form';
import {
  StyledButton,
  StyledFormSwitch,
  StyledLink,
  TranscriptionContainer,
  TranscriptionHeader,
  TranscriptionNavButtons,
  TranscriptionSubsection,
} from '../../../styles';

interface TranscriptionAreaProps {
  changeManuscript: (type: 'next' | 'previous') => void,
  manifest: any, ////to improve
  manifestLength: number,
  manuscriptId: number
}

export const TranscriptionArea = ({
  changeManuscript, manifest, manifestLength, manuscriptId,
}: TranscriptionAreaProps) => {
  const [requireSpaces, setRequireSpaces] = useState(false)
  const { lines, title } = manifest;
  const handleClick = (type: 'next' | 'previous') => {
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
        <StyledLink href="/guide" marginBottom={10} target="_blank">
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
