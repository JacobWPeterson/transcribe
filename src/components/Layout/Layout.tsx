import { ReactElement, useState } from 'react';
import { Outlet } from 'react-router-dom';
import {
  Navbar, NavDropdown,
  NavLink,
} from 'react-bootstrap';
import { ContactModal } from '../ContactModal/ContactModal';
import {
  AppWrapper,
  Copyright,
  StyledContainer,
  StyledFooter,
  StyledNavbar,
  StyledNavbarBrand,
  StyledNavbarToggle,
  StyledNavDropdown,
  StyledNavDropdownItem,
  StyledNav,
} from '../../styles';

import styles from './Layout.module.scss';

export const Layout = (): ReactElement => {
  const [showModal, setShowModal] = useState(false);

  return (
    <AppWrapper>
      <StyledNavbar borderTop="5px solid #c9ac5f" collapseOnSelect expand="lg">
        <StyledContainer className="container-fluid">
          <StyledNavbarBrand href="/">Xeirographa</StyledNavbarBrand>
          <StyledNavbarToggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
            <StyledNav className="justify-content-end">
              <NavLink id={styles.Link} href="/">Home</NavLink>
              <NavLink id={styles.Link} href="/lessons">Lessons</NavLink>
              <StyledNavDropdown title="Help" id="collapsible-nav-dropdown">
                <StyledNavDropdownItem href="/guide">Guide</StyledNavDropdownItem>
                <NavDropdown.Divider />
                <StyledNavDropdownItem href="/glossary">Glossary</StyledNavDropdownItem>
                <NavDropdown.Divider />
                <StyledNavDropdownItem href="/online-resources">Online resources</StyledNavDropdownItem>
                <NavDropdown.Divider />
                <StyledNavDropdownItem href="/further-reading">Further reading</StyledNavDropdownItem>
              </StyledNavDropdown>
              <NavLink id={styles.Link} href="/about">About</NavLink>
            </StyledNav>
          </Navbar.Collapse>
        </StyledContainer>
      </StyledNavbar>
      <Outlet />
      <StyledFooter>
        <NavLink
          id={styles.Link}
          color="#3e5276"
          role="link"
          tabIndex={0}
          onClick={() => setShowModal(true)}
          onKeyDown={() => setShowModal(true)}
        >
          Contact
        </NavLink>
        <span style={{ color: '#c9ac5f' }}>|</span>
        <Copyright>© 2024 Jacob W. Peterson</Copyright>
        <a href="https://www.threads.net/@jacobwpeterson" target="_blank" rel="noreferrer">
          <img src="src/assets/threads.svg" alt="threads icon" width="18" height="18" />
        </a>
        <a href="https://www.linkedin.com/in/jacobwpeterson/" target="_blank" rel="noreferrer">
          <img src="src/assets/linkedin.svg" alt="LinkedIn icon" width="18" height="18" />
        </a>
        <a href="https://edinburgh.academia.edu/JacobPeterson" target="_blank" rel="noreferrer">
          <img src="src/assets/academia.svg" alt="academia.edu icon" width="16" height="16" />
        </a>
      </StyledFooter>
      <ContactModal onHide={() => setShowModal(false)} show={showModal} />
    </AppWrapper>
  );
};
