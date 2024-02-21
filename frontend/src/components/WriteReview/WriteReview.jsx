import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { PrimaryButton, SecondaryButton } from '../Button/Button';
import { Rate } from 'antd';
import Avatar from '../../components/Avatar/Avatar';
import styles from './WriteReview.module.css';

const WriteReview = ({ isLogged, onCreateReview, user }) => {
  const [commentary, setCommentary] = useState('');
  const [rate, setRate] = useState(0);
  const productId = useParams().id;

  const handleSubmit = () => {
    onCreateReview({ user: user.id, product: productId, rate: rate, commentary: commentary });
    setCommentary('');
    setRate(0);
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
          <div className={styles.form}>
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
            <PrimaryButton value='Submit' onClick={handleSubmit} />
          </div>
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
