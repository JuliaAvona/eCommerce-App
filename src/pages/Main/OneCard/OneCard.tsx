import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import MyLink from '../../../components/Link/Link';
import { OneCardProps } from '../../../types/interfaces';
import styles from './OneCard.module.css';

const OneCard: React.FC<OneCardProps> = ({ name, img, id, price, discount }) => {
  return (
    <Card style={{ width: '18rem' }} id={id}>
      <div className={styles.card}>
        <MyLink href={`/product/${id}`}>
          <Card.Img variant="top" src={img} alt={name} className={styles.cardImg} />
        </MyLink>
        <Card.Body>
          <MyLink href={`/product/${id}`}>
            <Card.Title className={styles.cardTitle}>{name}</Card.Title>
            <div className={styles.priceWrap}>
              <pre className={styles.discountPrice}>
                Price:
                <p className={styles.price}>{price}</p>
                <p>{discount}</p>
              </pre>
            </div>
          </MyLink>
          <Button variant="outline-secondary" size="sm">
            Add cart{' '}
          </Button>
        </Card.Body>
      </div>
    </Card>
  );
};

export default OneCard;
