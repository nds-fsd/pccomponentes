import Review from '../Review/Review';
import { api } from '../../_utils/api';
import { useState, useEffect } from 'react';
import styles from './productReviews.module.css';

const ProductReviews = ({ productId }) => {
  const [reviews, setReviews] = useState(null);

  const getReviewsByProductId = async () => {
    return api.get(`/reviews/product/${productId}`);
  };

  useEffect(() => {
    getReviewsByProductId()
      .then((response) => {
        setReviews(response.data);
      })
      .catch((error) => {
        console.log('Error!');
      });
  }, [productId]);

  return (
    <section>
      <h3>Product Reviews</h3>
      {reviews ? reviews.map((review) => <Review key={review._id} review={review} />) : <p>No reviews available</p>}
    </section>
  );
};

export default ProductReviews;
