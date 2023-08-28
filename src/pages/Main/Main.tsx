import React, { useEffect, useState, useCallback } from 'react';
import { getProducts } from '../../api/index';
import styles from './Main.module.css';
import { Product, IFilters } from '../../types/interfaces';
import OneCard from './OneCard/OneCard';
import Aside from './Aside/Aside';

const Main = () => {
  const [goodsInfo, setGoodsInfo] = useState<Product[]>([]);
  const [filter, setFilter] = useState<IFilters>({
    view: 'As Icons',
    sortProducts: 'By name, A to Z',
    sortPrice: '$01.00 - 10.00',
    sortProductType: 'Cosmetic',
    sortMaterials: 'Wood',
  });

  const handleFilterChange = useCallback((key: keyof IFilters, value: string) => {
    setFilter((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  }, []);

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
      <Aside filterChange={handleFilterChange} />
      <div className={filter.view === 'As Icons' ? styles.containerIcons : styles.containerList}>
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
