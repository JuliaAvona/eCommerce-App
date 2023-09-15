import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../button/Button';
import styles from './CartItem.module.css';

interface CartItemProps {
  name: string;
  img: string;
  id: string;
  price: string;
  discount?: string;
  quantity: number;
  addToCart: (
    setOnLoad: React.Dispatch<React.SetStateAction<boolean>>,
    productKey: string,
    newQuantity: number
  ) => Promise<void>;
  removeToCart: (
    setOnLoad: React.Dispatch<React.SetStateAction<boolean>>,
    productKey: string,
    newQuantity?: number
  ) => Promise<void>;
}

const CartItem: React.FC<CartItemProps> = ({ name, img, id, price, discount, quantity, addToCart, removeToCart }) => {
  const [onLoad, setOnLoad] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleCardKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      navigate(`/product/${id}`);
    }
  };

  const decrement = () => {
    if (quantity !== 0) removeToCart(setOnLoad, id, 1);
  };

  const increment = () => {
    addToCart(setOnLoad, id, 1);
  };

  return (
    <div className={styles.card} onKeyDown={handleCardKeyDown} role="button" tabIndex={0}>
      <img src={img} alt={name} className={styles.image} />
      <h2 className={styles.title}>{name}</h2>
      <div className={styles.price}>
        {discount && <span className={styles.originalPrice}>${price}</span>}
        <span className={styles.currentPrice}>${discount || price}</span>
      </div>

      <div className={styles.counter}>
        <Button disabled={onLoad || !quantity} onClick={decrement}>
          Remove
        </Button>
        <span>{quantity}</span>
        <Button disabled={onLoad} onClick={increment}>
          Add
        </Button>
      </div>

      <Button disabled={onLoad} onClick={() => removeToCart(setOnLoad, id)}>
        Remove all from cart
      </Button>
    </div>
  );
};

export default CartItem;
