import type { ReactElement } from 'react';
import styles from '@pages/Help/Help.module.scss';

interface GlossaryEntryProps {
  word: string;
  gloss: string;
}

export const GlossaryEntry = ({ word, gloss }: GlossaryEntryProps): ReactElement => (
  <div>
    <h2 className={styles.Word} id={word}>
      {word}
    </h2>
    <p className={styles.HelpText}>{gloss}</p>
  </div>
);
