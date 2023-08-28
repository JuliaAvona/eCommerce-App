import React, { useEffect, useState } from 'react';
import { getProducts } from '../../api/index';
import styles from './Main.module.css';
import { Product } from '../../types/interfaces';
import OneCard from './OneCard/OneCard';
import Aside from './Aside/Aside';

const Main: React.FC = () => {
  const [goodsInfo, setGoodsInfo] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const info = await getProducts();
        setGoodsInfo(info);
      } catch (error) {
        console.log('Error fetching data:', error);
        throw error;
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
