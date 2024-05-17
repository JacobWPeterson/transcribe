import { type ReactElement, useEffect } from 'react';
import mirador from 'mirador';

// import { miradorImageToolsPlugin } from 'mirador-image-tools'; // currently not available for Mirador v4 alpha; track progress and reinstall https://github.com/ProjectMirador/mirador-image-tools
import config from './config';

interface MiradorProps {
  manifest: string,
  index: number,
  setPageNumber: (number: number) => void
}

export const Mirador = ({
  manifest, index, setPageNumber,
}: MiradorProps): ReactElement => {
  useEffect(() => {
    config.windows[0] = {
      manifestId: manifest,
      canvasIndex: index,
      view: 'single',
    };

    // const miradorInstance = mirador.viewer(config, miradorImageToolsPlugin); // See above comment about the plugin
    const miradorInstance = mirador.viewer(config);

    miradorInstance.store.subscribe(() => {
      const state = miradorInstance.store.getState();
      const canvasIndex = state.windows[state.workspace.windowIds].canvasId;
      if (canvasIndex) {
        setPageNumber(Number(canvasIndex.slice(canvasIndex.lastIndexOf('/') + 1).replace(/[^\d.-]/g, '')));
      }
    });
  }, [manifest, index, setPageNumber]);

  return <div id={config.id} />;
};
