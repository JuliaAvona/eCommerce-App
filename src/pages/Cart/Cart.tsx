import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { addLineItem, createCart, deleteCart, getCart, getProfile, removeLineItem } from '../../api';
import Button from '../../components/button/Button';
import CartItem from '../../components/cartItem/CartItem';
import { Pages } from '../../types/enums';
import { ICart, IError, IMyCartDraft } from '../../types/interfaces';
import { getAccessToken } from '../../utils/storage';
import styles from './Cart.module.css';

const Cart = () => {
  const [cart, setCart] = useState<ICart | null>(null);
  const [totalPrice, setTotalPrice] = useState<number | null>(null);
  const [totalQuantity, setTotalQuantity] = useState<number | null>(null);

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

  useEffect(() => {
    if (cart) {
      setTotalPrice(cart.totalPrice.centAmount / 100);
      setTotalQuantity(cart.totalLineItemQuantity);
    }
  }, [cart]);
  function findProductInCartById(id: string) {
    if (cart && cart.lineItems)
      for (let i = 0; i < cart.lineItems.length; i += 1) {
        if (cart.lineItems[i].productId === id) {
          return cart.lineItems[i];
        }
      }
    return null;
  }

  const addToCart = async (
    setOnLoad: React.Dispatch<React.SetStateAction<boolean>>,
    productKey: string,
    newQuantity: number
  ) => {
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

  const removeToCart = async (
    setOnLoad: React.Dispatch<React.SetStateAction<boolean>>,
    productKey: string,
    newQuantity?: number
  ) => {
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

  const removeCart = async () => {
    try {
      const token = getAccessToken();
      if (cart && token) {
        await deleteCart(token, cart.id, cart.version);
        setCart(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return cart?.lineItems.length ? (
    <div className={styles.wrapper}>
      <div className={styles.product}>
        {cart.lineItems.map((product) => (
          <div key={product.id}>
            <CartItem
              name={product.name['en-US']}
              img={product.variant.images && product.variant.images.length > 0 ? product.variant.images[0].url : ''}
              id={product.productId || ''}
              price={product.variant.prices[0].value.centAmount}
              discount={product.variant.prices[0].discounted.value.centAmount}
              quantity={product.quantity || 0}
              addToCart={addToCart}
              removeToCart={removeToCart}
            />
          </div>
        ))}
      </div>
      <div className={styles.cart}>
        <h1 className={styles.h1}>Cart</h1>
        {totalPrice ? <div className={styles.text}>Total price: ${totalPrice},00</div> : null}
        {totalQuantity ? <div className={styles.text}>Items in cart: {totalQuantity}</div> : null}
        <Button onClick={() => console.log('!')}>Buy</Button>
        <Button onClick={() => removeCart()}>Remove all</Button>
      </div>
    </div>
  ) : (
    <div>
      <h1 className={styles.h1}>Cart is empty</h1>
      <div className={styles.text}>
        Continue shopping <Link to={Pages.main}>here</Link>
      </div>
    </div>
  );
};
export default Cart;
