import { useState } from 'react';
import { SingleLine } from './SingleLine';
import { Form } from 'react-bootstrap';
import { Line, Manifest } from '../../../libraries/manifests';

import styles from './index.module.scss';
import classNames from 'classnames';

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
    <div className={styles.Container}>
      <h2 className={styles.Header}>
        Transcription Workspace
      </h2>
      <div className={styles.Section}>
        <Form>
          <Form.Switch
            className={styles.FormSwitch}
            id="mode-switch"
            label="Require spaces"
            onChange={() => setRequireSpaces(!requireSpaces)}
          />
        </Form>
        <a className="Link" href="/guide" target="_blank">
          Transcription guide
        </a>
      </div>
      {lines.map((line: Line, index) => (
        <SingleLine key={`${manifest}.${index}`} passedIndex={index} line={line} requireSpaces={requireSpaces} isTitle={line.isTitle} />
      ))}
      <div className={styles.ButtonsContainer}>
        {manuscriptId > 1 ? <button className={classNames(styles.Button, styles.Back)} color="#3e5276" onClick={() => handleClick('previous')}>Previous</button> : <div/>}
        {manuscriptId < manifestLength ? <button className={styles.Button} onClick={() => handleClick('next')}>Next</button> : <div/>}
      </div>
    </div>
  );
};
