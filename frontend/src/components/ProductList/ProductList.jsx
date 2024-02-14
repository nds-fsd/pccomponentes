import ProductCard from '../ProductCard/ProductCard';
import styles from './productList.module.css';
import { useState, useEffect } from 'react';
import { api } from '../../_utils/api';

function ProductList({ categoryId }) {
  const [products, setProducts] = useState([]);

  const getProductsByCategory = async (categoryId) => {
    return api.get(`/products/byCategory/${categoryId}`);
  };

  useEffect(() => {
    if (categoryId) {
      getProductsByCategory(categoryId)
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => {
          console.log('Error fetching products by category!');
        });
    }
  }, [categoryId]);

  return (
    <div className={styles.productContent}>
      <h2 className={styles.title}>
        Bestsellers of the <span className={styles.accent}>week</span>
      </h2>
      <div className={styles.productsContainer}>
        {products.map((product) => (
          <ProductCard key={product._id} product={product}></ProductCard>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
