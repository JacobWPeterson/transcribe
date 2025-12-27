import { Component, type ErrorInfo, type ReactNode, useState } from 'react';

import styles from './ErrorBoundary.module.scss';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className={styles.ErrorBoundary}>
          <div className={styles.ErrorContent}>
            <h3>Something went wrong</h3>
            <p>We encountered an unexpected error. Please try refreshing the page</p>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className={styles.ErrorDetails}>
                <summary>Error Details (Development)</summary>
                <pre>{this.state.error.toString()}</pre>
              </details>
            )}
            <button
              className={styles.RetryButton}
              onClick={() => this.setState({ hasError: false, error: undefined })}
            >
              Try again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Hook-based error boundary for functional components
export const useErrorHandler = (): ((error: Error) => void) => {
  const [, setError] = useState<Error | null>(null);

  const handleError = (error: Error): void => {
    setError(() => {
      throw error;
    });
  };

  return handleError;
};
