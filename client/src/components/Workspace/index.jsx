import React from 'react';
import Mirador from './Mirador/index.jsx';
import TranscriptionArea from './TranscriptionArea/index.jsx';

import { MiradorWrapper, PageWrapper, TranscriptionPanel } from '../../styles.js';
import { Forms } from './forms/Forms.js';

const Workspace = () => {
  const manuscript = '01';
  return (
    <PageWrapper>
      <MiradorWrapper>
        <Mirador manifest={Forms[manuscript].manifestId} index={Forms[manuscript].canvasIndex} />
      </MiradorWrapper>
      <TranscriptionPanel>
        <TranscriptionArea heading lines={Forms[manuscript].lines} />
      </TranscriptionPanel>
    </PageWrapper>
  );
};

export default Workspace;
