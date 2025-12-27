import type { ReactElement } from "react";
import classNames from "classnames";

import styles from "./Home.module.scss";

export const Home = (): ReactElement => {
  const handleGetStarted = (): void => {
    window.location.href = "lessons/1";
  };

  return (
    <div className="PageWrapper">
      <div className={styles.UpperSection}>
        <img
          className={classNames(styles.Image, styles.LeftImage)}
          src="/images/Aristophanes-Critical-Edition.webp"
          alt="Greek printed edition text"
        />
        <div className={styles.CenterTextContainer}>
          <div className={styles.Line1}>Guided lessons</div>
          <div className={styles.Line2}>for learning to read</div>
          <div className={styles.Line3}>Greek manuscripts</div>
        </div>
        <img
          className={styles.Image}
          src="/images/Aristophanes-Barocci-127-cropped.webp"
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
              <span>progressively more difficult manuscripts</span>
            </li>
            <li className={styles.ListItem}>
              <span>answers checked line-by-line</span>
            </li>
            <li className={styles.ListItem}>
              <span>help when new concepts are encountered</span>
            </li>
            <li className={styles.ListItem}>
              <span>clues to help resolve incorrect answers</span>
            </li>
            <li className={styles.ListItem}>
              <span>downloadable lesson reports</span>
            </li>
            <li className={styles.ListItem}>
              <span>glossary of relevant terms</span>
            </li>
            <li className={styles.ListItem}>
              <span>modern viewer with hi-res colour images</span>
            </li>
            <li className={styles.ListItem}>
              <span>bibliographic info for each manuscript</span>
            </li>
            <li className={styles.ListItem}>
              <span>links to relevant online resources</span>
            </li>
            <li className={styles.ListItem}>
              <span>accessibility-related settings</span>
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
