import { type ReactElement, useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';

import manifests from '../../libraries/manifests';

import { TranscriptionArea } from './TranscriptionArea/index';
import { Mirador } from './Mirador/index';
import styles from './Workspace.module.scss'

export const Workspace = (): ReactElement => {
  const [manuscript, setManuscript] = useState(1);
  const [pageNumber, setPageNumber] = useState(null);
  const [showWrongPageAlert, setShowWrongPageAlert] = useState(false);
  const { canvasIndex } = manifests[manuscript];
  const manifestLength = Object.keys(manifests).length;

  useEffect(() => {
    if (pageNumber && pageNumber !== (canvasIndex + 1)) {
      setShowWrongPageAlert(true);
    }
    if (showWrongPageAlert && pageNumber === (canvasIndex + 1)) {
      setShowWrongPageAlert(false);
    }
  }, [pageNumber, canvasIndex, manuscript]);

  const handleManifestChange = (type: 'next' | 'previous'): void => {
    switch (type) {
      case 'next':
        setManuscript(manuscript + 1);
        setPageNumber(manifests[manuscript + 1].canvasIndex + 1);
        return;
      case 'previous':
        setManuscript(manuscript - 1);
        setPageNumber(manifests[manuscript - 1].canvasIndex + 1);
        return;
      default:
        throw new Error();
    }
  };

  return (
    <div className={styles.WorkspacePageWrapper}>
      {showWrongPageAlert && (
        <Alert className={styles.Alert} variant="warning" onClose={() => setShowWrongPageAlert(false)}>
          Feel free to explore, but you have left the target image (
          {canvasIndex + 1}
          ).
        </Alert>
      )}
      <div className={styles.MiradorWrapper}>
        <Mirador
          setPageNumber={setPageNumber}
          manifest={manifests[manuscript].manifestId}
          index={canvasIndex}
        />
      </div>
      <div className={styles.TranscriptionPanel}>
        <TranscriptionArea
          changeManuscript={handleManifestChange}
          manifest={manifests[manuscript]}
          manifestLength={manifestLength}
          manuscriptId={manuscript}
        />
      </div>
    </div>
  );
};
