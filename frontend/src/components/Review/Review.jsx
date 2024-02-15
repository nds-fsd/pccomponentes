import Avatar from '../Profile/Avatar';
import { ConfigProvider, Rate, theme } from 'antd';
import styles from './review.module.css';

const Review = ({ review }) => {
  const date = new Date(review.date).toLocaleDateString('en-GB');
  return (
    <div className={styles.review}>
      <div className={styles.userContainer}>
        <Avatar username={review.user.username} />
        <p>{review.user.username}</p>
      </div>
      <p>{review.commentary}</p>
      <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
        <Rate disabled defaultValue={review.rate} />
      </ConfigProvider>
      <p className={styles.date}>{date}</p>
    </div>
  );
};

export default Review;
