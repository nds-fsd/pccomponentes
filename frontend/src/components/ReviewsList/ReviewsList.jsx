import Review from '../Review/Review';
import WriteReview from '../WriteReview/WriteReview';
import { api } from '../../_utils/api';
import { useState, useEffect } from 'react';
import styles from './reviewsList.module.css';

const ProductReviews = ({ productId, isLogged }) => {
  const [reviews, setReviews] = useState(null);

  const getReviewsByProductId = async () => {
    return api.get(`/reviews?productId=${productId}`);
  };

  const deleteReview = async (reviewId) => {
    try {
      await api.delete(`/reviews/${reviewId}`);
      // After deletion, fetch reviews again to update the list
      getReviewsByProductId()
        .then((response) => {
          setReviews(response.data);
        })
        .catch((error) => {
          console.log(`Error: ${error}`);
        });
    } catch (error) {
      console.log(`Error deleting review: ${error}`);
    }
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
      <WriteReview isLogged={isLogged} />
      <div>
        {reviews ? (
          reviews.map((review) => <Review key={review._id} review={review} deleteReview={deleteReview(review._id)} />)
        ) : (
          <p>No reviews available</p>
        )}
      </div>
    </section>
  );
};

export default ProductReviews;
