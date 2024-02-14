import React, { useEffect, useState } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import { api } from '../../_utils/api';
import styles from './categoryProductsPage.module.css';
import { useParams } from 'react-router-dom';

function CategoryProductsPage() {
  const { categoryId } = useParams();

  const [products, setProducts] = useState([]);

  const fetchProductsByCategory = async (categoryId) => {
    try {
      const response = await api.get(`/products/byCategory/${categoryId}`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products by category:', error);
    }
  };

  useEffect(() => {
    if (categoryId) {
      fetchProductsByCategory(categoryId);
    }
  }, [categoryId]);

  return (
    <div className={styles.productContent}>
      <h2 className={styles.title}>Products in Category {categoryId}</h2>
      <div className={styles.productsContainer}>
        {products.map((product) => (
          <ProductCard key={product._id} product={product}></ProductCard>
        ))}
      </div>
    </div>
  );
}

export default CategoryProductsPage;
