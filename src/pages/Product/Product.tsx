import React, { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { getProductForAnonym } from '../../api';
import { isAuth } from '../../utils/storage';
import { Product as ProductInterface } from '../../types/interfaces';
import styles from './Product.module.css';
import Slider from '../../components/Slider/Slider';
import ModalImg from '../../components/ModalImg/ModalImg';

const Product = () => {
  const params = useParams();
  const productKey = params.productKey as string;
  const [product, setGoodInfo] = useState<ProductInterface | undefined>();

  useEffect(() => {
    function fetchData() {
      if (!isAuth()) {
        getProductForAnonym(productKey)
          .then((info) => {
            setGoodInfo(info);
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
      }
    }

    fetchData();
  }, [productKey]);

  if (product === undefined) {
    return (
      <div className={styles.container}>
        <Spinner animation="border" />
      </div>
    );
  }

  if (product.variants[0] === undefined) {
    return (
      <div className={styles.container}>
        <div className={styles.text}>
          <p className={styles.name}>{product.name['en-US']}</p>
          <p>{product.description['en-US']}</p>
          <pre className={styles.price}>
            Price:{' '}
            <p>
              {`${product.masterVariant.prices[0].value.centAmount / 100},00`}
              {` ${product.masterVariant.prices[0].value.currencyCode}`}
            </p>
          </pre>
          <Button variant="outline-secondary" size="sm">
            Add cart
          </Button>
        </div>
        <div className={styles.img}>
          <Slider
            id={product.id}
            name={product.name}
            description={product.description}
            masterVariant={product.masterVariant}
            variants={product.variants}
          />
          <ModalImg
            id={product.id}
            name={product.name}
            description={product.description}
            masterVariant={product.masterVariant}
            variants={product.variants}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.text}>
        <p className={styles.name}>{product.name['en-US']}</p>
        <p>{product.description['en-US']}</p>
        <pre>
          Price:{' '}
          <p className={styles.sale}>
            {`${product.masterVariant.prices[0].value.centAmount / 100},00`}
            {` ${product.masterVariant.prices[0].value.currencyCode}`}
          </p>
        </pre>
        <pre>
          Discounted price:
          <p>
            {`${product.masterVariant.prices[0].discounted.value.centAmount / 100},00`}
            {` ${product.masterVariant.prices[0].discounted.value.currencyCode}`}
          </p>
        </pre>
        <Button variant="outline-secondary" size="sm">
          Add cart
        </Button>
      </div>
      <div className={styles.img}>
        <Slider
          id={product.id}
          name={product.name}
          description={product.description}
          masterVariant={product.masterVariant}
          variants={product.variants}
        />
        <ModalImg
          id={product.id}
          name={product.name}
          description={product.description}
          masterVariant={product.masterVariant}
          variants={product.variants}
        />
      </div>
    </div>
  );
};
export default Product;
