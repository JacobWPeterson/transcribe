import { type ReactElement } from 'react';

import { Modal } from '../Modal/Modal';

import styles from './AccountRequirementModal.module.scss';

interface AccountRequirementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AccountRequirementModal = ({
  isOpen,
  onClose
}: AccountRequirementModalProps): ReactElement => {
  return (
    <Modal
      onClose={onClose}
      header={'Notice'}
      isOpen={isOpen}
      classes={styles.AccountRequirementModal}
    >
      <div className={styles.Content}>
        <p className={styles.MainText}>
          To support more users and improve your experience, we're transitioning to requiring
          accounts for saving lesson progress and downloading reports.
        </p>
        <div className={styles.Details}>
          <h3 className={styles.Subheading}>What's changing?</h3>
          <ul className={styles.ChangeList}>
            <li>
              <strong>Save Progress:</strong> After March 1st, you'll need a free account to save
              your lesson progress beyond your current session.
            </li>
            <li>
              <strong>Download Reports:</strong> Generating and downloading lesson reports will
              require an account.
            </li>
            <li>
              <strong>Current Session:</strong> You can still work on lessons right now without an
              account—just know your progress will be lost when you close your browser.
            </li>
          </ul>
          <h3 className={styles.Subheading}>Why?</h3>
          <p className={styles.ReasonText}>
            Accounts allow us to provide better support, sync your progress across devices, and
            offer you more personalized learning features in the future.
          </p>
          <h3 className={styles.Subheading}>When?</h3>
          <p className={styles.ReasonText}>
            This change will take effect on <strong>March 1st</strong>.
          </p>
          <h3 className={styles.Subheading}>What to do?</h3>
          <p className={styles.ReasonText}>
            Create an account from the top navigation menu. Your current progress will be migrated
            automatically.
          </p>
        </div>
        <button
          type="button"
          className={styles.PrimaryButton}
          onClick={onClose}
          aria-label="Got it"
        >
          Got it
        </button>
      </div>
    </Modal>
  );
};
