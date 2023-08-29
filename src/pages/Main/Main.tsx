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
        {goodsInfo
          .sort((card1, card2) => {
            const name1 = card1.name['en-US'] as string;
            const name2 = card2.name['en-US'] as string;
            const price1 = card1.masterVariant.prices[0].value.centAmount as number;
            const price2 = card2.masterVariant.prices[0].value.centAmount as number;

            if (filter.sortProducts === 'A to Z') {
              return name1.localeCompare(name2);
            }

            if (filter.sortProducts === 'Z to A') {
              return name2.localeCompare(name1);
            }

            if (filter.sortProducts === 'ascending') {
              return price1 - price2;
            }

            if (filter.sortProducts === 'descending') {
              return price2 - price1;
            }

            return name1.localeCompare(name2);
          })
          .filter((card) => {
            const price = (card.masterVariant.prices[0].value.centAmount / 100) as number;

            if (filter.sortPrice === '$1-10') {
              return price <= 10;
            }

            if (filter.sortPrice === '$11-25') {
              return price > 11 && price <= 25;
            }

            if (filter.sortPrice === '$26-70') {
              return price > 26 && price <= 70;
            }

            if (filter.sortPrice === '$71-200') {
              return price > 71 && price <= 200;
            }

            return price >= 0;
          })
          .map((product) => (
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
