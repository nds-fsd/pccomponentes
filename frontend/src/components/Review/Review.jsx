import Avatar from '../Profile/Avatar';
import { TextButton } from '../Button/Button';
import { Rate } from 'antd';
import styles from './review.module.css';

const Review = ({ review, deleteReview, user }) => {
  const date = new Date(review.date).toLocaleDateString('en-GB');

  return (
    <div className={styles.review}>
      <div className={styles.reviewHeader}>
        <div className={styles.userContainer}>
          <Avatar username={review.user.username} />
          <p>{review.user.username}</p>
        </div>
        {review.user._id === user?.id && <TextButton value='Delete' rightIcon='delete' onClick={deleteReview} />}
      </div>
      <p>{review.commentary}</p>
      <Rate disabled defaultValue={review.rate} />
      <p className={styles.date}>{date}</p>
    </div>
  );
};

export default Review;
