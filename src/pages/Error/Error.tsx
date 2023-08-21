import React from 'react';
import { Nav } from 'react-bootstrap';
import styles from './Error.module.css';
import { Pages } from '../../types/enums';

const Error = () => {
  return (
    <div className="mt=20">
      <div className={styles.text1}>
        <img
          className={styles.img}
          src="https://pictures.pibig.info/uploads/posts/2023-04/1680764618_pictures-pibig-info-p-grut-risunok-malenkii-krasivo-2.jpg"
          alt="holod"
        />
        <pre>Error Page 404</pre>
        <pre>It`s empty, try again later.</pre>
        <div className="btn btn-light">
          <Nav.Link href={Pages.main} className={styles.button_home}>
            To home page
          </Nav.Link>
        </div>
      </div>
    </div>
  );
};

export default Error;
