import { type ReactElement, useEffect } from "react";
import { viewer } from "mirador";
import { miradorImageToolsPlugin } from "mirador-image-tools";

import config from "./config";

interface MiradorProps {
  manifest: string;
  index: number;
  setPageNumber: (number: number) => void;
  specialIndexHandlingStart?: string;
  specialIndexHandlingEnd?: string;
}

export const Mirador = ({
  manifest,
  index,
  setPageNumber,
  specialIndexHandlingStart,
  specialIndexHandlingEnd,
}: MiradorProps): ReactElement => {
  useEffect(() => {
    config.windows[0] = {
      manifestId: manifest,
      canvasIndex: index,
      view: "single",
    };

    const miradorInstance = viewer(config, miradorImageToolsPlugin);

    miradorInstance.store.subscribe(() => {
      const state = miradorInstance.store.getState();
      const canvasIndex = state.windows[state.workspace.windowIds].canvasId;

      if (canvasIndex) {
        setPageNumber(
          Number(
            canvasIndex
              ?.slice(
                canvasIndex.lastIndexOf(
                  specialIndexHandlingStart ? specialIndexHandlingStart : "/",
                ),
                specialIndexHandlingEnd
                  ? canvasIndex?.lastIndexOf(specialIndexHandlingEnd)
                  : undefined,
              )
              .replace(/[^\d.-]/g, ""),
          ),
        );
      }
    });
  }, [
    manifest,
    index,
    setPageNumber,
    specialIndexHandlingStart,
    specialIndexHandlingEnd,
  ]);

  return <div id={config.id} />;
};
