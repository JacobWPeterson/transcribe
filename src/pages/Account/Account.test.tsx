import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import * as useAuthModule from '@hooks/useAuth';

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
    }
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
});
