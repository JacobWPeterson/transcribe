import { type ReactElement, useEffect, useState } from "react";
import { Alert } from "react-bootstrap";

import manifests from "../../assets/files/manifests";

import { TranscriptionArea } from "./TranscriptionArea/index";
import { Mirador } from "./Mirador/index";
import styles from "./Workspace.module.scss";

export const Workspace = (): ReactElement => {
  const [isFetchingManuscript, setIsFetchingManuscript] =
    useState<boolean>(false);
  const [manuscript, setManuscript] = useState<number>(1);
  const [pageNumber, setPageNumber] = useState<number | null>(null);
  const [showWrongPageAlert, setShowWrongPageAlert] = useState<boolean>(false);
  const { canvasIndex } = manifests[manuscript];
  const manifestLength = Object.keys(manifests).length;

  useEffect(() => {
    if (pageNumber && pageNumber !== canvasIndex) {
      setShowWrongPageAlert(true);
    }
    if (showWrongPageAlert && pageNumber === canvasIndex) {
      setShowWrongPageAlert(false);
    }
  }, [pageNumber, canvasIndex, manuscript]);

  const handleManifestChange = (type: "next" | "previous"): void => {
    switch (type) {
      case "next":
        setManuscript(manuscript + 1);
        setPageNumber(manifests[manuscript + 1].canvasIndex);
        return;
      case "previous":
        setManuscript(manuscript - 1);
        setPageNumber(manifests[manuscript - 1].canvasIndex);
        return;
      default:
        throw new Error();
    }
  };

  return (
    <div className={styles.WorkspacePageWrapper}>
      {showWrongPageAlert && !isFetchingManuscript && (
        <Alert
          className={styles.Alert}
          variant="warning"
          onClose={() => setShowWrongPageAlert(false)}
        >
          Feel free to explore, but you have left the target image (
          {canvasIndex}
          ).
        </Alert>
      )}
      <div className={styles.MiradorWrapper}>
        <Mirador
          index={canvasIndex - 1}
          manifest={manifests[manuscript].manifestId}
          setIsFetchingManuscript={setIsFetchingManuscript}
          setPageNumber={setPageNumber}
          specialIndexHandling={manifests[manuscript]?.specialIndexHandling}
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
