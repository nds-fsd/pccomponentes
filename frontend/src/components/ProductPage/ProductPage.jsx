import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductDetail from '../ProductDetail/ProductDetail';
import ProductReviews from '../ProductReviews/ProductReviews';
import { api } from '../../_utils/api';
import styles from './productPage.module.css';

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data);
      } catch (error) {}
    };

    fetchProduct();
  }, [id]);
  if (!product) {
    return <div>The product has not been found</div>;
  }

  return (
    <main className={styles.main}>
      <ProductDetail product={product} />
      <ProductReviews productId={product.ProductFound._id} />
    </main>
  );
}

export default ProductPage;
