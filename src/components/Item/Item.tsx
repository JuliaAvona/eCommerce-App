import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import styles from './Item.module.css';

const Item = () => {
  const testItem = {
    id: 'e7ba4c75-b1bb-483d-94d8-2c4a10f78472',
    version: 2,
    masterData: {
      current: {
        categories: [
          {
            id: 'cf6d790a-f027-4f46-9a2b-4bc9a31066fb',
            typeId: 'category',
          },
        ],
        description: {
          en: 'Sample description',
        },
        masterVariant: {
          attributes: [],
          id: 1,
          images: [
            {
              dimensions: {
                h: 1400,
                w: 1400,
              },
              url: 'https://commercetools.com/cli/data/253245821_1.jpg',
            },
          ],
          prices: [
            {
              value: {
                type: 'centPrecision',
                fractionDigits: 2,
                centAmount: 10000,
                currencyCode: 'EUR',
              },
              id: '753472a3-ddff-4e0f-a93b-2eb29c90ba54',
            },
          ],
          sku: 'sku_MB_PREMIUM_TECH_T_variant1_1369226795424',
        },
        name: {
          en: 'MB PREMIUM TECH T',
        },
        slug: {
          en: 'mb-premium-tech-t1369226795424',
        },
        variants: [],
        searchKeywords: {},
      },
      hasStagedChanges: false,
      published: true,
      staged: {
        categories: [
          {
            id: 'cf6d790a-f027-4f46-9a2b-4bc9a31066fb',
            typeId: 'category',
          },
        ],
        description: {
          en: 'Sample description',
        },
        masterVariant: {
          attributes: [],
          id: 1,
          images: [
            {
              dimensions: {
                h: 1400,
                w: 1400,
              },
              url: 'https://24tv.ua/resources/photos/news/202204/1961563.jpg?v=1661254059000&w=840&h=472&fit=cover&output=webp&q=50',
            },
          ],
          prices: [
            {
              value: {
                type: 'centPrecision',
                fractionDigits: 2,
                centAmount: 10000,
                currencyCode: 'EUR',
              },
              id: '753472a3-ddff-4e0f-a93b-2eb29c90ba54',
            },
          ],
          sku: 'sku_MB_PREMIUM_TECH_T_variant1_1369226795424',
        },
        name: {
          en: 'MB PREMIUM TECH T',
        },
        slug: {
          en: 'mb-premium-tech-t1369226795424',
        },
        variants: [],
        searchKeywords: {},
      },
    },
    productType: {
      id: '24f510c3-f334-4099-94e2-d6224a8eb919',
      typeId: 'product-type',
    },
    taxCategory: {
      id: 'f1e10e3a-45eb-49d8-ad0b-fdf984202f59',
      typeId: 'tax-category',
    },
    createdAt: '1970-01-01T00:00:00.001Z',
    lastModifiedAt: '1970-01-01T00:00:00.001Z',
  };
  return (
    <Card className={styles.div}>
      <Card.Img
        variant="top"
        src="https://24tv.ua/resources/photos/news/202204/1961563.jpg?v=1661254059000&w=840&h=472&fit=cover&output=webp&q=50"
      />
      <Card.Body>
        <Card.Title>{testItem.masterData.current.name.en}</Card.Title>
        <h6>{testItem.masterData.current.description.en}</h6>
        <h6>
          Price:{testItem.masterData.current.masterVariant.prices[0].value.centAmount}
          {testItem.masterData.current.masterVariant.prices[0].value.currencyCode}
        </h6>
        <h6>
          Price after sale:{testItem.masterData.current.masterVariant.prices[0].value.centAmount}{' '}
          {testItem.masterData.current.masterVariant.prices[0].value.currencyCode}
        </h6>
        <Button variant="outline-secondary" size="sm">
          Add cart
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Item;