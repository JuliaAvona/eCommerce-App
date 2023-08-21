import { Image } from 'react-bootstrap';
import styles from './Main.module.css';
import previewImg from '../../assets/img/preview.jpg';

const Main = () => {
  return (
    <div className="m-auto">
      <Image className={styles.plant} src={previewImg} roundedCircle />
      <pre className={styles.text1}>
        Welcome to the eco goods store. We help save the planet for future generations.
      </pre>
      <Image
        className={styles.plant}
        src="https://uokansk.ucoz.ru/document/news_2019/aprel/slet_liderov-rostok.jpg"
        roundedCircle
      />
      <pre className={styles.text1}>Welcome to the eco goods store.</pre>
      <pre className={styles.text1}>We help save the planet for future generations.</pre>
    </div>
  );
};

export default Main;
