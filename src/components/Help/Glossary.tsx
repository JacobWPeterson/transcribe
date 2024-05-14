
import { GlossaryEntry } from './GlossaryEntry';
import glosses from '../../libraries/glosses';
import {
  StyledH1, HelpSection, PageWrapper,
} from '../../styles';
import type { ReactElement } from 'react';

export const Glossary = (): ReactElement => (
  <PageWrapper flexDirection="column">
    <HelpSection id="glossary">
      <StyledH1 textAlign="center">Glossary</StyledH1>
      {Object.keys(glosses).map((word, index) => (
        <GlossaryEntry key={index} word={word} gloss={glosses[word].long ? glosses[word].long : glosses[word].short} />
      ))}
    </HelpSection>
  </PageWrapper>
);

