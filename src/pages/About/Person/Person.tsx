import React from 'react';
import styles from './Person.module.scss';
import github from '../../../assets/img/github.png';
import cv from '../../../assets/img/cv.webp';

interface PersonProps {
  name: string;
  job?: string;
  githubLink?: string;
  cvLink?: string;
  imgSrc: string;
  info?: string;
}

const Person: React.FC<PersonProps> = ({ name, job, githubLink, cvLink, imgSrc, info }) => {
  return (
    <div className={styles.onePerson}>
      <img className={styles.photo} src={imgSrc} alt={`${name} Frontend Developer`} />
      <h2 className={styles.name}>{name}</h2>
      {job ? <p className={styles.job}>{job}</p> : null}
      {githubLink || cvLink ? (
        <div className={styles.links}>
          {githubLink ? (
            <div className={styles.gitLink}>
              <a href={githubLink} target="_blank" rel="noreferrer">
                <img src={github} alt="github logo" className={styles.logo} />
              </a>
            </div>
          ) : null}
          {cvLink ? (
            <div className={styles.cvLink}>
              <a href={cvLink} target="_blank" rel="noreferrer">
                <img src={cv} alt="cv logo" className={styles.logo} />
              </a>
            </div>
          ) : null}
        </div>
      ) : null}
      {info ? <h6 className={styles.info}>{info}</h6> : null}
    </div>
  );
};

export default Person;
