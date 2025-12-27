/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import type { PropsWithChildren, ReactElement } from 'react';
import { useEffect } from 'react';
import classNames from 'classnames';

import { Portal } from '../Portal/Portal';

import styles from './Modal.module.scss';

interface ModalProps {
  handleClose: () => void;
  header?: string;
  isCloseDisabled: boolean;
  isOpen: boolean;
  classes?: string;
}

export const Modal = ({
  children,
  classes,
  handleClose,
  header,
  isCloseDisabled,
  isOpen
}: PropsWithChildren<ModalProps>): ReactElement => {
  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent): void =>
      e.key === 'Escape' ? handleClose() : null;
    document.body.addEventListener('keydown', closeOnEscapeKey);
    return (): void => {
      document.body.removeEventListener('keydown', closeOnEscapeKey);
    };
  }, [handleClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <Portal>
      <div
        className={styles.Modal}
        onClick={isCloseDisabled ? (): void => {} : handleClose}
        onKeyDown={(e): void => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (!isCloseDisabled) {
              handleClose();
            }
          }
        }}
        role="presentation"
        aria-label="Modal backdrop"
      >
        <div
          className={classNames(styles.Content, classes)}
          onClick={e => e.stopPropagation()}
          onKeyDown={e => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby={header ? 'modal-header' : undefined}
        >
          <div className={styles.Header}>
            {header && (
              <h2 className={styles.H2} id="modal-header">
                {header}
              </h2>
            )}
            <button
              onClick={handleClose}
              className={styles.CloseButton}
              disabled={isCloseDisabled}
              aria-label="Close modal"
            />
          </div>
          {children}
        </div>
      </div>
    </Portal>
  );
};
