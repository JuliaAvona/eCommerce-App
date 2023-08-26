import React, { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { useParams } from 'react-router-dom';
import { getProductForAnonym } from '../../api';
import { isAuth } from '../../utils/storage';
import { Product as ProductInterface } from '../../types/interfaces';
import styles from './Product.module.css';

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
      <p>{product.name['en-US']}</p>
      <p>{product.description['en-US']}</p>
      <img
        src={
          product.masterVariant.images && product.masterVariant.images.length > 0
            ? product.masterVariant.images[0].url
            : ''
        }
        alt={product.name['en-US']}
      />
      {}
    </div>
  );
};
export default Product;
