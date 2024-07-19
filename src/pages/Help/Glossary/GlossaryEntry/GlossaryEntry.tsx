import type { ReactElement } from "react";

import styles from "../../Help.module.scss";

interface GlossaryEntryProps {
  word: string;
  gloss: string;
}

export const GlossaryEntry = ({
  word,
  gloss,
}: GlossaryEntryProps): ReactElement => (
  <div>
    <h4 className={styles.Word} id={word}>
      {word}
    </h4>
    <p className={styles.HelpText}>{gloss}</p>
  </div>
);
