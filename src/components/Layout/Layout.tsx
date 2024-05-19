import type { ReactElement } from "react";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Container, Nav, Navbar, NavDropdown, NavLink } from "react-bootstrap";
import classNames from "classnames";

import { ContactModal } from "../ContactModal/ContactModal";

import styles from "./Layout.module.scss";

export const Layout = (): ReactElement => {
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
            <Nav className={classNames(styles.Nav)}>
              <NavLink href="/">Home</NavLink>
              <NavLink href="/lessons">Lessons</NavLink>
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
      <Outlet />
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
        <span style={{ color: "#c9ac5f" }}>|</span>
        <div className={styles.CopyrightText}>© 2024 Jacob W. Peterson</div>
        <a
          href="https://www.threads.net/@jacobwpeterson"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src="src/assets/threads.svg"
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
            src="src/assets/linkedin.svg"
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
            src="src/assets/academia.svg"
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
