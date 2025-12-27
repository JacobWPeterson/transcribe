import type { ReactElement, ReactNode } from 'react';
import classNames from 'classnames';

import { ErrorBoundary } from '../ErrorBoundary/ErrorBoundary';

import styles from './ErrorBoundary.module.scss';

interface PDFErrorBoundaryProps {
  children: ReactNode;
}

export const PDFErrorBoundary = ({ children }: PDFErrorBoundaryProps): ReactElement => (
  <ErrorBoundary
    fallback={
      <div className={classNames(styles.SpecialisedErrorBoundary, styles.PDF)}>
        <h4>PDF Generation Failed</h4>
        <p>
          Unable to generate the lesson report PDF. This might be due to browser compatibility
          issues or large content.
        </p>
        <small>
          Try again or try using a different browser. Contact support if the problem persists.
        </small>
      </div>
    }
    onError={error => {
      console.error('PDF generation error:', error);
      // Could send to error reporting service here
    }}
  >
    {children}
  </ErrorBoundary>
);

interface LocalStorageErrorBoundaryProps {
  children: ReactNode;
}

export const LocalStorageErrorBoundary = ({
  children
}: LocalStorageErrorBoundaryProps): ReactElement => (
  <ErrorBoundary
    fallback={
      <div className={classNames(styles.SpecialisedErrorBoundary, styles.LocalStorage)}>
        <h4>Storage Error</h4>
        <p>
          Unable to save or load your progress. This might be due to browser storage being full or
          disabled.
        </p>
        <small>Try clearing your browser data or enabling local storage.</small>
      </div>
    }
    onError={error => {
      console.error('LocalStorage error:', error);
      // Could send to error reporting service here
    }}
  >
    {children}
  </ErrorBoundary>
);
