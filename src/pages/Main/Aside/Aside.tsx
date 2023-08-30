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

  const handleSortProductType = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const sortProductType = event.target.value;
    filterChange('sortProductType', sortProductType);
  };

  const handleSortMaterials = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const sortMaterials = event.target.value;
    filterChange('sortMaterials', sortMaterials);
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
        <select name="sortProductType" onChange={handleSortProductType}>
          <option value="all">All</option>
          <option value="cosmetic">Cosmetic</option>
          <option value="food">Food</option>
          <option value="home">Home</option>
        </select>
      </div>
      <div>
        <h4>Sort Materials</h4>
        <select name="sortMaterials" onChange={handleSortMaterials}>
          <option value="all">All</option>
          <option value="wood">Wood</option>
          <option value="glass">Glass</option>
          <option value="metall">Metall</option>
          <option value="plastic">Plastic</option>
          <option value="nature">Nature</option>
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
