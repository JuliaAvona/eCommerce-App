import styles from './Main.module.css';
import {Link} from "react-router-dom";
import {Pages} from "../../types/enums";
import {Image} from "react-bootstrap";

const Main = () => {
  return (
          <div className={"m-auto"}>
              <Image className={styles.plant} src="https://uokansk.ucoz.ru/document/news_2019/aprel/slet_liderov-rostok.jpg" roundedCircle />
              <pre className={styles.text1} >Welcome to the eco goods store. We help save the planet for future generations.</pre>
          </div>
  );
};

export default Main;
