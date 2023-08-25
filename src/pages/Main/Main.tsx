import { Image } from 'react-bootstrap';
import React from 'react';
import styles from './Main.module.css';
import previewImg from '../../assets/img/preview.jpg';

const Main = () => {
  return (
    <div className="m-auto">
      <Image className={styles.plant} src={previewImg} roundedCircle />
      <pre className={styles.text1}>Welcome to the eco goods store.</pre>
      <pre className={styles.text1}>We help save the planet for future generations.</pre>
      <pre className={styles.text1}>Welcome to Sprint 3</pre>
    </div>
  );
};

export default Main;
