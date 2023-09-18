/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate, useParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import { addLineItem, createCart, getCart, getProduct, getProfile, removeLineItem } from '../../api';
import { ICart, IError, IMyCartDraft, IProduct } from '../../types/interfaces';
import styles from './Product.module.css';
import Slider from '../../components/slider/Slider';
import Button from '../../components/button/Button';
import { getAccessToken, isAuth } from '../../utils/storage';
import { Pages } from '../../types/enums';

const Product = () => {
  const params = useParams();
  const productKey = params.productKey as string;
  const [product, setProduct] = useState<IProduct | undefined>(undefined);
  const [cart, setCart] = useState<ICart | null>(null);
  const [quantity, setQuantity] = useState<number>(0);
  const [onLoad, setOnLoad] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    getProduct(productKey)
      .then((info) => {
        setProduct(info);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [productKey]);

  useEffect(() => {
    async function getCartData() {
      try {
        const token = getAccessToken();
        if (token) {
          try {
            const data = await getCart(token);
            setCart(data);
          } catch (error) {
            const e = error as AxiosError<IError>;
            if (e.response?.data.statusCode === 404) {
              try {
                const profile = await getProfile(token);
                const myCartDraft = {
                  currency: 'USD',
                  customerEmail: profile.email,
                } as IMyCartDraft;
                const data = await createCart(token, myCartDraft);
                console.log(data);
              } catch (_error) {
                console.log(_error);
              }
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    getCartData();
  }, []);

  function findProductInCartById(id: string) {
    if (cart && cart.lineItems)
      for (let i = 0; i < cart.lineItems.length; i += 1) {
        if (cart.lineItems[i].productId === id) {
          return cart.lineItems[i];
        }
      }
    return null;
  }

  useEffect(() => {
    if (cart) {
      const productInCart = findProductInCartById(productKey);
      if (productInCart?.quantity) setQuantity(productInCart.quantity);
      else setQuantity(0);
    }
  }, [cart]);

  const addToCart = async (newQuantity: number) => {
    try {
      const token = getAccessToken();
      if (cart && token) {
        setOnLoad(true);
        const data = await addLineItem(token, cart.version, cart.id, productKey, newQuantity);
        setOnLoad(false);
        setCart(data);
      }
    } catch (error) {
      setOnLoad(false);
      console.log(error);
    }
  };

  const removeToCart = async (newQuantity?: number) => {
    try {
      const token = getAccessToken();
      const productInCart = findProductInCartById(productKey);
      if (cart && token && productInCart) {
        setOnLoad(true);
        const data = await removeLineItem(token, cart.version, cart.id, productInCart.id, newQuantity);
        setCart(data);
        setOnLoad(false);
      }
    } catch (error) {
      setOnLoad(false);
      console.log(error);
    }
  };

  const decrement = () => {
    if (quantity !== 0) removeToCart(1);
  };

  const increment = () => {
    addToCart(1);
  };

  const handleLoginButton = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    navigate(Pages.login);
  };

  return product ? (
    <div className={styles.wrapper}>
      <div className={styles.product}>
        <div className={styles.description}>
          <div className={styles.h1}>{product.name['en-US']}</div>
          <div className={styles.text}>{product.description['en-US']}</div>
          <div className={styles.price}>
            <div className={styles.text}>Price:</div>
            <div className={styles.originalPrice}>
              ${`${product.masterVariant.prices[0].value.centAmount / 100},00`}
            </div>
            <div className={styles.currentPrice}>
              ${`${product.masterVariant.prices[0].discounted.value.centAmount / 100},00`}
            </div>
          </div>
          {quantity ? (
            <div className={styles.text}>
              Total price: ${(product.masterVariant.prices[0].discounted.value.centAmount / 100) * quantity},00
            </div>
          ) : null}

          {isAuth() ? (
            <div className={styles.counter}>
              <Button disabled={onLoad || !quantity} onClick={decrement}>
                Remove
              </Button>
              <span>{quantity}</span>
              <Button disabled={onLoad} onClick={increment}>
                Add
              </Button>
            </div>
          ) : (
            <Button onClick={(event) => handleLoginButton(event)}>Login to buy</Button>
          )}

          {quantity ? (
            <Button disabled={onLoad} onClick={() => removeToCart()}>
              Remove all from cart
            </Button>
          ) : null}
        </div>

        <div className={styles.carousel}>
          <Slider images={product.masterVariant.images} />
        </div>
      </div>
    </div>
  ) : (
    <div className={styles.container}>
      <Spinner animation="border" />
    </div>
  );
};
export default Product;
