import styles from './homeProductsBestSellers.module.css';
import { useState, useEffect } from 'react';
import { api } from '../../_utils/api';
import ProductsList from '../ProductsList/ProductsList';

function HomeProductsBestSellers({ categoryId }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get('/products').then((res) => setProducts(res.data));
  }, []);

  return (
    <div className={styles.productContent}>
      <h2 className={styles.title}>
        Bestsellers of the <span className={styles.accent}>week</span>
      </h2>
      <ProductsList products={products} />
    </div>
  );
}

export default HomeProductsBestSellers;
