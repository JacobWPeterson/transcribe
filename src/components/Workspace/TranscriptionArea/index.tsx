import { useState } from 'react';
import { SingleLine } from './SingleLine';
import Form from 'react-bootstrap/Form';
import {
  StyledButton,
  StyledFormSwitch,
  TranscriptionContainer,
  TranscriptionHeader,
  TranscriptionNavButtons,
  TranscriptionSubsection,
} from '../../../styles';
import { Line, Manifest } from '../../../libraries/manifests';

interface TranscriptionAreaProps {
  changeManuscript: (type: 'next' | 'previous') => void,
  manifest: Manifest
  manifestLength: number,
  manuscriptId: number
}

export const TranscriptionArea = ({
  changeManuscript, manifest, manifestLength, manuscriptId,
}: TranscriptionAreaProps) => {
  const [requireSpaces, setRequireSpaces] = useState(false)
  const { lines } = manifest;
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
        <a className="Link" href="/guide" target="_blank">
          Transcription guide
        </a>
      </TranscriptionSubsection>
      {lines.map((line: Line, index) => (
        <SingleLine key={`${manifest}.${index}`} passedIndex={index} line={line} requireSpaces={requireSpaces} isTitle={line.isTitle} />
      ))}
      <TranscriptionNavButtons>
        {manuscriptId > 1 ? <StyledButton background="#d3d3d3" color="#3e5276" height={38} padding="6px 12px" onClick={() => handleClick('previous')}>Previous</StyledButton> : <div />}
        {manuscriptId < manifestLength ? <StyledButton background="#c9ac5f" height={38} padding="6px 26px" onClick={() => handleClick('next')}>Next</StyledButton> : <div />}
      </TranscriptionNavButtons>
    </TranscriptionContainer>
  );
};
