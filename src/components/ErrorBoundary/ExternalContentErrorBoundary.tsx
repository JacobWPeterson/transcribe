import type { ReactElement, ReactNode } from 'react';
import classNames from 'classnames';

import { ErrorBoundary } from '../ErrorBoundary/ErrorBoundary';

import styles from './ErrorBoundary.module.scss';

interface ExternalContentErrorBoundaryProps {
  children: ReactNode;
  contentType?: string;
}

export const ExternalContentErrorBoundary = ({
  children,
  contentType = 'content'
}: ExternalContentErrorBoundaryProps): ReactElement => (
  <ErrorBoundary
    fallback={
      <div className={classNames(styles.SpecialisedErrorBoundary, styles.ExternalContent)}>
        <h4>{contentType === 'viewer' ? 'Image Viewer Unavailable' : 'Content Loading Error'}</h4>
        <p>
          {contentType === 'viewer'
            ? 'The manuscript viewer could not be loaded. This might be due to network issues or the image source being temporarily unavailable.'
            : 'Unable to load external content. Please check your internet connection and try again.'}
        </p>
        <small>If the problem persists, try refreshing the page or contact support</small>
      </div>
    }
    onError={error => {
      console.error(`${contentType} loading error:`, error);
      // Could send to error reporting service here
    }}
  >
    {children}
  </ErrorBoundary>
);
