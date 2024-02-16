import React, { useState, useEffect } from 'react';
import styles from './ResultsPage.module.css';
import ProductsList from '../../components/ProductsList/ProductsList';
import Filters from '../../components/Filters/Filters';
import { api } from '../../_utils/api';
import { Layout, Button } from 'antd';

const { Sider, Content } = Layout;

function ResultsPage() {
  const [products, setProducts] = useState([]);
  const [showSidebar, setShowSidebar] = useState(true);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    api.get('/products', { params: filters }).then((res) => setProducts(res.data));
    console.log(filters);
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <Layout>
      <Sider className={styles.sideBar} style={{ display: showSidebar ? 'block' : 'none' }}>
        <Filters onFilterChange={handleFilterChange} />
      </Sider>
      <Layout>
        <Content className={styles.productsContainer}>
          <Button onClick={toggleSidebar} className={styles.sideBarButton}>
            {showSidebar ? 'Hide Filters' : 'Show Filters'}
          </Button>
          <ProductsList products={products} />
        </Content>
      </Layout>
    </Layout>
  );
}

export default ResultsPage;
