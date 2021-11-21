import React, { useEffect } from "react";
import mirador from "mirador";
import { config } from './config.js';
import { miradorImageToolsPlugin } from 'mirador-image-tools';


const Mirador = ({ manifest, index }) => {
  useEffect(() => {
    config.windows[0] = {
      manifestId: manifest,
      canvasIndex: index,
      view: 'single',
    };
    mirador.viewer(config, miradorImageToolsPlugin);
  }, [manifest]);

  return <div id={config.id} />;
}

export default Mirador;
