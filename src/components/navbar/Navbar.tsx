import React from 'react';
import { Nav, Navbar, NavbarBrand } from 'react-bootstrap';
import NavbarToggle from 'react-bootstrap/NavbarToggle';
import NavbarCollapse from 'react-bootstrap/NavbarCollapse';
import { Pages } from '../../types/enums';
import styles from './Navbsr.module.css';
import Link from '../Link/Link';

const Navigation = () => {
  return (
    <Navbar className={styles.main_navbar}>
      <NavbarBrand className="m-1" href={Pages.main}>
        {' '}
        Eco{' '}
      </NavbarBrand>
      <NavbarToggle aria-controls="responsive-navbar-nav" />
      <NavbarCollapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Link href={Pages.main}>Home</Link>
        </Nav>
        <Nav>
          <Link href={Pages.signup}>SignUp</Link>
          <Link href={Pages.login}>Login</Link>
        </Nav>
      </NavbarCollapse>
    </Navbar>
  );
};
export default Navigation;
