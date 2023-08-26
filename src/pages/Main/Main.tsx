import React, { useEffect, useState } from 'react';
import { isAuth } from '../../utils/storage';
import { getProductsForAnonym } from '../../api/index';
import styles from './Main.module.css';

interface Product {
  id: string;
  name: { [key: string]: string };
  description: { [key: string]: string };
  masterVariant: {
    images: Array<{
      url: string;
      dimensions: {
        w: number;
        h: number;
      };
    }>;
  };
}

interface OneCardProps {
  name: string;
  description: string;
  img: string;
}

const OneCard: React.FC<OneCardProps> = ({ name, description, img }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardTitle}>{name}</div>
      <img className={styles.cardImg} src={img} alt={name} />
      <div className={styles.Description}>{description}</div>
    </div>
  );
};

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
          />
        </div>
      ))}
    </div>
  );
};

export default Main;
