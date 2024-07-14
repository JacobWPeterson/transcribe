import type { ReactElement } from "react";
import { Badge, OverlayTrigger, Popover } from "react-bootstrap";
import classnames from "classnames";

import styles from "../Help.module.scss";

export const Guide = (): ReactElement => (
  <div className="PageWrapper">
    <div className={styles.HelpSection} id="guide">
      <h1 className={styles.H1}>Guide</h1>
      <h2 className={styles.H2}>Symbols</h2>
      <table className={styles.Table}>
        <tr className={styles.Row}>
          <td className={styles.Cell}>
            <OverlayTrigger
              key="title-help"
              placement="top"
              rootClose
              transition
              trigger={["hover", "focus", "click"]}
              overlay={
                <Popover id="popover-hint">
                  <Popover.Body>
                    Titles can be plain or feature elaborate patterns. Titles
                    often feature ligatures and abbreviations and can be much
                    more difficult to read, so don&apos;t worry about them as
                    much early on. Type them as a single line.
                  </Popover.Body>
                </Popover>
              }
            >
              <Badge
                pill
                className={classnames(styles.Badge, styles.Help)}
                tabIndex={0}
              >
                T
              </Badge>
            </OverlayTrigger>
          </td>
          <td>
            <p className={styles.LegendText}>
              This icon appears next to titles in the transcription workspace.
              Titles can be plain or feature elaborate patterns. Titles often
              feature ligatures and abbreviations and can be much more difficult
              to read, so don&apos;t worry about them as much early on. Type
              them as a single line.
            </p>
          </td>
        </tr>
        <tr className={styles.Row}>
          <td className={styles.Cell}>
            <OverlayTrigger
              key="NC-example"
              placement="top"
              rootClose
              transition
              trigger="click"
              overlay={
                <Popover id="popover-concepts">
                  <Popover.Header className="PopoverHeader" as="h3">
                    New Concept
                  </Popover.Header>
                  <Popover.Body>
                    Here you&apos;ll find some useful information &nbsp;
                    <a
                      className="Link"
                      href={`/glossary`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      And maybe a link to the glossary
                    </a>
                  </Popover.Body>
                </Popover>
              }
            >
              <Badge
                pill
                className={classnames(styles.Badge, styles.NC)}
                tabIndex={0}
              >
                NC
              </Badge>
            </OverlayTrigger>
          </td>
          <td>
            <p className={styles.LegendText}>
              This icon indicates there is a new concept being introduced on
              that particular line of the manuscript. <b>Clicking</b> the NC
              icon will show a popup with a brief introduction to the concept
              and a link to the glossary to learn more.
            </p>
          </td>
        </tr>
        <tr className={styles.Row}>
          <td className={styles.Cell}>
            <OverlayTrigger
              key="error-tooltip"
              placement="top"
              rootClose
              transition
              trigger={["hover", "focus", "click"]}
              overlay={
                <Popover id="popover-error">
                  <Popover.Body>Answer is incorrect</Popover.Body>
                </Popover>
              }
            >
              <Badge className={styles.Badge} tabIndex={0} pill bg="danger">
                X
              </Badge>
            </OverlayTrigger>
          </td>
          <td>
            <p className={styles.LegendText}>
              This icon appears after submitting an incorrect answer.{" "}
              <b>Hovering</b> over the icon will reveal more details, such as if
              the answer is too short or too long.
            </p>
          </td>
        </tr>
        <tr className={styles.Row}>
          <td className={styles.Cell}>
            <OverlayTrigger
              key="hint-icon"
              placement="top"
              rootClose
              transition
              trigger={["hover", "focus", "click"]}
              overlay={
                <Popover id="popover-hint">
                  <Popover.Body>Incorrect letter: σ(10)</Popover.Body>
                </Popover>
              }
            >
              <Badge
                pill
                className={classnames(styles.Badge, styles.Help)}
                tabIndex={0}
              >
                ?
              </Badge>
            </OverlayTrigger>
          </td>
          <td>
            <p className={styles.LegendText}>
              After three incorrect attempts of the correct length, this icon
              appears. <b>Hovering</b> over the icon reveals which letter(s) is
              incorrect, giving the letter you have entered and its position on
              the line.
            </p>
          </td>
        </tr>
        <tr className={styles.Row}>
          <td className={styles.Cell}>
            <Badge className={classnames(styles.Badge, styles.Success)} pill>
              ✓
            </Badge>
          </td>
          <td>
            <p className={styles.LegendText}>
              Congrats, you&apos;ve answered correctly.
            </p>
          </td>
        </tr>
      </table>
      <h2 className={styles.H2}>How-to</h2>
      <p className={styles.GuideText}>
        The lesson page features two main areas: the image viewer and the
        transcription workspace.
      </p>
      <h3 className={styles.H3}>Image viewer</h3>
      <p className={styles.GuideText}>
        The image viewer loads with the image of the page for that lesson. Basic
        controls for zooming in (+) and out (-) on the image are located at the
        bottom. You can also click the image or use swipe actions to zoom in and
        out. There you will also find left (◀) and right (▶) arrow buttons
        that will take you to different pages of the manuscript, which can be
        useful for getting a better idea of that particular scribe&apos;s letter
        formations. If you navigate away from the target image, a message will
        pop up to remind you which image the lesson covers so you can navigate
        back.
      </p>
      <p className={styles.GuideText}>
        At the top right is a circular button. Clicking this opens a menu of
        options for altering the appearance of the image, such as adjusting the
        brightness or contrast. <br />
      </p>
      <p className={styles.GuideText}>
        In the top left next to the name of the manuscript is another button you
        can click to learn all about the manuscript. Each one has different
        information, but you can often learn about contents, current and
        historical owners, location, scripts, and find a bibliography of
        resources about that manuscript.
      </p>
      <h3 className={styles.H3}>Transcription workspace</h3>
      <p className={styles.GuideText}>
        The overall concept is pretty straightforward. Each line of the
        manuscript, excepting titles (see the help icon for those), corresponds
        to one line of the transcription viewer. Using a Greek unicode font,
        type your answer into the relevant line{" "}
        <b>omitting any accents or punctuation</b>, then click the
        &quot;Check&quot; button, and you should then see one of the symbols
        listed above. How to add languages to your computer:{" "}
        <a
          className="Link"
          href="https://support.apple.com/en-gb/guide/mac-help/mchlp1406/mac"
          target="_blank"
          rel="noreferrer"
        >
          Mac
        </a>{" "}
        |{" "}
        <a
          className="Link"
          href="https://support.microsoft.com/en-gb/windows/manage-the-input-and-display-language-settings-in-windows-12a10cb4-8626-9b77-0ccb-5013e0c7c7a2#:~:text=Select%20the%20Start%20%3E%20Settings%20%3E%20Time,keyboard%20you%20want%20to%20add."
          target="_blank"
          rel="noreferrer"
        >
          Windows
        </a>
      </p>
      <p className={styles.GuideText}>
        Most Greek manuscripts do not have spaces, or at least do not use them
        in the same way as modern writers, so there are two ways of completing
        the lessons. The normal evaluation mode does not care whether or not
        spaces are included, so you can just type the letters as you see them on
        the line. Clicking the &quot;Require spaces&quot; toggle at the top of
        the editor, however, switches it so that you have to correctly insert
        spaces into the text in order to get the correct answer.
      </p>
      <p className={styles.GuideText}>
        Underneath some of the line inputs you may find additional information
        about a feature present on that line in the manuscript. Pay attention to
        these as they may tell you things to ignore from that line or help make
        sense of content above or below the main text line.
      </p>
      <p className={styles.GuideText}>
        Once you&apos;ve correctly answered all the lines in a lesson, click the
        &quot;Next&quot; button at the bottom of the page to move on to the
        next, harder manuscript with more new concepts.
      </p>
      <h3 className={styles.H3}>Found an issue?</h3>
      <p className={styles.GuideText}>
        Please use the contact form linked in the footer below to report any
        errors or bugs you have found. For errors, please indicate the
        manuscript and line number. For bugs, please provide detailed
        replication steps.
      </p>
    </div>
  </div>
);
