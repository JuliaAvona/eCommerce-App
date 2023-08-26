import React, { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { getProductForAnonym } from '../../api';
import { isAuth } from '../../utils/storage';
import { Product as ProductInterface } from '../../types/interfaces';
import styles from './Product.module.css';
import Slider from '../../components/Slider/Slider';

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

  return (
    <div className={styles.container}>
      <div className={styles.text}>
        <p className={styles.name}>{product.name['en-US']}</p>
        <p>{product.description['en-US']}</p>
        <p>
          Price: {`${product.masterVariant.prices[0].value.centAmount / 100},00`}
          {` ${product.masterVariant.prices[0].value.currencyCode}`}
        </p>
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
      </div>
    </div>
  );
};
export default Product;
