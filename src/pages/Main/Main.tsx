import React, { useEffect, useState, useCallback } from 'react';
import { getProducts } from '../../api/index';
import styles from './Main.module.css';
import { IProduct, IFilters } from '../../types/interfaces';
import OneCard from './OneCard/OneCard';
import Aside from './Aside/Aside';
import useSortProduct from '../../hooks/useSortProduct';

const Main = () => {
  const [goodsInfo, setGoodsInfo] = useState<IProduct[]>([]);
  const { products, filters, setFilters } = useSortProduct(goodsInfo, {
    view: 'As Icons',
    sortProducts: 'By name, A to Z',
    sortPrice: '$01.00 - 10.00',
    sortProductType: 'Cosmetic',
    sortMaterials: 'Wood',
    searchQuery: '',
  });

  const handleFilterChange = useCallback(
    (key: keyof IFilters, value: string) => {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [key]: value,
      }));
    },
    [setFilters]
  );

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
    <main className={styles.wrapper}>
      <Aside filterChange={handleFilterChange} />
      <div className={filters.view === 'As Icons' ? styles.containerIcons : styles.containerList}>
        {products.map((product) => (
          <div key={product.id}>
            <OneCard
              name={product.name['en-US']}
              img={
                product.masterVariant.images && product.masterVariant.images.length > 0
                  ? product.masterVariant.images[0].url
                  : ''
              }
              id={product.id}
              price={`${product.masterVariant.prices[0].value.centAmount / 100}.00 ${
                product.masterVariant.prices[0].value.currencyCode
              }`}
              discount={`${product.masterVariant.prices[0].discounted.value.centAmount / 100},00 ${
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
