import React, { useEffect, useState } from 'react';
import { getProducts } from '../../api/index';
import styles from './Main.module.css';
import { Product, IFilters } from '../../types/interfaces';
import OneCard from './OneCard/OneCard';
import Aside from './Aside/Aside';

interface MainProps {
  filters: IFilters;
}

const Main: React.FC<MainProps> = ({ filters }) => {
  const { view, sortProducts, sortPrice, sortProductType, sortMaterials } = filters;
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
  }, [view, sortProducts, sortPrice, sortProductType, sortMaterials]);

  return (
    <main className={styles.appWrapper}>
      <Aside />
      <div className={view === 'As Icons' ? styles.containerIcons : styles.containerList}>
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
              price={`${product.masterVariant.prices[0].value.centAmount / 100}.00 ${
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
