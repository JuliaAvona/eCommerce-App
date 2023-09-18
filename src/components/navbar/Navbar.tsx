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
          <Link href={Pages.about}>About Us</Link>
        </div>
        <div className={styles.links}>
          {isAuth() ? <Link href={Pages.profile}>Profile</Link> : null}
          {isAuth() ? <Link href={Pages.cart}>Cart</Link> : null}
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
