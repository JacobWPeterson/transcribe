import type { PropsWithChildren, ReactElement } from "react";
import { useState } from "react";
import NavDropdown from "react-bootstrap/NavDropdown";

import { ContactModal } from "../../components/ContactModal/ContactModal";

import styles from "./AppWrapper.module.scss";

export const AppWrapper = ({ children }: PropsWithChildren): ReactElement => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className={styles.AppWrapper}>
      <div className={styles.Navbar}>
        <a className={styles.Brand} href="/">
          Xeirographa
        </a>
        <div className={styles.NavButtons}>
          <a
            className={styles.NavLink}
            href="/lessons/1"
            data-replace="Lessons"
          >
            <span>Lessons</span>
          </a>
          <NavDropdown
            title="Help"
            id="collapsible-nav-dropdown"
            className={styles.NavDropdown}
          >
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
        <span className={styles.VerticalDivider}>|</span>
        <div className={styles.CopyrightText}>
          © 2024{" "}
          <a
            className="PersonalSiteLink"
            href="https://www.jacobwpeterson.com"
            target="_blank"
            rel="noreferrer"
          >
            Jacob W. Peterson
          </a>
        </div>
        <a
          href="https://www.threads.net/@jacobwpeterson"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src="/icons/threads.svg"
            alt="threads icon"
            width="18"
            height="18"
          />
        </a>
        <a
          href="https://www.linkedin.com/in/jacobwpeterson/"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src="/icons/linkedin.svg"
            alt="LinkedIn icon"
            width="18"
            height="18"
          />
        </a>
        <a
          href="https://edinburgh.academia.edu/JacobPeterson"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src="/icons/academia.svg"
            alt="academia.edu icon"
            width="16"
            height="16"
          />
        </a>
      </footer>
      <ContactModal onHide={() => setShowModal(false)} show={showModal} />
    </div>
  );
};
