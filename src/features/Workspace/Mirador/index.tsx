import { type ReactElement, useEffect } from "react";
import mirador from "mirador";

// import { miradorImageToolsPlugin } from 'mirador-image-tools'; // currently not available for Mirador v4 alpha; track progress and reinstall https://github.com/ProjectMirador/mirador-image-tools
import config from "./config";

interface MiradorProps {
  manifest: string;
  index: number;
  setPageNumber: (number: number) => void;
  specialIndexHandling?: string;
}

export const Mirador = ({
  manifest,
  index,
  setPageNumber,
  specialIndexHandling,
}: MiradorProps): ReactElement => {
  // Can deal with fetching with this prop so that the navigation popup doesn't show on mss change
  // manifests["https://viewer.cbl.ie/viewer/api/v1/records/MP_2_86/manifest"].isFetching

  useEffect(() => {
    config.windows[0] = {
      manifestId: manifest,
      canvasIndex: index,
      view: "single",
    };

    // const miradorInstance = mirador.viewer(config, miradorImageToolsPlugin); // See above comment about the plugin
    const miradorInstance = mirador.viewer(config);

    miradorInstance.store.subscribe(() => {
      const state = miradorInstance.store.getState();
      const canvasIndex = state.windows[state.workspace.windowIds].canvasId;
      if (canvasIndex) {
        setPageNumber(
          Number(
            canvasIndex
              .slice(
                canvasIndex.lastIndexOf(
                  specialIndexHandling ? specialIndexHandling : "/",
                ),
              )
              .replace(/[^\d.-]/g, ""),
          ),
        );
      }
    });
  }, [manifest, index, setPageNumber, specialIndexHandling]);

  return <div id={config.id} />;
};
