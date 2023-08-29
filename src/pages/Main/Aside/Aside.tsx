import React from 'react';
import Button from 'react-bootstrap/Button';
import './Aside.css';
import { IFilters } from '../../../types/interfaces';

interface AsideProps {
  filterChange: (key: keyof IFilters, value: string) => void;
}

const Aside = ({ filterChange }: AsideProps) => {
  const handleViewChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const view = event.target.value;
    filterChange('view', view);
  };

  const handleSortProductsChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const sortProducts = event.target.value;
    filterChange('sortProducts', sortProducts);
  };

  const handleSortPriceChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const sortPrice = event.target.value;
    filterChange('sortPrice', sortPrice);
  };

  return (
    <aside className="aside">
      <div>
        <input type="search" placeholder="Searc" />
      </div>
      <div>
        <h4>View</h4>
        <select name="view" onChange={handleViewChange}>
          <option value="As Icons">As Icons</option>
          <option value="As List">As List</option>
        </select>
      </div>
      <div>
        <h4>Sort Products</h4>
        <select name="sortProducts" onChange={handleSortProductsChange}>
          <option value="A to Z">By name, A to Z</option>
          <option value="Z to A">By name, Z to A</option>
          <option value="ascending">Price, ascending</option>
          <option value="descending">Price, descending</option>
        </select>
      </div>
      <div>
        <h4>Sort Price</h4>
        <select name="sortPrice" onChange={handleSortPriceChange}>
          <option value="all">All</option>
          <option value="$1-10">$1.00 - 10.00</option>
          <option value="$11-25">$11.00 - 25.00</option>
          <option value="$26-70">$26.00 - 70.00</option>
          <option value="$71-200">$71.00 - 200.00</option>
        </select>
      </div>
      <div>
        <h4>Sort Product Type</h4>
        <select name="sortProductType">
          <option value="Cosmetic">Cosmetic</option>
          <option value="Food">Food</option>
          <option value="Home">Home</option>
        </select>
      </div>
      <div>
        <h4>Sort Materials</h4>
        <select name="sortMaterials">
          <option value="Wood">Wood</option>
          <option value="Glass">Glass</option>
          <option value="Metall">Metall</option>
          <option value="Plastic">Plastic</option>
          <option value="Food">Food</option>
        </select>
      </div>
      <div className="resetButton">
        <Button variant="outline-secondary" size="sm">
          Reset filters
        </Button>
      </div>
    </aside>
  );
};

export default Aside;
