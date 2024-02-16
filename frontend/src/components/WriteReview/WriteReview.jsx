import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../_utils/api';
import { ConfigProvider, Rate, theme } from 'antd';
import { getUserSession } from '../../_utils/localStorage.utils';
import Avatar from '../Profile/Avatar';
import styles from './WriteReview.module.css';

const WriteReview = () => {
  const [commentary, setCommentary] = useState('');
  const [rate, setRate] = useState(0);
  const productId = useParams().id;
  const user = getUserSession();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/reviews', {
        user: user.id,
        product: productId,
        rate: rate,
        commentary: commentary,
      });

      console.log('Review submitted:', response.data);
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };
  return (
    <div className={styles.container}>
      <h4>
        <span className='material-symbols-rounded'>border_color</span>Write your review
      </h4>
      <div className={styles.userContainer}>
        <Avatar username={user.username} />
        <p>{user.username}</p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <textarea
          id='commentary'
          name='commentary'
          placeholder='Write here your review'
          rows='2'
          cols='50'
          value={commentary}
          onChange={(e) => setCommentary(e.target.value)}
          required
        ></textarea>
        <div className={styles.rateContainer}>
          <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
            <Rate value={rate} onChange={(value) => setRate(value)} />
          </ConfigProvider>
        </div>
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default WriteReview;