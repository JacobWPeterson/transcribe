import type { ReactElement } from "react";

import glosses from "../../libraries/glosses";

import { GlossaryEntry } from "./GlossaryEntry";
import styles from "./Help.module.scss";

export const Glossary = (): ReactElement => (
  <div className="PageWrapper">
    <div className={styles.HelpSection} id="glossary">
      <h1 className={styles.H1}>Glossary</h1>
      {Object.keys(glosses).map((word, index) => (
        <GlossaryEntry
          key={index}
          word={word}
          gloss={glosses[word].long ? glosses[word].long : glosses[word].short}
        />
      ))}
    </div>
  </div>
);
