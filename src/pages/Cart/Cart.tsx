import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { addLineItem, createCart, getCart, getProfile, removeLineItem } from '../../api';
import CartItem from '../../components/cartItem/CartItem';
import { ICart, IError, IMyCartDraft } from '../../types/interfaces';
import { getAccessToken } from '../../utils/storage';
import styles from './Cart.module.css';

const Cart = () => {
  const [cart, setCart] = useState<ICart | null>(null);

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

  return cart?.lineItems.length ? (
    <div className={styles.wrapper}>
      <div className={styles.product}>
        {cart.lineItems.map((product) => (
          <div key={product.id}>
            <CartItem
              name={product.name['en-US']}
              img={product.variant.images && product.variant.images.length > 0 ? product.variant.images[0].url : ''}
              id={product.productId || ''}
              price={`${product.variant.prices[0].value.centAmount / 100}.00 ${
                product.variant.prices[0].value.currencyCode
              }`}
              discount={`${product.variant.prices[0].discounted.value.centAmount / 100},00 ${
                product.variant.prices[0].value.currencyCode
              }`}
              quantity={product.quantity || 0}
              addToCart={addToCart}
              removeToCart={removeToCart}
            />
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div className={styles.wrapper}>Cart is empty</div>
  );
};
export default Cart;
