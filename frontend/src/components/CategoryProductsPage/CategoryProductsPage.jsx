import React, { useEffect, useState } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import { api } from '../../_utils/api';
import styles from './categoryProductsPage.module.css';
import { useParams } from 'react-router-dom';
import ProductsList from '../ProductsList/ProductsList';

function CategoryProductsPage() {
  const { categoryId } = useParams();

  const [products, setProducts] = useState([]);

  const fetchProductsByCategory = async (categoryId) => {
    try {
      const response = await api.get(`/products?categoryId=${categoryId}`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products by category:', error);
    }
  };

  useEffect(() => {
    fetchProductsByCategory(categoryId);
  }, [categoryId]);

  return (
    <div className={styles.productContent}>
      <h2 className={styles.title}>Products in Category {categoryId}</h2>
      <ProductsList products={products} />
    </div>
  );
}

export default CategoryProductsPage;
