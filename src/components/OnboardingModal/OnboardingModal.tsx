import { type ReactElement, useState } from 'react';
import { Download, Menu, MinusCircle, PlayCircle, PlusCircle, Sliders } from 'react-feather';

import { Modal } from '../Modal/Modal';
import { markOnboardingAsSeen } from '../../utils/localStorage';

import styles from './OnboardingModal.module.scss';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  skipMarkAsSeen?: boolean;
}

interface Slide {
  title: string;
  content: ReactElement;
}

const slides: Slide[] = [
  {
    title: 'Welcome to Xeirographa',
    content: (
      <>
        <p>
          This interactive workspace helps you learn to read Greek manuscripts through guided
          transcription exercises.
        </p>
        <p>
          Each lesson presents you with manuscript images and lines to transcribe. Let&rsquo;s walk
          through how it works!
        </p>
      </>
    )
  },
  {
    title: 'The manuscript viewer',
    content: (
      <>
        <p>
          On the left side, you&rsquo;ll see the <strong>Mirador viewer</strong> displaying the
          manuscript image.
        </p>
        <ul>
          <li>
            Use the zoom tools (
            <PlusCircle size={18} /> and <MinusCircle size={18} />) to examine the text closely
          </li>
          <li>
            The arrows (
            <PlayCircle size={18} className={styles.LeftIcon} /> and <PlayCircle size={18} />) allow
            you to explore other pages. Don&rsquo;t worry, the viewer will alert you if you&rsquo;re
            on the wrong page
          </li>
          <li>
            Use the <Sliders size={18} className={styles.SlidersIcon} /> button in the top right of
            the viewer to adjust image settings
          </li>
          <li>
            To learn more about the manuscript, click the <Menu size={18} /> icon to the left of its
            name in the top banner
          </li>
        </ul>
        <p>Take your time examining the manuscript before transcribing!</p>
      </>
    )
  },
  {
    title: 'The transcription area',
    content: (
      <>
        <p>
          On the right side, you&rsquo;ll find the <strong>transcription area</strong> where
          you&rsquo;ll enter your answers.
        </p>
        <ul>
          <li>Each line from the manuscript has its own input field</li>
          <li>Some lines may include helpful captions or introduce new concepts</li>
          <li>
            Type your transcription using Greek characters. See Help &gt; Guide if you need help
            setting up your keyboard
          </li>
          <li>Ignore accents and punctuation</li>
          <li>Want an extra challenge? Click the checkbox to require spaces in your answer</li>
          <li>Click &ldquo;Check&rdquo; to validate your answer</li>
        </ul>
      </>
    )
  },
  {
    title: 'Understanding submission statuses',
    content: (
      <>
        <p>
          Your total progress on each lesson is displayed at the top. When you check your answers on
          each line, you&rsquo;ll see different feedback messages:
        </p>
        <div className={styles.StatusExamples}>
          <div className={styles.StatusItem}>
            <img src="/icons/check-circle.png" alt="correct" />
            <div className={styles.StatusDescription}>Your answer is correct!</div>
          </div>
          <div className={styles.StatusItem}>
            <img src="/icons/x-octagon.png" alt="incorrect" />
            <div className={styles.StatusDescription}>
              This icon appears after submitting an incorrect answer. <b>Hovering</b> over the icon
              will reveal more details, such as if the answer is too short or too long.
            </div>
          </div>
          <div className={styles.StatusItem}>
            <img src="/icons/help-circle.png" alt="help" />
            <div className={styles.StatusDescription}>
              {' '}
              After three incorrect attempts of the correct length, this icon appears.{' '}
              <b>Hovering</b> over the icon reveals which letters are incorrect, giving the letter
              you have entered and its position on the line.
            </div>
          </div>
        </div>
      </>
    )
  },
  {
    title: 'Tips for success',
    content: (
      <>
        <ul>
          <li>
            <strong>Zoom in:</strong> Use the viewer&rsquo;s zoom tools to see letter details
            clearly
          </li>
          <li>
            <strong>Take your time:</strong> Manuscript reading is a skill that develops with
            practice
          </li>
          <li>
            <strong>Learn from mistakes:</strong> Incorrect answers help you identify patterns you
            might be missing
          </li>
          <li>
            <strong>Find the patterns:</strong> There&rsquo;s no way to cover everything, so take
            note of how letters change shape or get combined with other letters. This will help you
            more easily recognise new combinations in the future
          </li>
          <li>
            <strong>Progress is saved:</strong> Your answers are automatically saved as you work
          </li>
          <li>
            <strong>Use the glossary:</strong> Check the Help section for explanations of
            paleographic terms
          </li>
        </ul>
      </>
    )
  },
  {
    title: 'Ready to begin!',
    content: (
      <>
        <p>You&rsquo;re all set to start your first lesson!</p>
        <p>
          Remember, learning to read manuscripts takes practice. Don&rsquo;t worry if it seems
          challenging at first &ndash; that&rsquo;s completely normal.
        </p>
        <p>
          If you need help at any time, consult the guide, glossary, or additional resources under
          the <strong>Help</strong> tab in the navigation menu.
        </p>
        <p>
          If you&apos;re using this for a class, click{' '}
          <strong>
            Report <Download size={16} />
          </strong>{' '}
          below the final line of any lesson to download a PDF showing your work on that lesson
        </p>
        <p className={styles.Encouragement}>Happy transcribing!</p>
      </>
    )
  }
];

export const OnboardingModal = ({
  isOpen,
  onClose,
  skipMarkAsSeen = false
}: OnboardingModalProps): ReactElement => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = (): void => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handlePrevious = (): void => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleFinish = (): void => {
    if (!skipMarkAsSeen) {
      markOnboardingAsSeen();
    }
    onClose();
  };

  const isFirstSlide = currentSlide === 0;
  const isLastSlide = currentSlide === slides.length - 1;

  return (
    <Modal
      isOpen={isOpen}
      handleClose={handleFinish}
      header="Getting started"
      isCloseDisabled={false}
      classes={styles.OnboardingModal}
    >
      <div className={styles.Content}>
        <div className={styles.SlideContent}>
          <h3 className={styles.SlideTitle}>{slides[currentSlide].title}</h3>
          <div className={styles.SlideBody}>{slides[currentSlide].content}</div>
        </div>

        <div className={styles.Navigation}>
          <div className={styles.Progress}>
            {slides.map((_, index) => (
              <button
                key={index}
                className={index === currentSlide ? styles.DotActive : styles.Dot}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          <div className={styles.Buttons}>
            <button
              onClick={handlePrevious}
              disabled={isFirstSlide}
              className={styles.ButtonSecondary}
            >
              Previous
            </button>
            {isLastSlide ? (
              <button onClick={handleFinish} className={styles.ButtonPrimary}>
                Get started
              </button>
            ) : (
              <button onClick={handleNext} className={styles.ButtonPrimary}>
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};
