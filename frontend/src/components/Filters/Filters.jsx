import React, { useState } from 'react';
import { Slider } from 'antd';

function Filters({ onFilterChange }) {
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const handleFilterChange = () => {
    onFilterChange({ minPrice: priceRange[0], maxPrice: priceRange[1] });
  };

  const handleSliderChange = (value) => {
    setPriceRange(value);
    handleFilterChange();
  };

  return (
    <div>
      <Slider
        range
        min={0}
        max={1000}
        defaultValue={[0, 1000]}
        value={priceRange}
        onChange={handleSliderChange}
        onChangeComplete={handleFilterChange}
      />
    </div>
  );
}

export default Filters;
