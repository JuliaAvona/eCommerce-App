import React from 'react';
import styles from './OneCard.module.css';
import MyLink from '../../../components/Link/Link';
import { OneCardProps } from '../../../types/interfaces';

const OneCard: React.FC<OneCardProps> = ({ name, description, img, id, price }) => {
  return (
    <div className={styles.card} id={id}>
      <div className={styles.cardInfo}>
        <div className={styles.cardTitle}>{name}</div>
        <div className={styles.Description}>{description}</div>
        <div className={styles.price}>{price}</div>
      </div>
      <MyLink href={`/product/${id}`}>
        <img className={styles.cardImg} src={img} alt={name} />
      </MyLink>
    </div>
  );
};

export default OneCard;
