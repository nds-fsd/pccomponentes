import Review from '../Review/Review';
import { api } from '../../_utils/api';
import { useState, useEffect } from 'react';
import styles from './productReviews.module.css';

const ProductReviews = ({ productId }) => {
  const [reviews, setReviews] = useState(null);

  const getReviewsByProductId = async () => {
    return api.get(`/reviews?productId=${productId}`);
  };

  useEffect(() => {
    getReviewsByProductId()
      .then((response) => {
        setReviews(response.data);
      })
      .catch((error) => {
        console.log(`Error: ${error}`);
      });
  }, [productId]);

  return (
    <section className={styles.reviewsSection}>
      <h3>Reviews</h3>
      <div>
        {reviews ? reviews.map((review) => <Review key={review._id} review={review} />) : <p>No reviews available</p>}
      </div>
    </section>
  );
};

export default ProductReviews;
