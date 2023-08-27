import React, { useEffect, useState } from 'react';
import { isAuth } from '../../utils/storage';
import { getProductsForAnonym } from '../../api/index';
import styles from './Main.module.css';
import { Product } from '../../types/interfaces';
import OneCard from './OneCard/OneCard';
import Aside from './Aside/Aside';

const Main: React.FC = () => {
  const [goodsInfo, setGoodsInfo] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchData() {
      if (!isAuth()) {
        try {
          const info = await getProductsForAnonym();
          setGoodsInfo(info);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    }

    fetchData();
  }, []);

  return (
    <main className={styles.appWrapper}>
      <Aside />
      <div className={styles.container}>
        {goodsInfo.map((product) => (
          <div key={product.id}>
            <OneCard
              name={product.name['en-US']}
              description={product.description['en-US']}
              img={
                product.masterVariant.images && product.masterVariant.images.length > 0
                  ? product.masterVariant.images[0].url
                  : ''
              }
              id={product.id}
              price={`${String(product.masterVariant.prices[0].value.centAmount).slice(0, -2)}.00 ${
                product.masterVariant.prices[0].value.currencyCode
              }`}
            />
          </div>
        ))}
      </div>
    </main>
  );
};

export default Main;
