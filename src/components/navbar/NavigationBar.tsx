import React, { FC } from 'react';
import NavbarToggle from 'react-bootstrap/NavbarToggle';
import NavbarCollapse from 'react-bootstrap/NavbarCollapse';
import { Nav, Navbar, NavbarBrand } from 'react-bootstrap';
import { Pages } from '../../types/enums';
import Link from '../Link/Link';
import Loginlink from '../Loginlink/Loginlink';
import styles from './Navbar.module.css';

const NavigationBar: FC = () => {
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
          <Loginlink />
        </Nav>
      </NavbarCollapse>
    </Navbar>
  );
};
export default NavigationBar;
