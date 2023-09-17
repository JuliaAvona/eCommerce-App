import { useNavigate } from 'react-router-dom';
import styles from './Error.module.css';
import { Pages } from '../../types/enums';
import error from '../../assets/img/error.jpg';
import Button from '../../components/button/Button';

const Error = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <div className={styles.error}>
        <img className={styles.img} src={error} alt="Error" />
        <div className={styles.h1}>It`s empty, try again later.</div>
        <Button onClick={() => navigate(Pages.main)}>To home page</Button>
      </div>
    </div>
  );
};

export default Error;
