import Avatar from '../Avatar/Avatar';
import { TextButton } from '../Button/Button';
import { Rate } from 'antd';
import styles from './review.module.css';

const Review = ({ review, deleteReview, user }) => {
  const date = new Date(review.date).toLocaleDateString('en-GB');
  const isMyReview = review.user._id === user?.id;

  return (
    <div className={`${styles.review} ${isMyReview ? styles.myReview : ''}`}>
      <div className={styles.reviewHeader}>
        <div className={styles.userContainer}>
          <Avatar username={review.user.username ? review.user.username : 'p'} />
          <p>{review.user.username ? review.user.username : 'No Username'}</p>
        </div>
        {isMyReview && <TextButton value='Delete' rightIcon='delete' onClick={deleteReview} />}
      </div>
      <p>{review.commentary}</p>
      <Rate disabled defaultValue={review.rate} />
      <p className={styles.date}>{date}</p>
    </div>
  );
};

export default Review;
