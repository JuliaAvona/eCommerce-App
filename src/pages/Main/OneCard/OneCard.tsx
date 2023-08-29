import React from 'react';
import Button from 'react-bootstrap/Button';
import MyLink from '../../../components/Link/Link';
import { OneCardProps } from '../../../types/interfaces';
import styles from './OneCard.module.css';

const OneCard: React.FC<OneCardProps> = ({ name, description, img, id, price, discount }) => {
  return (
    <div className={styles.card} id={id}>
      <div className={styles.cardInfo}>
        <MyLink href={`/product/${id}`}>
          <div className={styles.cardTitle}>{name}</div>
        </MyLink>
        <div className={styles.Description}>{description}</div>
        <div className={styles.priceWrap}>
          <pre className={styles.discountPrice}>
            <p className={styles.price}>{price}</p>
            Discounted price:
            <p>{discount}</p>
          </pre>
        </div>
        <Button variant="outline-secondary" size="sm">
          Add cart
        </Button>
      </div>
      <MyLink href={`/product/${id}`}>
        <img className={styles.cardImg} src={img} alt={name} />
      </MyLink>
    </div>
  );
};

export default OneCard;
