import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/Button/Button';
import { OneCardProps } from '../../../types/interfaces';
import styles from './OneCard.module.css';

const OneCard: React.FC<OneCardProps> = ({ name, img, id, price, discount }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/product/${id}`);
  };

  const handleCardKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      navigate(`/product/${id}`);
    }
  };

  return (
    <div className={styles.card} onClick={handleCardClick} onKeyDown={handleCardKeyDown} role="button" tabIndex={0}>
      <img src={img} alt={name} className={styles.image} />
      <h2 className={styles.title}>{name}</h2>
      <div className={styles.price}>
        {discount && <span className={styles.originalPrice}>${price}</span>}
        <span className={styles.currentPrice}>${discount || price}</span>
      </div>
      <Button onClick={() => {}}>Add to cart</Button>
    </div>
  );
};

export default OneCard;
