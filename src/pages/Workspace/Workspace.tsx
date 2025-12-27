import { type ReactElement, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import type { ManifestSets } from '../../files/manifests';
import manifests from '../../files/manifests';
import { E404 } from '../E404/E404';
import { Alert } from '../../components/Alert/Alert';
import { ExternalContentErrorBoundary } from '../../components/ErrorBoundary/ExternalContentErrorBoundary';
import { OnboardingModal } from '../../components/OnboardingModal/OnboardingModal';
import { hasSeenOnboarding } from '../../utils/localStorage';

import { TranscriptionArea } from './TranscriptionArea/TranscriptionArea';
import { Mirador } from './Mirador/index';
import styles from './Workspace.module.scss';

export const Workspace = ({ set }: { set: ManifestSets }): ReactElement => {
  const { id = 1 } = useParams();
  const navigate = useNavigate();
  const manifestSet = manifests[set];
  const currentManifest = manifestSet[id];
  const [pageNumber, setPageNumber] = useState<number>();
  const [showWrongPageAlert, setShowWrongPageAlert] = useState<boolean>(false);
  const [showOnboarding, setShowOnboarding] = useState<boolean>(!hasSeenOnboarding());

  const canvasIndex = currentManifest?.canvasIndex;
  const indexAdjustment = currentManifest?.canvasIndexToPageNumberAdj || 0;
  const numberOfLessons = Object.keys(manifestSet).length;

  useEffect(() => {
    if (pageNumber && pageNumber !== canvasIndex + indexAdjustment) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShowWrongPageAlert(true);
      return;
    }
    setShowWrongPageAlert(false);
  }, [pageNumber]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShowWrongPageAlert(false);
  }, [id]);

  if (!currentManifest) {
    return <E404 />;
  }

  const handleManifestChange = (type: 'next' | 'previous'): Promise<void> | void => {
    switch (type) {
      case 'next':
        return navigate(`/${set}/${Number(id) + 1}`);
      case 'previous':
        return navigate(`/${set}/${Number(id) - 1}`);
      default:
        throw new Error();
    }
  };

  return (
    <div className={styles.WorkspacePageWrapper}>
      <OnboardingModal isOpen={showOnboarding} onClose={() => setShowOnboarding(false)} />
      <div className={styles.InvalidDevice}>
        <img src="/images/cog.svg" alt="Rotate device to landscape" className={styles.Image} />
        <h2>Sorry, lessons are only supported on larger screens.</h2>
      </div>
      <div className={styles.Rotate}>
        <img src="/images/rotate.svg" alt="Rotate device to landscape" className={styles.Image} />
        <h2>Rotate your device to landscape</h2>
      </div>
      {showWrongPageAlert && (
        <Alert>
          Feel free to explore, but you have left the target image ({canvasIndex}
          ).
        </Alert>
      )}
      <div className={styles.MiradorWrapper}>
        <ExternalContentErrorBoundary contentType="viewer">
          <Mirador
            index={canvasIndex - 1}
            manifest={currentManifest.manifestId}
            setPageNumber={setPageNumber}
            specialIndexHandlingStart={currentManifest?.specialIndexHandlingStart}
            specialIndexHandlingEnd={currentManifest?.specialIndexHandlingEnd}
          />
        </ExternalContentErrorBoundary>
      </div>
      <div className={styles.TranscriptionPanel}>
        <TranscriptionArea
          changeManuscript={handleManifestChange}
          lessonNumber={Number(id)}
          manifest={currentManifest}
          numberOfLessons={numberOfLessons}
          set={set}
        />
      </div>
    </div>
  );
};
