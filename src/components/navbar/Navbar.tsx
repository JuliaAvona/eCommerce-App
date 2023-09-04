import React, { FC } from 'react';
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
    <div className={styles.wrapper}>
      <div className={styles.navbar}>
        <div className={styles.logo}>
          <Link href={Pages.default}>Eco</Link>
        </div>
        <div className={styles.links}>
          {isAuth() ? <Link href={Pages.profile}>Profile</Link> : null}
          {isAuth() ? null : <Link href={Pages.signup}>SignUp</Link>}
          {isAuth() ? (
            <Link href={Pages.login} onClick={(e) => logout(e)}>
              Logout
            </Link>
          ) : (
            <Link href={Pages.login}>Login</Link>
          )}
        </div>
      </div>
    </div>
  );
};
export default NavigationBar;

/*
  <Navbar className={styles.navbar}>
      <Link href={Pages.main}>
        <NavbarBrand className="m-1">Eco</NavbarBrand>
      </Link>
      <NavbarToggle aria-controls="responsive-navbar-nav" />
      <NavbarCollapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Link href={Pages.main}>Home</Link>
        </Nav>
        <Nav>
          {isAuth() ? <Link href={Pages.profile}>Profile</Link> : null}
          {isAuth() ? null : <Link href={Pages.signup}>SignUp</Link>}
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
*/
