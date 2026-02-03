import { type ReactElement, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '@hooks/useAuth';
import { supabase } from '@config/supabase';

import styles from './Auth.module.scss';

export const UpdatePassword = (): ReactElement => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Redirect to home if user is not authenticated
    if (!authLoading && !user) {
      const timer = setTimeout(() => {
        navigate('/');
      }, 1000);
      return (): void => clearTimeout(timer);
    }
  }, [authLoading, user, navigate]);

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.auth.updateUser({ password });

      if (error) {
        setError(error.message);
      } else {
        setMessage('Password updated successfully! Redirecting to home...');
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading state while checking auth
  if (authLoading) {
    return (
      <div className={styles.Container}>
        <div className={styles.Card}>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, show error
  if (!user) {
    return (
      <div className={styles.Container}>
        <div className={styles.Card}>
          <h1>Update password</h1>
          <p className={styles.ErrorMessage}>You must be logged in to update your password.</p>
          <button className={styles.Button} onClick={() => navigate('/')}>
            Back to home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.Container}>
      <div className={styles.Card}>
        <h1>Update your password</h1>
        <p className={styles.Description}>
          Enter your new password below. Make sure it's at least 6 characters long.
        </p>

        {error && <div className={styles.Error}>{error}</div>}
        {message && <div className={styles.Success}>{message}</div>}

        <form onSubmit={handleSubmit}>
          <div className={styles.FormGroup}>
            <label htmlFor="password">New password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              autoComplete="new-password"
              disabled={isSubmitting}
            />
          </div>

          <div className={styles.FormGroup}>
            <label htmlFor="confirmPassword">Confirm password</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
              placeholder="••••••••"
              autoComplete="new-password"
              disabled={isSubmitting}
            />
          </div>

          <button type="submit" disabled={isSubmitting} className={styles.Button}>
            {isSubmitting ? 'Updating...' : 'Update password'}
          </button>
        </form>
      </div>
    </div>
  );
};
