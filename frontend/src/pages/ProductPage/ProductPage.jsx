import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import ProductDetail from '../../components/ProductDetail/ProductDetail';
import ReviewsList from '../../components/ReviewsList/ReviewsList';
import { api } from '../../_utils/api';
import styles from './productPage.module.css';

function ProductPage({ isLogged }) {
  const { id } = useParams();
  console.log(id);

  const {
    data: product,
    isLoading: productLoading,
    error: productError,
  } = useQuery(['product', id], async () => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  });

  console.log('El producto es', product);
  const { data: rating, isLoading: ratingLoading } = useQuery(['rating', id], async () => {
    const response = await api.get(`/reviews/${id}/rating`);
    return response.data;
  });

  if (productLoading || ratingLoading) {
    return <div>Loading...</div>;
  }

  if (productError) {
    return <div>Error: {productError}</div>;
  }

  if (!product) {
    return <div>The product has not been found</div>;
  }

  return (
    <main className={styles.main}>
      <ProductDetail product={product} rating={rating} />
      <ReviewsList productId={id} isLogged={isLogged} />
    </main>
  );
}

export default ProductPage;
