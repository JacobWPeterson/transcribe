
import type { ReactElement } from 'react';
import { HelpText, Word } from '../../styles';

interface GlossaryEntryProps {
  word: string,
  gloss: string
}

export const GlossaryEntry = ({ word, gloss }: GlossaryEntryProps): ReactElement => (
  <div style={{ margin: '0 0 0 30px' }}>
    <Word id={word}>{word}</Word>
    <HelpText>{gloss}</HelpText>
  </div>
);
