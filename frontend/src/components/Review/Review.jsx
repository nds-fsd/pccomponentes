import RateStars from '../RateStars/RateStars';
import styles from './review.module.css';

const Review = ({ review }) => {
  return (
    <div className={styles.review}>
      <div className={styles.userContainer}>
        <div>Avatar</div>
        <p>{review.user.username}</p>
      </div>
      <p>{review.commentary}</p>
      <RateStars rating={review.rate} />
      <p>{review.date}</p>
    </div>
  );
};

export default Review;
