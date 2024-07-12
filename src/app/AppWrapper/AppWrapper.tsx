import type { PropsWithChildren, ReactElement } from "react";
import { useState } from "react";
import { Container, Nav, Navbar, NavDropdown, NavLink } from "react-bootstrap";
import classNames from "classnames";

import { ContactModal } from "../../features/ContactModal/ContactModal";

import styles from "./AppWrapper.module.scss";

export const AppWrapper = ({ children }: PropsWithChildren): ReactElement => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className={styles.AppWrapper}>
      <Navbar className={styles.Navbar} collapseOnSelect expand="lg">
        <Container className={classNames(styles.Container, "container-fluid")}>
          <Navbar.Brand className={styles.Brand} href="/">
            Xeirographa
          </Navbar.Brand>
          <Navbar.Toggle
            className={styles.Toggle}
            aria-controls="responsive-navbar-nav"
          />
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="justify-content-end"
          >
            <Nav className={styles.Nav}>
              <NavLink href="/">Home</NavLink>
              <NavLink href="/lessons/1">Lessons</NavLink>
              <NavDropdown
                title="Help"
                id="collapsible-nav-dropdown"
                className={styles.NavDropdown} // TO-DO: Improve the appearance of this when the nav bar is collapsed
              >
                <NavDropdown.Item className={styles.DropdownItem} href="/guide">
                  Guide
                </NavDropdown.Item>
                <NavDropdown.Divider className={styles.Divider} />
                <NavDropdown.Item
                  className={styles.DropdownItem}
                  href="/glossary"
                >
                  Glossary
                </NavDropdown.Item>
                <NavDropdown.Divider className={styles.Divider} />
                <NavDropdown.Item
                  className={styles.DropdownItem}
                  href="/online-resources"
                >
                  Online resources
                </NavDropdown.Item>
              </NavDropdown>
              <NavLink href="/about">About</NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {children}
      <footer className={styles.Footer}>
        <NavLink
          className={styles.Link}
          role="link"
          tabIndex={0}
          onClick={() => setShowModal(true)}
          onKeyDown={() => setShowModal(true)}
        >
          Contact
        </NavLink>
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
