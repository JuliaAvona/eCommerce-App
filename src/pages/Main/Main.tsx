import React, { useEffect, useState } from 'react';
import { isAuth } from '../../utils/storage';
import { getProductsForAnonym } from '../../api/index';
import styles from './Main.module.css';
import MyLink from '../../components/Link/Link';
import { Product } from '../../types/interfaces';

interface OneCardProps {
  name: string;
  description: string;
  img: string;
  id: string;
}

const OneCard: React.FC<OneCardProps> = ({ name, description, img, id }) => {
  return (
    <div className={styles.card} id={id}>
      <div className={styles.cardTitle}>{name}</div>
      <MyLink href={`/product/${id}`}>
        <img className={styles.cardImg} src={img} alt={name} />
      </MyLink>
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
            id={product.id}
          />
        </div>
      ))}
    </div>
  );
};

export default Main;
