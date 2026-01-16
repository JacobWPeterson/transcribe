import type { ReactElement } from 'react';
import { useNavigate } from 'react-router';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { BookOpen } from 'react-feather';

import styles from '../Help.module.scss';

export const Guide = (): ReactElement => {
  const navigate = useNavigate();

  const handleViewTutorial = (): void => {
    navigate('/lessons/1?tutorial=true');
  };

  return (
    <div className="PageWrapper">
      <div className={styles.HelpSection} id="guide">
        <div className={styles.HeaderWithButton}>
          <h1 className={styles.H1}>Guide</h1>
          <button
            onClick={handleViewTutorial}
            className={styles.OnboardingButton}
            aria-label="View getting started guide"
          >
            <BookOpen size={18} />
            Getting started guide
          </button>
        </div>
        <h2 className={styles.H2}>Symbols</h2>
        <table>
          <tbody>
            <tr className={styles.Row}>
              <td className={styles.SymbolCell}>
                <OverlayTrigger
                  key="title-help"
                  placement="auto"
                  rootClose
                  transition
                  trigger={['hover', 'focus', 'click']}
                  overlay={
                    <Popover id="popover-hint">
                      <Popover.Body>
                        Titles can be plain or feature elaborate patterns. Titles often feature
                        ligatures and abbreviations and can be much more difficult to read, so
                        don&apos;t worry about them as much early on. Type them as a single line.
                      </Popover.Body>
                    </Popover>
                  }
                >
                  <div role="button" tabIndex={0}>
                    <img src="/icons/type.png" alt="title" />
                  </div>
                </OverlayTrigger>
              </td>
              <td>
                <p className={styles.LegendText}>
                  This icon appears next to titles in the transcription workspace. Titles can be
                  plain or feature elaborate patterns. Titles often feature ligatures and
                  abbreviations and can be much more difficult to read, so don&apos;t worry about
                  them as much early on. Type them as a single line.
                </p>
              </td>
            </tr>
            <tr className={styles.Row}>
              <td className={styles.SymbolCell}>
                <OverlayTrigger
                  key="error-tooltip"
                  placement="auto"
                  rootClose
                  transition
                  trigger={['hover', 'focus', 'click']}
                  overlay={
                    <Popover id="popover-error">
                      <Popover.Body>Answer is incorrect</Popover.Body>
                    </Popover>
                  }
                >
                  <div role="button" tabIndex={0}>
                    <img src="/icons/x-octagon.png" alt="incorrect" />
                  </div>
                </OverlayTrigger>
              </td>
              <td className={styles.TextCell}>
                <p className={styles.LegendText}>
                  This icon appears after submitting an incorrect answer. <b>Hovering</b> over the
                  icon will reveal more details, such as if the answer is too short or too long.
                </p>
              </td>
            </tr>
            <tr className={styles.Row}>
              <td className={styles.SymbolCell}>
                <OverlayTrigger
                  key="hint-icon"
                  placement="auto"
                  rootClose
                  transition
                  trigger={['hover', 'focus', 'click']}
                  overlay={
                    <Popover id="popover-hint">
                      <Popover.Body>Incorrect letter: σ(10)</Popover.Body>
                    </Popover>
                  }
                >
                  <div role="button" tabIndex={0}>
                    <img src="/icons/help-circle.png" alt="help" />
                  </div>
                </OverlayTrigger>
              </td>
              <td className={styles.TextCell}>
                <p className={styles.LegendText}>
                  After three incorrect attempts of the correct length, this icon appears.{' '}
                  <b>Hovering</b> over the icon reveals which letters are incorrect, giving the
                  letter you have entered and its position on the line.
                </p>
              </td>
            </tr>
            <tr className={styles.Row}>
              <td className={styles.SymbolCell}>
                <img src="/icons/check-circle.png" alt="correct" />
              </td>
              <td className={styles.TextCell}>
                <p className={styles.LegendText}>Congrats, you&apos;ve answered correctly.</p>
              </td>
            </tr>
          </tbody>
        </table>
        <h2 className={styles.H2} id="greekKeyboard">
          Adding a Greek Keyboard
        </h2>
        <p className={styles.GuideText}>
          Xeirographa requires using unicode Greek characters. There may be variations between
          operating systems and specific computers, but you can find guides for adding Greek
          keyboards at the following links.{' '}
          <a
            className="Link"
            href="https://support.apple.com/en-gb/guide/mac-help/mchlp1406/mac"
            target="_blank"
            rel="noreferrer"
          >
            Mac
          </a>{' '}
          |{' '}
          <a
            className="Link"
            href="https://support.microsoft.com/en-gb/windows/manage-the-input-and-display-language-settings-in-windows-12a10cb4-8626-9b77-0ccb-5013e0c7c7a2#:~:text=Select%20the%20Start%20%3E%20Settings%20%3E%20Time,keyboard%20you%20want%20to%20add."
            target="_blank"
            rel="noreferrer"
          >
            Windows
          </a>
        </p>

        <h2 className={styles.H2}>How-to</h2>
        <p className={styles.GuideText}>
          The lesson page features two main areas: the image viewer and the transcription workspace.
        </p>
        <h3 className={styles.H3}>Image viewer</h3>
        <p className={styles.GuideText}>
          The image viewer loads with the image of the page for that lesson. Basic controls for
          zooming in (+) and out (-) on the image are located at the bottom. You can also click the
          image or use swipe actions to zoom in and out. There you will also find left (◀) and right
          (▶) arrow buttons that will take you to different pages of the manuscript, which can be
          useful for getting a better idea of that particular scribe&apos;s letter formations. If
          you navigate away from the target image, a message will pop up to remind you which image
          the lesson covers so you can navigate back.
        </p>
        <p className={styles.GuideText}>
          At the top right is a circular button. Clicking this opens a menu of options for altering
          the appearance of the image, such as adjusting the brightness or contrast. <br />
        </p>
        <p className={styles.GuideText}>
          In the top left next to the name of the manuscript is another button you can click to
          learn all about the manuscript. Each one has different information, but you can often
          learn about contents, current and historical owners, location, scripts, and find a
          bibliography of resources about that manuscript.
        </p>
        <h3 className={styles.H3}>Transcription workspace</h3>
        <p className={styles.GuideText}>
          The overall concept is pretty straightforward. Each line of the manuscript, excepting
          titles (see the help icon for those), corresponds to one line of the transcription viewer.
          Using a Greek unicode font, type your answer into the relevant line{' '}
          <b>omitting any accents or punctuation</b>, then click the &quot;Check&quot; button, and
          you should then see one of the symbols listed above.
        </p>
        <p className={styles.GuideText}>
          Most Greek manuscripts do not have spaces, or at least do not use them in the same way as
          modern writers, so there are two ways of completing the lessons. The normal evaluation
          mode does not care whether or not spaces are included, so you can just type the letters as
          you see them on the line. Clicking the &quot;Require spaces&quot; toggle at the top of the
          editor, however, switches it so that you have to correctly insert spaces into the text in
          order to get the correct answer.
        </p>
        <p className={styles.GuideText}>
          Underneath some of the line inputs you may find additional information about a feature
          present on that line in the manuscript. Pay attention to these as they may tell you things
          to ignore from that line or help make sense of content above or below the main text line.
        </p>
        <p className={styles.GuideText}>
          Once you&apos;ve correctly answered all the lines in a lesson, click the &quot;Next&quot;
          button at the bottom of the page to move on to the next, harder manuscript with more new
          concepts.
        </p>
        <h3 className={styles.H3}>Entering abbreviations, contractions, numbers, and ligatures</h3>
        <p className={styles.GuideText}>
          Abbreviations, contractions, numbers, and ligatures are ubiquitous in Greek manuscripts.
          See the{' '}
          <a className="Link" href="/glossary">
            Glossary
          </a>{' '}
          for more information about each of these concepts. In the lessons, abbreviations,
          contractions, and numbers should be typed as they appear (without any overlining strokes).
          Ligatures should be transcribed as the letters represented by the ligature. A single
          ligature stroke may represent numerous letters and all of them should be included in your
          answer.
        </p>
        <h3 className={styles.H3}>Found an issue?</h3>
        <p className={styles.GuideText}>
          Please use the contact form linked in the footer below to report any errors or bugs you
          have found. For errors, please indicate the manuscript and line number. For bugs, please
          provide detailed replication steps.
        </p>
      </div>
    </div>
  );
};
