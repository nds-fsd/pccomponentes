import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { api } from '../../_utils/api';
import { Rate } from 'antd';
import styles from './productCard.module.css';

function ProductCard({ product }) {
  const [rating, setRating] = useState(null);
  const getRating = async () => {
    try {
      const response = await api.get(`/reviews/${product._id}/rating`);
      setRating(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    getRating();
  }, [product._id]);

  return (
    <Link to={`/${product._id}`} className={styles.product}>
      <img src={product.image[0]} alt='image of the product' />
      <ProductChip product={product} />
      <div className={styles.text}>
        <p className={styles.productName}>{product.name}</p>
        <p className={styles.productPrice}>{product.price}€</p>
        {rating && rating.totalReviews > 0 && (
          <div className={styles.rateContainer}>
            <Rate className={styles.rateStars} disabled allowHalf value={rating.totalRating} />
            <span className={styles.ratingNum}>
              ({rating.totalReviews} {rating?.totalReviews === 1 ? 'review' : 'reviews'})
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}

export default ProductCard;
