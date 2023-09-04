import { useEffect, useState, useCallback } from 'react';
import { IProduct, IFilters } from '../types/interfaces';

export default function useSortProduct(initialProducts: IProduct[], initialFilters: IFilters) {
  const [products, setProducts] = useState<IProduct[]>(initialProducts);
  const [filters, setFilters] = useState<IFilters>(initialFilters);

  const applyFiltersAndSort = useCallback(() => {
    const filteredProducts = initialProducts
      .filter((card) => {
        const price = (card.masterVariant.prices[0].discounted.value.centAmount / 100) as number;

        switch (filters.sortPrice) {
          case '$1-10':
            return price <= 10;
          case '$11-25':
            return price > 11 && price <= 25;
          case '$26-70':
            return price > 26 && price <= 70;
          case '$71-200':
            return price > 71 && price <= 200;
          default:
            return true;
        }
      })
      .filter((card) => {
        const type = card.metaTitle['en-US'] as string;

        switch (filters.sortProductType) {
          case 'food':
          case 'home':
          case 'cosmetic':
            return type === filters.sortProductType;
          default:
            return true;
        }
      })
      .filter((card) => {
        const material = card.metaDescription['en-US'] as string;

        switch (filters.sortMaterials) {
          case 'wood':
          case 'glass':
          case 'metall':
          case 'plastic':
          case 'nature':
            return material === filters.sortMaterials;
          default:
            return true;
        }
      })
      .filter((card) => {
        const name = card.name['en-US'] as string;

        // Фильтрация по поисковому запросу
        return name.toLowerCase().includes(filters.searchQuery.toLowerCase());
      });

    const sortedProducts = filteredProducts.sort((card1, card2) => {
      const name1 = card1.name['en-US'] as string;
      const name2 = card2.name['en-US'] as string;
      const price1 = card1.masterVariant.prices[0].value.centAmount as number;
      const price2 = card2.masterVariant.prices[0].value.centAmount as number;

      switch (filters.sortProducts) {
        case 'A to Z':
          return name1.localeCompare(name2);
        case 'Z to A':
          return name2.localeCompare(name1);
        case 'ascending':
          return price1 - price2;
        case 'descending':
          return price2 - price1;
        default:
          return name1.localeCompare(name2);
      }
    });

    setProducts(sortedProducts);
  }, [initialProducts, filters]);

  useEffect(() => {
    applyFiltersAndSort();
  }, [applyFiltersAndSort]);

  return { products, filters, setFilters };
}
