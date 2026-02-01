import type { ReactElement } from 'react';
import { useState } from 'react';
import { useAuth } from '@hooks/useAuth';
import { Modal } from '@components/Modal/Modal';

import styles from './AuthModal.module.scss';
import { AuthMode } from './authModal.enum';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: AuthMode;
}

export const AuthModal = ({
  isOpen,
  onClose,
  defaultMode = AuthMode.SIGNIN
}: AuthModalProps): ReactElement => {
  const [mode, setMode] = useState<AuthMode>(defaultMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const { signIn, signUp, resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      if (mode === 'signup') {
        if (password !== confirmPassword) {
          setError('Passwords do not match');
          setLoading(false);
          return;
        }
        if (password.length < 6) {
          setError('Password must be at least 6 characters');
          setLoading(false);
          return;
        }

        const { error } = await signUp(email, password);
        if (error) {
          setError(error.message);
        } else {
          setMessage('Account created! Please check your email to confirm your account.');
          setEmail('');
          setPassword('');
          setConfirmPassword('');
        }
      } else if (mode === 'signin') {
        const { error } = await signIn(email, password);
        if (error) {
          setError(error.message);
        } else {
          onClose();
        }
      } else if (mode === 'reset') {
        const { error } = await resetPassword(email);
        if (error) {
          setError(error.message);
        } else {
          setMessage('Password reset email sent! Check your inbox.');
          setEmail('');
        }
      }
    } catch {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const switchMode = (newMode: AuthMode): void => {
    setMode(newMode);
    setError('');
    setMessage('');
    setPassword('');
    setConfirmPassword('');
  };

  const getHeader = (): string => {
    switch (mode) {
      case AuthMode.SIGNIN:
        return 'Sign in';
      case AuthMode.SIGNUP:
        return 'Create account';
      case AuthMode.RESET:
        return 'Reset password';
      default:
        return '';
    }
  };

  return (
    <Modal isOpen={isOpen} handleClose={onClose} header={getHeader()} isCloseDisabled={loading}>
      <div className={styles.AuthModal}>
        {error && <div className={styles.Error}>{error}</div>}
        {message && <div className={styles.Message}>{message}</div>}
        <form onSubmit={handleSubmit} className={styles.Form}>
          <div className={styles.FormGroup}>
            <label htmlFor="email" className={styles.Label}>
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className={styles.Input}
              placeholder="your@email.com"
              autoComplete="email"
            />
          </div>
          {mode !== 'reset' && (
            <div className={styles.FormGroup}>
              <label htmlFor="password" className={styles.Label}>
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className={styles.Input}
                placeholder="••••••••"
                autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
              />
            </div>
          )}
          {mode === 'signup' && (
            <div className={styles.FormGroup}>
              <label htmlFor="confirmPassword" className={styles.Label}>
                Confirm password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
                className={styles.Input}
                placeholder="••••••••"
                autoComplete="new-password"
              />
            </div>
          )}
          <button type="submit" disabled={loading} className={styles.SubmitButton}>
            {loading
              ? 'Loading...'
              : mode === 'signin'
                ? 'Sign in'
                : mode === 'signup'
                  ? 'Sign up'
                  : 'Send reset email'}
          </button>
        </form>
        <div className={styles.Links}>
          {mode === 'signin' && (
            <>
              <button
                type="button"
                onClick={() => switchMode(AuthMode.RESET)}
                className={styles.Link}
              >
                Forgot password?
              </button>
              <button
                type="button"
                onClick={() => switchMode(AuthMode.SIGNUP)}
                className={styles.Link}
              >
                Don't have an account? Sign up
              </button>
            </>
          )}
          {mode === 'signup' && (
            <button
              type="button"
              onClick={() => switchMode(AuthMode.SIGNIN)}
              className={styles.Link}
            >
              Already have an account? Sign in
            </button>
          )}
          {mode === 'reset' && (
            <button
              type="button"
              onClick={() => switchMode(AuthMode.SIGNIN)}
              className={styles.Link}
            >
              Back to sign in
            </button>
          )}
        </div>
        <div className={styles.GuestMode}>
          <p className={styles.GuestText}>
            Continue as guest? Your progress will be saved to this device and this browser only.
            Create an account to save your progress across devices.
          </p>
          <button type="button" onClick={onClose} className={styles.GuestButton}>
            Continue as guest
          </button>
        </div>
      </div>
    </Modal>
  );
};
