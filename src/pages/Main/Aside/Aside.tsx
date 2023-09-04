import React, { useState } from 'react';
import { IFilters } from '../../../types/interfaces';
import Select from '../../../components/select/Select';
import Button from '../../../components/button/Button';
import Input from '../../../components/input/Input';
import styles from './Aside.module.css';

interface AsideProps {
  filterChange: (key: keyof IFilters, value: string) => void;
}

const Aside = ({ filterChange }: AsideProps) => {
  const [view, setView] = useState<string>('As Icons');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortProducts, setSortProducts] = useState<string>('A to Z');
  const [sortPrice, setSortPrice] = useState<string>('all');
  const [sortProductType, setSortProductType] = useState<string>('all');
  const [sortMaterials, setSortMaterials] = useState<string>('all');

  const handleViewChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const { value } = event.target;
    setView(value);
    filterChange('view', value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    setSearchQuery(value);
    filterChange('searchQuery', value);
  };

  const handleSortProductsChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const { value } = event.target;
    setSortProducts(value);
    filterChange('sortProducts', value);
  };

  const handleSortPriceChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const { value } = event.target;
    setSortPrice(value);
    filterChange('sortPrice', value);
  };

  const handleSortProductType = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const { value } = event.target;
    setSortProductType(value);
    filterChange('sortProductType', value);
  };

  const handleSortMaterials = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const { value } = event.target;
    setSortMaterials(value);
    filterChange('sortMaterials', value);
  };

  const resetFilter = (): void => {
    setView('As Icons');
    setSearchQuery('');
    setSortProducts('A to Z');
    setSortPrice('all');
    setSortProductType('all');
    setSortMaterials('all');
    filterChange('searchQuery', '');
    filterChange('view', 'As Icons');
    filterChange('sortProducts', 'A to Z');
    filterChange('sortPrice', 'all');
    filterChange('sortProductType', 'all');
    filterChange('sortMaterials', 'all');
  };

  return (
    <aside className={styles.aside}>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <Input props={{ type: 'search', placeholder: 'Search' }} onChange={handleSearchChange} value={searchQuery} />
        </div>
        <div className={styles.container}>
          <div className={styles.text}>View</div>
          <Select props={{ name: 'view' }} onChange={handleViewChange} value={view}>
            <option value="As Icons">As Icons</option>
            <option value="As List">As List</option>
          </Select>
        </div>
        <div className={styles.container}>
          <div className={styles.text}>Sort Products</div>
          <Select props={{ name: 'sortProducts' }} onChange={handleSortProductsChange} value={sortProducts}>
            <option value="A to Z">By name, A to Z</option>
            <option value="Z to A">By name, Z to A</option>
            <option value="ascending">Price, ascending</option>
            <option value="descending">Price, descending</option>
          </Select>
        </div>
        <div className={styles.container}>
          <div className={styles.text}>Sort Price</div>
          <Select props={{ name: 'sortPrice' }} onChange={handleSortPriceChange} value={sortPrice}>
            <option value="all">All</option>
            <option value="$1-10">$1.00 - 10.00</option>
            <option value="$11-25">$11.00 - 25.00</option>
            <option value="$26-70">$26.00 - 70.00</option>
            <option value="$71-200">$71.00 - 200.00</option>
          </Select>
        </div>
        <div className={styles.container}>
          <div className={styles.text}>Sort Product Type</div>
          <Select props={{ name: 'sortProductType' }} onChange={handleSortProductType} value={sortProductType}>
            <option value="all">All</option>
            <option value="cosmetic">Cosmetic</option>
            <option value="food">Food</option>
            <option value="home">Home</option>
          </Select>
        </div>
        <div className={styles.container}>
          <div className={styles.text}>Sort Materials</div>
          <Select props={{ name: 'sortMaterials' }} onChange={handleSortMaterials} value={sortMaterials}>
            <option value="all">All</option>
            <option value="wood">Wood</option>
            <option value="glass">Glass</option>
            <option value="metall">Metall</option>
            <option value="plastic">Plastic</option>
            <option value="nature">Nature</option>
          </Select>
        </div>
        <div>
          <Button onClick={resetFilter}>Reset filters</Button>
        </div>
      </div>
    </aside>
  );
};

export default Aside;
