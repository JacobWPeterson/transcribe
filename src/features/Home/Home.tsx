import type { ReactElement } from "react";
import classNames from "classnames";

import styles from "./Home.module.scss";

export const Home = (): ReactElement => {
  const handleGetStarted = (): void => {
    window.location.href = "lessons";
  };

  return (
    <div className="PageWrapper">
      <div className={styles.UpperSection}>
        <img
          className={classNames(styles.Image, styles.LeftImage)}
          src="src/assets/images/Aristophanes-Critical-Edition.png"
          alt="Greek printed edition text"
        />
        <div className={styles.CenterTextContainer}>
          <div className={styles.Line1}>Guided lessons</div>
          <div className={styles.Line2}>for learning to read</div>
          <div className={styles.Line3}>Greek manuscripts</div>
        </div>
        <img
          className={styles.Image}
          src="src/assets/images/Aristophanes-Barocci-127.jpg"
          alt="Greek manuscript text"
        />
      </div>
      <div className={styles.FeaturesSection}>
        <p className={styles.FeaturesText}>
          Xeirographa currently offers several different features for learners
          to ease the transition from reading printed Greek texts to manuscripts
          of any period.
        </p>
        <div className={styles.FeaturesBlock}>
          <h2 className={styles.H2}>Features</h2>
          <ul className={styles.UnorderedList}>
            <li className={styles.ListItem}>
              <span>manuscripts get progressively more difficult to read</span>
            </li>
            <li className={styles.ListItem}>
              <span>answers checked line-by-line</span>
            </li>
            <li className={styles.ListItem}>
              <span>helpful information when new concepts are encountered</span>
            </li>
            <li className={styles.ListItem}>
              <span>tips and clues to help resolve incorrect answers</span>
            </li>
            <li className={styles.ListItem}>
              <span>a glossary of relevant terms</span>
            </li>
            <li className={styles.ListItem}>
              <span>a modern viewer featuring hi-res colour images</span>
            </li>
            <li className={styles.ListItem}>
              <span>
                codicological and bibliographic info about each manuscript
              </span>
            </li>
            <li className={styles.ListItem}>
              <span>suggestions for further study</span>
            </li>
            <li className={styles.ListItem}>
              <span>links to other relevant online resources</span>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.LowerSection}>
        Go from reading printed texts to manuscripts of any period in a few
        lessons
        <button
          className={styles.Button}
          onClick={handleGetStarted}
          type="button"
        >
          Get started
        </button>
      </div>
    </div>
  );
};
