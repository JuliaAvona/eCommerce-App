import React, { useState } from 'react';
import Button from '../button/Button';
import styles from './CartItem.module.css';

interface CartItemProps {
  name: string;
  img: string;
  id: string;
  price: number;
  discount?: number;
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

  const decrement = () => {
    if (quantity !== 0) removeToCart(setOnLoad, id, 1);
  };

  const increment = () => {
    addToCart(setOnLoad, id, 1);
  };

  return (
    <div className={styles.cardItem}>
      <img src={img} alt={name} className={styles.image} />
      <h1 className={styles.h1}>{name}</h1>
      <div className={styles.text}>Price: {`$${(discount || price) / 100},00`}</div>
      <div className={styles.text}>Count: {quantity}</div>
      {quantity ? <div className={styles.text}>Total price: ${((discount || price) / 100) * quantity},00</div> : null}

      <div className={styles.counter}>
        <Button disabled={onLoad || !quantity} onClick={decrement}>
          Remove
        </Button>
        <Button disabled={onLoad} onClick={increment}>
          Add
        </Button>
      </div>

      <Button disabled={onLoad} onClick={() => removeToCart(setOnLoad, id)}>
        Remove all
      </Button>
    </div>
  );
};

export default CartItem;
