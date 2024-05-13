
import GlossaryEntry from './GlossaryEntry.jsx';
import glosses from '../../libraries/glosses.js';
import {
  StyledH1, HelpSection, PageWrapper,
} from '../../styles.js';

const Glossary = () => (
  <PageWrapper flexDirection="column">
    <HelpSection id="glossary">
      <StyledH1 textAlign="center">Glossary</StyledH1>
      {Object.keys(glosses).map((word, index) => (
        <GlossaryEntry key={index} word={word} gloss={glosses[word].long ? glosses[word].long : glosses[word].short} />
      ))}
    </HelpSection>
  </PageWrapper>
);

export default Glossary;
