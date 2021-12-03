import React from 'react';
import GlossaryEntry from './GlossaryEntry.jsx';
import glosses from '../../libraries/glosses.js';
import {
  StyledHeading, HelpSection, PageWrapper,
} from '../../styles.js';

const Glossary = () => (
  <PageWrapper flexDirection="column">
    <HelpSection id="glossary">
      <StyledHeading>Glossary</StyledHeading>
      {Object.keys(glosses).map((word) => (
        <GlossaryEntry word={word} gloss={glosses[word]} />
      ))}
    </HelpSection>
  </PageWrapper>
);

export default Glossary;
