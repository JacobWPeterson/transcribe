import { type ReactElement, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { supabase } from '@config/supabase';

import styles from './Auth.module.scss';

export const Confirm = (): ReactElement => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    const verifyToken = async (): Promise<void> => {
      try {
        const tokenHash = searchParams.get('token_hash');
        const type = searchParams.get('type');
        const next = searchParams.get('next') || '/auth/update-password';

        if (!tokenHash || !type) {
          setError('Invalid reset link');
          setIsVerifying(false);
          return;
        }

        // Verify the OTP token
        const { error: verifyError } = await supabase.auth.verifyOtp({
          type: type as 'recovery' | 'email',
          token_hash: tokenHash
        });

        if (verifyError) {
          setError(verifyError.message);
          setIsVerifying(false);
          return;
        }

        // Token verified successfully, redirect to update password page
        navigate(next);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
        setError(errorMessage);
        setIsVerifying(false);
      }
    };

    verifyToken();
  }, [searchParams, navigate]);

  if (isVerifying) {
    return (
      <div className={styles.Container}>
        <div className={styles.Card}>
          <h1>Verifying token</h1>
          <p className={styles.Description}>Please wait while we verify your reset link...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.Container}>
        <div className={styles.Card}>
          <h1>Reset password error</h1>
          <div className={styles.Error}>{error}</div>
          <p className={styles.ErrorMessage}>Your reset password link has expired or is invalid.</p>
          <button className={styles.Button} onClick={() => navigate('/')}>
            Back to home
          </button>
        </div>
      </div>
    );
  }

  return null;
};
