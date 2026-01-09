import type { PropsWithChildren, ReactElement } from 'react';
import { useEffect, useState } from 'react';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { ContactModal } from '../../components/ContactModal/ContactModal';
import { SettingsMenu } from '../../components/SettingsMenu/SettingsMenu';
import { useTheme } from '../../contexts/ThemeContext';

import styles from './AppWrapper.module.scss';

export const AppWrapper = ({ children }: PropsWithChildren): ReactElement => {
  const [showModal, setShowModal] = useState(false);
  const { settings } = useTheme();

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

    root.setAttribute('data-font-size', settings.fontSize);

    // Update body styles
    document.body.style.backgroundColor = 'var(--background)';
    document.body.style.color = 'var(--text)';
  }, [settings]);

  return (
    <div className={styles.AppWrapper}>
      <div className={styles.Navbar}>
        <a className={styles.Brand} href="/">
          Xeirographa
        </a>
        <div className={styles.NavButtons}>
          <a className={styles.NavLink} href="/lessons/1" data-replace="Lessons">
            <span>Lessons</span>
          </a>
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
          © 2026{' '}
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
    </div>
  );
};
