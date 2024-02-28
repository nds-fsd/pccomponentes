import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './likeButton.module.css';
import { api } from '../../_utils/api';

const LikeButton = ({ productId }) => {
  const [liked, setLiked] = useState(false);
  const [wishlistId, setWishlistId] = useState(null);
  const navigate = useNavigate();

  const getUserSession = () => {
    const userSession = localStorage.getItem('user-session');
    return userSession ? JSON.parse(userSession) : null;
  };

  const handleLike = async () => {
    console.log('Attempting to retrieve user session...');
    const user = getUserSession();
    console.log('Retrieved user session:', user);
    console.log('User ID:', user ? user.id : 'User session is null');
    if (user) {
      try {
        const response = await api.get(`/wishlist/user/${user.id}`);
        const { wishlistId } = response.data;
        setWishlistId(wishlistId);
        await api.post(`/wishlist/${wishlistId}/add`, { productId });
        setLiked(!liked);
      } catch (error) {
        console.error('Error adding product to wishlist:', error);
      }
    } else {
      navigate('/login');
    }
  };
  return (
    <button onClick={handleLike} className={styles.button}>
      <span className={`material-symbols-rounded ${liked ? '' : 'outlined'}`}>favorite</span>
    </button>
  );
};

export default LikeButton;
