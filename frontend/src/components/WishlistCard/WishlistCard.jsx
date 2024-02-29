import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { api } from '../../_utils/api';
import { Rate } from 'antd';
import ProductChip from '../ProductChip/ProductChip';
import styles from './WishlistCard.module.css';
import LikeButton from '../LikeButton/LikeButton';

function WishlistCard({ id, product }) {
  const [rating, setRating] = useState(null);
  const getRating = async () => {
    try {
      const response = await api.get(`/reviews/${id}/rating`);
      setRating(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    getRating();
  }, [id]);
  return (
    <div className={styles.product}>
      <Link to={`/${id}`}>
        <img
          src={product.image[0]}
          alt='image of the product'
          className={product?.stock === 0 ? styles.outStockDisabled : ''}
        />
        <ProductChip product={product} />
        <div className={`${styles.text} ${product.stock === 0 ? styles.outStockDisabled : ''}`}>
          <p className={styles.productName}>{product.name}</p>
          <div className={styles.prices}>
            <p className={`${styles.productPrice} ${product.sale > 0 && styles.productOldPrice}`}>{product.price}€</p>
            {product.sale > 0 && <p className={styles.productPrice}>{product.sale}€</p>}
          </div>
        </div>
      </Link>
      {rating && rating.totalReviews > 0 && (
        <div className={styles.rateContainer}>
          <Rate className={styles.rateStars} disabled allowHalf value={rating.totalRating} />
          <span className={styles.ratingNum}>
            ({rating.totalReviews} {rating?.totalReviews === 1 ? 'review' : 'reviews'})
          </span>
          <LikeButton productId={product._id} />
        </div>
      )}
    </div>
  );
}

export default WishlistCard;
