import { type ReactElement, useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { useAuth } from '@hooks/useAuth';
import { supabase } from '@config/supabase';
import { Modal } from '@components/Modal/Modal';
import classNames from 'classnames';

import styles from './Account.module.scss';

export const Account = (): ReactElement => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, loading, resetPassword } = useAuth();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deletionConfirmed, setDeletionConfirmed] = useState(false);

  // Check for deletion confirmation in URL params
  useEffect(() => {
    if (searchParams.get('deletion') === 'confirmed') {
      setDeletionConfirmed(true);
    }
  }, [searchParams]);

  if (loading) {
    return (
      <div className={styles.Container}>
        <div className={styles.Loading}>Loading your account...</div>
      </div>
    );
  }

  if (!user) {
    if (deletionConfirmed) {
      return (
        <div className={styles.Container}>
          <div className={styles.Card}>
            <h1>Account deleted</h1>
            <div className={classNames(styles.Alert, styles.AlertSuccess)}>
              <p>
                You have been signed out and your account and all associated data have been
                permanently deleted.
              </p>
            </div>
            <button
              className={classNames(styles.Button, styles.PrimaryButton)}
              onClick={() => navigate('/')}
            >
              Return to home
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className={styles.Container}>
        <div className={styles.Card}>
          <h1>Access denied</h1>
          <p>You must be logged in to view your account.</p>
          <button
            className={`${styles.Button} ${styles.PrimaryButton}`}
            onClick={() => navigate('/')}
          >
            Go to home
          </button>
        </div>
      </div>
    );
  }

  const handleResetPassword = async (): Promise<void> => {
    setError('');
    setSuccess('');
    setIsResettingPassword(true);

    try {
      if (!user.email) {
        setError('Unable to determine your email address');
        return;
      }

      const { error: resetError } = await resetPassword(user.email);

      if (resetError) {
        setError(resetError.message);
      } else {
        setSuccess('Password reset email sent! Check your inbox for instructions.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsResettingPassword(false);
    }
  };

  const handleDeleteAccount = async (): Promise<void> => {
    setError('');
    setIsDeletingAccount(true);

    try {
      // Call the delete_user() PostgreSQL function
      // This function uses SECURITY DEFINER to safely delete the authenticated user
      const { error: deleteError } = await supabase.rpc('delete_user');

      if (deleteError) {
        throw deleteError;
      }

      // Sign out the user after successful deletion
      const { error: signOutError } = await supabase.auth.signOut({ scope: 'global' });
      if (signOutError) {
        throw signOutError;
      }

      // Redirect to confirmation view
      navigate('/account?deletion=confirmed', { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      setIsDeletingAccount(false);
    } finally {
      setShowDeleteConfirmation(false);
    }
  };

  return (
    <div className={styles.Container}>
      <h1>Account settings</h1>

      {error && <div className={classNames(styles.Alert, styles.AlertError)}>{error}</div>}
      {success && <div className={classNames(styles.Alert, styles.AlertSuccess)}>{success}</div>}

      {/* Email Section */}
      <div className={styles.Card}>
        <h2 className={styles.CardHeading}>Email</h2>
        <div className={styles.Section}>
          <div className={styles.Email}>{user.email}</div>
        </div>
      </div>

      {/* Password Section */}
      <div className={styles.Card}>
        <h2 className={styles.CardHeading}>Password</h2>
        <div className={styles.Section}>
          <p className={styles.PasswordDescription}>
            Send a password reset email to your inbox. You'll be able to set a new password.
          </p>
          <button
            className={classNames(styles.Button, styles.PrimaryButton)}
            onClick={handleResetPassword}
            disabled={isResettingPassword}
          >
            {isResettingPassword ? 'Sending...' : 'Reset password'}
          </button>
        </div>
      </div>

      {/* Account Deletion Section */}
      <div className={styles.Card}>
        <h2 className={styles.CardHeading}>Delete account</h2>
        <div className={styles.Section}>
          <div className={classNames(styles.Alert, styles.AlertError)}>
            <strong>Warning:</strong> Deleting your account is permanent and cannot be undone. All
            your data will be deleted immediately.
          </div>
          <button
            className={classNames(styles.Button, styles.DangerButton)}
            onClick={() => setShowDeleteConfirmation(true)}
            disabled={isDeletingAccount}
          >
            Delete account
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteConfirmation}
        header="Delete account?"
        onClose={() => setShowDeleteConfirmation(false)}
      >
        <div className={styles.ModalBody}>
          <p className={styles.ModalDescription}>
            This action cannot be undone. All your data will be permanently deleted, including:
          </p>
          <ul className={styles.ModalList}>
            <li>Your account and profile information</li>
            <li>All lesson progress and transcriptions</li>
            <li>All saved settings</li>
          </ul>
          <p className={styles.ModalConfirmText}>Are you sure you want to continue?</p>
          <div className={styles.ModalButtons}>
            <button
              className={classNames(styles.Button, styles.SecondaryButton)}
              onClick={() => setShowDeleteConfirmation(false)}
              disabled={isDeletingAccount}
            >
              Cancel
            </button>
            <button
              className={classNames(styles.Button, styles.DangerButton)}
              onClick={handleDeleteAccount}
              disabled={isDeletingAccount}
            >
              {isDeletingAccount ? 'Deleting...' : 'Yes, delete my account'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
