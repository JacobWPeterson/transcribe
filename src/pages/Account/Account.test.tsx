import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import * as useAuthModule from '@hooks/useAuth';
import { supabase } from '@config/supabase';

import { Account } from './Account';

const mockNavigate = vi.fn();

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: (): typeof mockNavigate => mockNavigate
  };
});

vi.mock('@hooks/useAuth', () => ({
  useAuth: vi.fn()
}));

vi.mock('@config/supabase', () => ({
  supabase: {
    auth: {
      signOut: vi.fn()
    },
    rpc: vi.fn()
  }
}));

const renderAccount = (): void => {
  render(
    <BrowserRouter>
      <Account />
    </BrowserRouter>
  );
};

describe('Account', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows loading state when auth is loading', () => {
    vi.spyOn(useAuthModule, 'useAuth').mockReturnValue({
      user: null,
      session: null,
      loading: true,
      signUp: vi.fn(),
      signIn: vi.fn(),
      signOut: vi.fn(),
      resetPassword: vi.fn()
    });

    renderAccount();

    expect(screen.getByText('Loading your account...')).toBeInTheDocument();
  });

  it('shows unauthorized message when user is not logged in', () => {
    vi.spyOn(useAuthModule, 'useAuth').mockReturnValue({
      user: null,
      session: null,
      loading: false,
      signUp: vi.fn(),
      signIn: vi.fn(),
      signOut: vi.fn(),
      resetPassword: vi.fn()
    });

    renderAccount();

    expect(screen.getByText('Access denied')).toBeInTheDocument();
    expect(screen.getByText('You must be logged in to view your account.')).toBeInTheDocument();
  });

  it('displays user email when logged in', () => {
    vi.spyOn(useAuthModule, 'useAuth').mockReturnValue({
      user: {
        email: 'test@example.com',
        id: '123',
        aud: '',
        role: '',
        user_metadata: {},
        app_metadata: { provider: 'email', providers: [] },
        created_at: ''
      },
      session: null,
      loading: false,
      signUp: vi.fn(),
      signIn: vi.fn(),
      signOut: vi.fn(),
      resetPassword: vi.fn()
    });

    renderAccount();

    expect(screen.getByText('test@example.com')).toBeInTheDocument();
  });

  it('calls resetPassword when reset password button is clicked', async () => {
    const mockResetPassword = vi.fn().mockResolvedValue({ error: null });

    vi.spyOn(useAuthModule, 'useAuth').mockReturnValue({
      user: {
        email: 'test@example.com',
        id: '123',
        aud: '',
        role: '',
        user_metadata: {},
        app_metadata: { provider: 'email', providers: [] },
        created_at: ''
      },
      session: null,
      loading: false,
      signUp: vi.fn(),
      signIn: vi.fn(),
      signOut: vi.fn(),
      resetPassword: mockResetPassword
    });

    renderAccount();

    const resetButton = screen.getByRole('button', { name: 'Reset password' });
    fireEvent.click(resetButton);

    await waitFor(() => {
      expect(mockResetPassword).toHaveBeenCalledWith('test@example.com');
    });

    expect(screen.getByText(/Password reset email sent/)).toBeInTheDocument();
  });

  it('shows delete confirmation modal when delete account button is clicked', () => {
    vi.spyOn(useAuthModule, 'useAuth').mockReturnValue({
      user: {
        email: 'test@example.com',
        id: '123',
        aud: '',
        role: '',
        user_metadata: {},
        app_metadata: { provider: 'email', providers: [] },
        created_at: ''
      },
      session: null,
      loading: false,
      signUp: vi.fn(),
      signIn: vi.fn(),
      signOut: vi.fn(),
      resetPassword: vi.fn()
    });

    renderAccount();

    const deleteButton = screen.getByRole('button', { name: 'Delete account' });
    fireEvent.click(deleteButton);

    expect(screen.getByText('Delete account?')).toBeInTheDocument();
    expect(screen.getByText(/This action cannot be undone/)).toBeInTheDocument();
  });

  it('closes delete confirmation modal when cancel is clicked', () => {
    vi.spyOn(useAuthModule, 'useAuth').mockReturnValue({
      user: {
        email: 'test@example.com',
        id: '123',
        aud: '',
        role: '',
        user_metadata: {},
        app_metadata: { provider: 'email', providers: [] },
        created_at: ''
      },
      session: null,
      loading: false,
      signUp: vi.fn(),
      signIn: vi.fn(),
      signOut: vi.fn(),
      resetPassword: vi.fn()
    });

    renderAccount();

    const deleteButton = screen.getByRole('button', { name: 'Delete account' });
    fireEvent.click(deleteButton);

    const cancelButton = screen.getByRole('button', { name: 'Cancel' });
    fireEvent.click(cancelButton);

    expect(screen.queryByText('Delete account?')).not.toBeInTheDocument();
  });

  it('deletes account and redirects when confirmed', async () => {
    vi.mocked(supabase.rpc).mockResolvedValue({ error: null } as never);
    vi.mocked(supabase.auth.signOut).mockResolvedValue({ error: null });

    vi.spyOn(useAuthModule, 'useAuth').mockReturnValue({
      user: {
        email: 'test@example.com',
        id: '123',
        aud: '',
        role: '',
        user_metadata: {},
        app_metadata: { provider: 'email', providers: [] },
        created_at: ''
      },
      session: null,
      loading: false,
      signUp: vi.fn(),
      signIn: vi.fn(),
      signOut: vi.fn(),
      resetPassword: vi.fn()
    });

    renderAccount();

    const deleteButton = screen.getByRole('button', { name: 'Delete account' });
    fireEvent.click(deleteButton);

    const confirmButton = screen.getByRole('button', { name: 'Yes, delete my account' });
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(supabase.rpc).toHaveBeenCalledWith('delete_user');
      expect(supabase.auth.signOut).toHaveBeenCalledWith({ scope: 'global' });
      expect(mockNavigate).toHaveBeenCalledWith('/account?deletion=confirmed', { replace: true });
    });
  });

  it('shows error when account deletion fails', async () => {
    vi.mocked(supabase.rpc).mockResolvedValue({ error: new Error('Deletion failed') } as never);

    vi.spyOn(useAuthModule, 'useAuth').mockReturnValue({
      user: {
        email: 'test@example.com',
        id: '123',
        aud: '',
        role: '',
        user_metadata: {},
        app_metadata: { provider: 'email', providers: [] },
        created_at: ''
      },
      session: null,
      loading: false,
      signUp: vi.fn(),
      signIn: vi.fn(),
      signOut: vi.fn(),
      resetPassword: vi.fn()
    });

    renderAccount();

    const deleteButton = screen.getByRole('button', { name: 'Delete account' });
    fireEvent.click(deleteButton);

    const confirmButton = screen.getByRole('button', { name: 'Yes, delete my account' });
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(screen.getByText('Deletion failed')).toBeInTheDocument();
    });
  });

  it('shows error when sign out after deletion fails', async () => {
    vi.mocked(supabase.rpc).mockResolvedValue({ error: null } as never);
    vi.mocked(supabase.auth.signOut).mockResolvedValue({
      // @ts-expect-error - Mocking signOut to return an error, even though the real function does not return an error object on success
      error: new Error('Sign out failed')
    });

    vi.spyOn(useAuthModule, 'useAuth').mockReturnValue({
      user: {
        email: 'test@example.com',
        id: '123',
        aud: '',
        role: '',
        user_metadata: {},
        app_metadata: { provider: 'email', providers: [] },
        created_at: ''
      },
      session: null,
      loading: false,
      signUp: vi.fn(),
      signIn: vi.fn(),
      signOut: vi.fn(),
      resetPassword: vi.fn()
    });

    renderAccount();

    const deleteButton = screen.getByRole('button', { name: 'Delete account' });
    fireEvent.click(deleteButton);

    const confirmButton = screen.getByRole('button', { name: 'Yes, delete my account' });
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(screen.getByText('Sign out failed')).toBeInTheDocument();
    });
  });

  it('shows deleted account confirmation page', () => {
    vi.spyOn(useAuthModule, 'useAuth').mockReturnValue({
      user: null,
      session: null,
      loading: false,
      signUp: vi.fn(),
      signIn: vi.fn(),
      signOut: vi.fn(),
      resetPassword: vi.fn()
    });

    // Mock the search params
    window.history.pushState({}, '', '/account?deletion=confirmed');

    renderAccount();

    expect(screen.getByText('Account deleted')).toBeInTheDocument();
    expect(
      screen.getByText(/your account and all associated data have been permanently deleted/i)
    ).toBeInTheDocument();
  });

  it('shows error when password reset fails', async () => {
    const mockResetPassword = vi.fn().mockResolvedValue({ error: { message: 'Reset failed' } });

    vi.spyOn(useAuthModule, 'useAuth').mockReturnValue({
      user: {
        email: 'test@example.com',
        id: '123',
        aud: '',
        role: '',
        user_metadata: {},
        app_metadata: { provider: 'email', providers: [] },
        created_at: ''
      },
      session: null,
      loading: false,
      signUp: vi.fn(),
      signIn: vi.fn(),
      signOut: vi.fn(),
      resetPassword: mockResetPassword
    });

    renderAccount();

    const resetButton = screen.getByRole('button', { name: 'Reset password' });
    fireEvent.click(resetButton);

    await waitFor(() => {
      expect(screen.getByText('Reset failed')).toBeInTheDocument();
    });
  });

  it('shows error when user has no email for password reset', async () => {
    const mockResetPassword = vi.fn();

    vi.spyOn(useAuthModule, 'useAuth').mockReturnValue({
      user: {
        email: undefined,
        id: '123',
        aud: '',
        role: '',
        user_metadata: {},
        app_metadata: { provider: 'email', providers: [] },
        created_at: ''
      },
      session: null,
      loading: false,
      signUp: vi.fn(),
      signIn: vi.fn(),
      signOut: vi.fn(),
      resetPassword: mockResetPassword
    });

    renderAccount();

    const resetButton = screen.getByRole('button', { name: 'Reset password' });
    fireEvent.click(resetButton);

    await waitFor(() => {
      expect(screen.getByText('Unable to determine your email address')).toBeInTheDocument();
      expect(mockResetPassword).not.toHaveBeenCalled();
    });
  });
});
