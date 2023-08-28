import React, { useState } from 'react';
import './Aside.css';
import filtersState from '../Filters/Filters';

const Aside = () => {
  const [view, setView] = useState('As Icons');
  const [sortProducts, setSortProducts] = useState('By name, A to Z');
  const [sortPrice, setSortPrice] = useState('$01.00 - 10.00');
  const [sortProductType, setSortProductType] = useState('Cosmetic');
  const [sortMaterials, setSortMaterials] = useState('Wood');

  const handleViewChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setView(event.target.value);
    filtersState.view = event.target.value;
  };

  const handleSortProductsChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setSortProducts(event.target.value);
  };

  const handleSortPriceChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setSortPrice(event.target.value);
  };

  const handleSortProductTypeChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setSortProductType(event.target.value);
  };

  const handleSortMaterialsChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setSortMaterials(event.target.value);
  };

  return (
    <aside className="aside">
      <div>
        <h4>View</h4>
        <select name="view" value={view} onChange={handleViewChange}>
          <option value="As Icons">As Icons</option>
          <option value="As List">As List</option>
        </select>
      </div>
      <div>
        <h4>Sort Products</h4>
        <select name="sortProducts" value={sortProducts} onChange={handleSortProductsChange}>
          <option value="By name, A to Z">By name, A to Z</option>
          <option value="By name, Z to A">By name, Z to A</option>
          <option value="Price, ascending">Price, ascending</option>
          <option value="Price, descending">Price, descending</option>
        </select>
      </div>
      <div>
        <h4>Sort Price</h4>
        <select name="sortPrice" value={sortPrice} onChange={handleSortPriceChange}>
          <option value="$01.00 - 10.00">$01.00 - 10.00</option>
          <option value="$11.00 - 20.00">$11.00 - 20.00</option>
          <option value="$21.00 - 50.00">$21.00 - 50.00</option>
          <option value="$51.00 - 200.00">$51.00 - 200.00</option>
        </select>
      </div>
      <div>
        <h4>Sort Product Type</h4>
        <select name="sortProductType" value={sortProductType} onChange={handleSortProductTypeChange}>
          <option value="Cosmetic">Cosmetic</option>
          <option value="Food">Food</option>
          <option value="Home">Home</option>
        </select>
      </div>
      <div>
        <h4>Sort Materials</h4>
        <select name="sortMaterials" value={sortMaterials} onChange={handleSortMaterialsChange}>
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
