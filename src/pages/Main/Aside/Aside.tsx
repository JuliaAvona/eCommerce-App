import React from 'react';
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

  return (
    <aside className="aside">
      <div>
        <h4>View</h4>
        <select name="view" onChange={handleViewChange}>
          <option value="As Icons">As Icons</option>
          <option value="As List">As List</option>
        </select>
      </div>
      <div>
        <h4>Sort Products</h4>
        <select name="sortProducts">
          <option value="By name, A to Z">By name, A to Z</option>
          <option value="By name, Z to A">By name, Z to A</option>
          <option value="Price, ascending">Price, ascending</option>
          <option value="Price, descending">Price, descending</option>
        </select>
      </div>
      <div>
        <h4>Sort Price</h4>
        <select name="sortPrice">
          <option value="$01.00 - 10.00">$01.00 - 10.00</option>
          <option value="$11.00 - 20.00">$11.00 - 20.00</option>
          <option value="$21.00 - 50.00">$21.00 - 50.00</option>
          <option value="$51.00 - 200.00">$51.00 - 200.00</option>
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
    </aside>
  );
};

export default Aside;
