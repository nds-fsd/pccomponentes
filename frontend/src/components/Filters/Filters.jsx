// Filters.js

import React, { useState } from 'react';
import styles from './Filters.module.css';
import { Slider, Button } from 'antd';

function Filters({ onFilterChange, toggleFilters }) {
  const [priceRange, setPriceRange] = useState([0, 2000]);

  const handleFilterChange = () => {
    onFilterChange({ minPrice: priceRange[0], maxPrice: priceRange[1] });
  };

  const handleSliderChange = (value) => {
    setPriceRange(value);
  };

  const applyFilters = () => {
    handleFilterChange();
    toggleFilters(); // Hide filters after applying
  };

  return (
    <div>
      <label className={styles.filterLabel}>Price range</label>
      <Slider range min={0} max={2000} value={priceRange} onChange={handleSliderChange} />
      <Button onClick={applyFilters} className={styles.applyButton}>
        Apply filters
      </Button>
    </div>
  );
}

export default Filters;
