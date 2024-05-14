
import { HelpText, Word } from '../../styles.js';

const GlossaryEntry = ({ word, gloss }) => (
  <div style={{ margin: '0 0 0 30px' }}>
    <Word id={word}>{word}</Word>
    <HelpText>{gloss}</HelpText>
  </div>
);

export default GlossaryEntry;
