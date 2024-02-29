import React, { useState, useEffect } from 'react';
import styles from './ResultsPage.module.css';
import ProductsList from '../../components/ProductsList/ProductsList';
import Filters from '../../components/Filters/Filters';
import { api } from '../../_utils/api';
import { Button, Select } from 'antd';
import { useLocation } from 'react-router-dom';

const { Option } = Select;

function ResultsPage() {
  const [products, setProducts] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [filters, setFilters] = useState({});
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    if (searchQuery) {
      api
        .get('/products', { params: { ...filters, name: searchQuery, categoryName: searchQuery } })
        .then((res) => setProducts(res.data));
    } else {
      api.get('/products', { params: filters }).then((res) => setProducts(res.data));
    }
  }, [filters, searchQuery]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleSortChange = (value) => {
    let sortedProducts = [...products];
    if (value === 'price') {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (value === '-price') {
      sortedProducts.sort((a, b) => b.price - a.price);
    }
    setProducts(sortedProducts);
  };

  return (
    <main className={`${styles.resultsPage} wrapper fullvh `}>
      <div className={styles.sideBar} style={{ transform: showSidebar ? 'translateX(0)' : 'translateX(-100%)' }}>
        <Filters onFilterChange={handleFilterChange} toggleFilters={() => setShowSidebar(false)} />
      </div>
      <div className={styles.resultsContent}>
        <Button onClick={toggleSidebar} className={styles.sideBarButton}>
          {showSidebar ? 'Hide Filters' : 'Show Filters'}
        </Button>
        <div>
          <label className={styles.filterLabel}>Sort </label>
          <Select className={styles.sortDropdown} defaultValue='' onChange={handleSortChange}>
            <Option className={styles.sortDropdown} value=''>
              None
            </Option>
            <Option className={styles.sortDropdown} value='price'>
              Low to High
            </Option>
            <Option className={styles.sortDropdown} value='-price'>
              High to Low
            </Option>
          </Select>
        </div>
      </div>
      <ProductsList products={products} />
    </main>
  );
}

export default ResultsPage;
