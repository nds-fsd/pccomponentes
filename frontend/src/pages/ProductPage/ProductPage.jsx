import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductDetail from '../../components/ProductDetail/ProductDetail';
import ReviewsList from '../../components/ReviewsList/ReviewsList';
import { api } from '../../_utils/api';
import styles from './productPage.module.css';

function ProductPage({ isLogged }) {
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
      <ReviewsList productId={product.ProductFound._id} isLogged={isLogged} />
    </main>
  );
}

export default ProductPage;