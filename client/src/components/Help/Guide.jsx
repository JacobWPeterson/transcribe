import React from 'react';
import {
  StyledHeading, HelpSection, HelpText, PageWrapper,
} from '../../styles.js';

const Guide = () => (
  <PageWrapper flexDirection="column">
    <HelpSection id="guide" marginTop>
      <StyledHeading>Guide</StyledHeading>
      <HelpText>
        Here will be a how-to
      </HelpText>
    </HelpSection>
  </PageWrapper>
);

export default Guide;
