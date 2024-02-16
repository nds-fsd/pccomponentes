import React, { useState } from 'react';
import styles from './Filters.module.css';
import { Slider, Button } from 'antd';

function Filters({ onFilterChange }) {
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const handleFilterChange = () => {
    onFilterChange({ minPrice: priceRange[0], maxPrice: priceRange[1] });
  };

  const handleSliderChange = (value) => {
    setPriceRange(value);
  };

  const applyFilters = () => {
    handleFilterChange();
  };

  return (
    <div>
      <p>Price range</p>
      <Slider range min={0} max={1000} value={priceRange} onChange={handleSliderChange} />
      <Button onClick={applyFilters} className={styles.applyButton}>
        Apply filters
      </Button>
    </div>
  );
}

export default Filters;
