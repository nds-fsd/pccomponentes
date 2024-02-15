import React, { useState, useEffect } from 'react';
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
      <Sider width={200} style={{ display: showSidebar ? 'block' : 'none' }}>
        <Filters onFilterChange={handleFilterChange} />
      </Sider>
      <Layout>
        <Content style={{ padding: '0 24px', minHeight: 280 }}>
          <Button onClick={toggleSidebar} style={{ marginBottom: 16 }}>
            {showSidebar ? 'Hide Sidebar' : 'Show Sidebar'}
          </Button>
          <ProductsList products={products} />
        </Content>
      </Layout>
    </Layout>
  );
}

export default ResultsPage;
