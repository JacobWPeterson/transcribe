import type { PropsWithChildren, ReactElement } from 'react';
import { useEffect, useState } from 'react';
import { User } from 'react-feather';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { AuthModal } from '@components/AuthModal/AuthModal';
import { AuthMode } from '@components/AuthModal/authModal.enum';
import { ContactModal } from '@components/ContactModal/ContactModal';
import { SettingsMenu } from '@components/SettingsMenu/SettingsMenu';
import { useAuth } from '@hooks/useAuth';
import { useTheme } from '@hooks/useTheme';
import { ManifestSets } from '@files/manifests';
import {
  migrateLocalProgressToSupabase,
  determineLessonToResumeSync,
  getStoredLessonIdsSync
} from '@utils/storageSync';

import styles from './AppWrapper.module.scss';

export const AppWrapper = ({ children }: PropsWithChildren): ReactElement => {
  const [showModal, setShowModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>(AuthMode.SIGNIN);
  const [savedLessonIds, setSavedLessonIds] = useState<number[]>([]);
  const [resumeLessonId, setResumeLessonId] = useState<number | null>(null);
  const { settings } = useTheme();
  const { user, signOut, loading: authLoading } = useAuth();

  // Migrate localStorage data to Supabase when user first signs in
  useEffect(() => {
    if (user) {
      const migrationKey = `transcribe-migration-${user.id}`;
      const hasMigrated = localStorage.getItem(migrationKey);

      if (!hasMigrated) {
        migrateLocalProgressToSupabase(user)
          .then(() => {
            localStorage.setItem(migrationKey, 'true');
          })
          .catch(error => {
            console.error('Migration failed:', error);
          });
      }
    }
  }, [user]);

  // Load saved lesson IDs and determine lesson to resume
  useEffect(() => {
    const loadLessonData = async (): Promise<void> => {
      const ids = await getStoredLessonIdsSync(user, ManifestSets.CORE);
      setSavedLessonIds(ids);

      if (ids.length > 0) {
        const lessonId = await determineLessonToResumeSync(user, ids);
        setResumeLessonId(lessonId);
      } else {
        setResumeLessonId(null);
      }
    };

    loadLessonData();
  }, [user?.id]);

  useEffect(() => {
    const root = document.documentElement;
    if (settings.darkMode) {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
    }

    if (settings.highContrast) {
      root.setAttribute('data-high-contrast', 'true');
    } else {
      root.removeAttribute('data-high-contrast');
    }

    if (settings.reducedMotion) {
      root.setAttribute('data-reduced-motion', 'true');
    } else {
      root.removeAttribute('data-reduced-motion');
    }

    root.setAttribute('data-font-size', settings.fontSize);

    // Update body styles
    document.body.style.backgroundColor = 'var(--background)';
    document.body.style.color = 'var(--text)';
  }, [settings]);

  const handleSignOut = async (): Promise<void> => {
    await signOut();
    // Optionally reload to clear state
    window.location.reload();
  };

  const openAuthModal: (mode: AuthMode) => void = mode => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  return (
    <div className={styles.AppWrapper}>
      <div className={styles.Navbar}>
        <a className={styles.Brand} href="/">
          Xeirographa
        </a>
        <div className={styles.NavButtons}>
          <NavDropdown title="Lessons" id="collapsible-nav-dropdown" className={styles.NavDropdown}>
            <div className={styles.DropdownItem}>
              <a href="/lessons/1">Get started</a>
            </div>
            {savedLessonIds.length > 0 && resumeLessonId !== null && (
              <>
                <div className={styles.Divider} />
                <div className={styles.DropdownItem}>
                  <a href={`/lessons/${resumeLessonId}`}>Resume</a>
                </div>
              </>
            )}
            <div className={styles.Divider} />
            <div className={styles.DropdownItem}>
              <a href="/dashboard">Dashboard</a>
            </div>
          </NavDropdown>
          <NavDropdown title="Help" id="collapsible-nav-dropdown" className={styles.NavDropdown}>
            <div className={styles.DropdownItem}>
              <a href="/guide">Guide</a>
            </div>
            <div className={styles.Divider} />
            <div className={styles.DropdownItem}>
              <a href="/glossary">Glossary</a>
            </div>
            <div className={styles.Divider} />
            <div className={styles.DropdownItem}>
              <a href="/online-resources">Online resources</a>
            </div>
          </NavDropdown>
          <a className={styles.NavLink} href="/about" data-replace="About">
            <span>About</span>
          </a>
          {authLoading ? (
            // Show placeholder while loading to prevent icon from disappearing
            <div className={styles.PlaceholderIcon} aria-label="Loading user account" />
          ) : user ? (
            <NavDropdown
              title={<User size={settings.fontSize === 'L' ? 22 : 18} />}
              id="account-dropdown"
              className={styles.NavDropdown}
              aria-label="User account"
            >
              <div className={styles.DropdownItem}>
                <span className={styles.UserEmail}>{user.email}</span>
              </div>
              <div className={styles.Divider} />
              <div className={styles.DropdownItem}>
                <a href="/account">Account settings</a>
              </div>
              <div className={styles.Divider} />
              <div className={styles.DropdownItem}>
                <button onClick={handleSignOut} className={styles.SignOutButton}>
                  Sign out
                </button>
              </div>
            </NavDropdown>
          ) : (
            <button className={styles.AuthButton} onClick={() => openAuthModal(AuthMode.SIGNIN)}>
              Sign in
            </button>
          )}
          <SettingsMenu />
        </div>
      </div>
      {children}
      <footer className={styles.Footer}>
        <div
          className={styles.Link}
          role="link"
          tabIndex={0}
          onClick={() => setShowModal(true)}
          onKeyDown={() => setShowModal(true)}
        >
          Contact
        </div>
        <div className={styles.VerticalDivider} />
        <div className={styles.CopyrightText}>
          © {new Date().getFullYear()}{' '}
          <a
            className="PersonalSiteLink"
            href="https://www.jacobwpeterson.com"
            target="_blank"
            rel="noreferrer"
          >
            Jacob W. Peterson
          </a>
        </div>
      </footer>
      <ContactModal onHide={() => setShowModal(false)} show={showModal} />
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        defaultMode={authMode}
      />
    </div>
  );
};
