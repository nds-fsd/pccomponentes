import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { PrimaryButton, SecondaryButton } from '../Button/Button';
import { api } from '../../_utils/api';
import { Rate } from 'antd';
import { getUserSession } from '../../_utils/localStorage.utils';
import Avatar from '../Profile/Avatar';
import styles from './WriteReview.module.css';

const WriteReview = ({ isLogged }) => {
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

      {isLogged ? (
        <>
          <div className={styles.userContainer}>
            <Avatar username={user?.username} />
            <p>{user?.username}</p>
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
              <Rate value={rate} onChange={(value) => setRate(value)} />
            </div>
            <PrimaryButton value='Submit' />
          </form>
        </>
      ) : (
        <Link to={'/login'}>
          <SecondaryButton value='Log in' leftIcon='person' />
        </Link>
      )}
    </div>
  );
};

export default WriteReview;
