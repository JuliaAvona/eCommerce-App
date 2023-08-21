import React, { FC } from 'react';
import NavbarToggle from 'react-bootstrap/NavbarToggle';
import NavbarCollapse from 'react-bootstrap/NavbarCollapse';
import { Nav, Navbar, NavbarBrand } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Pages } from '../../types/enums';
import styles from './Navbar.module.css';
import { isAuth, clearData } from '../../utils/storage';
import Link from '../Link/Link';

const NavigationBar: FC = () => {
  const navigate = useNavigate();
  const logout = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    clearData();
    navigate(Pages.login);
  };

  return (
    <Navbar className={styles.navbar}>
      <NavbarBrand className="m-1" href={Pages.main}>
        Eco
      </NavbarBrand>
      <NavbarToggle aria-controls="responsive-navbar-nav" />
      <NavbarCollapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Link href={Pages.main}>Home</Link>
        </Nav>
        <Nav>
          <Link href={Pages.signup}>SignUp</Link>
          {isAuth() ? (
            <Link href={Pages.login} onClick={(e) => logout(e)}>
              Logout
            </Link>
          ) : (
            <Link href={Pages.login}>Login</Link>
          )}
        </Nav>
      </NavbarCollapse>
    </Navbar>
  );
};
export default NavigationBar;
