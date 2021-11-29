import React, { useState } from 'react';
import Mirador from './Mirador/index.jsx';
import TranscriptionArea from './TranscriptionArea/index.jsx';

import {
  MiradorWrapper, PageWrapper, StyledAlert, TranscriptionPanel,
} from '../../styles.js';
import forms from '../../libraries/forms.js';

const Workspace = () => {
  const manuscript = '01';
  const [showWrongPageAlert, setShowWrongPageAlert] = useState(false);

  return (
    <PageWrapper height="85vh">
      {showWrongPageAlert && (
        <StyledAlert variant="warning" onClose={() => setShowWrongPageAlert(false)}>
          Feel free to explore, but you have left the target image (
          {forms[manuscript].canvasIndex + 1}
          ).
        </StyledAlert>
      )}
      <MiradorWrapper>
        <Mirador
          alertIsShowing={showWrongPageAlert}
          manifest={forms[manuscript].manifestId}
          index={forms[manuscript].canvasIndex}
          showAlert={setShowWrongPageAlert}
        />
      </MiradorWrapper>
      <TranscriptionPanel>
        <TranscriptionArea heading lines={forms[manuscript].lines} />
      </TranscriptionPanel>
    </PageWrapper>
  );
};

export default Workspace;
