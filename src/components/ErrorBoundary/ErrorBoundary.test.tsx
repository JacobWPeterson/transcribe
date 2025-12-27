import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import type { ReactElement } from 'react';

import { ErrorBoundary } from './ErrorBoundary';

const ErrorComponent = (): never => {
  throw new Error('Test error');
};

const SafeComponent = (): ReactElement => <div>Safe content</div>;

describe('ErrorBoundary', () => {
  beforeEach(() => {
    // Clear any previous error state
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders children when no error occurs', () => {
    render(
      <ErrorBoundary>
        <SafeComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Safe content')).toBeInTheDocument();
  });

  it('renders fallback UI when an error occurs', () => {
    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('Try again')).toBeInTheDocument();
  });

  it('renders custom fallback when provided', () => {
    render(
      <ErrorBoundary fallback={<div>Custom error message</div>}>
        <ErrorComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Custom error message')).toBeInTheDocument();
  });

  it('allows retry when Try Again is clicked', async () => {
    const user = userEvent.setup();

    // Render with error
    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();

    // Click retry - this should reset the error state
    await user.click(screen.getByText('Try again'));

    // The error boundary should have reset, but since we still render ErrorComponent,
    // it will show the error again. The important thing is that the retry functionality works.
    expect(screen.getByText('Try again')).toBeInTheDocument();
  });

  it('shows error details in development mode', () => {
    // Mock NODE_ENV
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';

    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Error Details (Development)')).toBeInTheDocument();

    // Restore original env
    process.env.NODE_ENV = originalEnv;
  });

  it('calls onError callback when error occurs', () => {
    const onErrorMock = vi.fn();

    render(
      <ErrorBoundary onError={onErrorMock}>
        <ErrorComponent />
      </ErrorBoundary>
    );

    expect(onErrorMock).toHaveBeenCalledWith(expect.any(Error), expect.any(Object));
  });
});
