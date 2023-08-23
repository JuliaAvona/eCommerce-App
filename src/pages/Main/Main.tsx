import { Image, Nav } from 'react-bootstrap';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Main.module.css';
import previewImg from '../../assets/img/preview.jpg';
import Link from '../../components/Link/Link';
import { Pages } from '../../types/enums';
import { clearData, isAuth } from '../../utils/storage';

const Main = () => {
  const navigate = useNavigate();
  const logout = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    clearData();
    navigate(Pages.login);
  };

  return (
    <div className="m-auto">
      <div className={styles.green_background}>
        {' '}
        <Link href={Pages.main}>Home</Link>
        <Link href={Pages.signup}>SignUp</Link>
        {isAuth() ? (
          <Link href={Pages.login} onClick={(e) => logout(e)}>
            Logout
          </Link>
        ) : (
          <Link href={Pages.login}>Login</Link>
        )}
        <Link href={Pages.login}>Login</Link>
      </div>
      <Image className={styles.plant} src={previewImg} roundedCircle />
      <pre className={styles.text1}>Welcome to the eco goods store.</pre>
      <pre className={styles.text1}>We help save the planet for future generations.</pre>
    </div>
  );
};

export default Main;
