import { type ReactElement, useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

import manifests from "../../files/manifests";
import { E404 } from "../E404/E404";

import { TranscriptionArea } from "./TranscriptionArea/index";
import { Mirador } from "./Mirador/index";
import styles from "./Workspace.module.scss";

export const Workspace = (): ReactElement => {
  const { id = 1 } = useParams();
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState<number>(
    manifests[id]?.canvasIndex,
  );
  const [showWrongPageAlert, setShowWrongPageAlert] = useState<boolean>(false);

  const canvasIndex = manifests[id]?.canvasIndex;
  const manifestLength = Object.keys(manifests).length;

  useEffect(() => {
    if (pageNumber && pageNumber !== canvasIndex) {
      setShowWrongPageAlert(true);
    }
    if (showWrongPageAlert && pageNumber === canvasIndex) {
      setShowWrongPageAlert(false);
    }
  }, [pageNumber]);

  if (!manifests[id]) {
    return <E404 />;
  }

  const handleManifestChange = (type: "next" | "previous"): void => {
    switch (type) {
      case "next":
        return navigate(`/lessons/${Number(id) + 1}`);
      case "previous":
        return navigate(`/lessons/${Number(id) - 1}`);
      default:
        throw new Error();
    }
  };

  return (
    <div className={styles.WorkspacePageWrapper}>
      {showWrongPageAlert && (
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
          manifest={manifests[id].manifestId}
          setPageNumber={setPageNumber}
          specialIndexHandling={manifests[id]?.specialIndexHandling}
        />
      </div>
      <div className={styles.TranscriptionPanel}>
        <TranscriptionArea
          changeManuscript={handleManifestChange}
          manifest={manifests[id]}
          manifestLength={manifestLength}
          manuscriptId={Number(id)}
        />
      </div>
    </div>
  );
};
