import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './likeButton.module.css';
import { api } from '../../_utils/api';

const LikeButton = ({ productId }) => {
  const [liked, setLiked] = useState(false);
  const [wishlistId, setWishlistId] = useState(null);
  const [loggedUser, setLoggedUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userSession = localStorage.getItem('user-session');
    if (userSession) {
      const user = JSON.parse(userSession);
      setLoggedUser(user);

      const fetchWishlist = async () => {
        try {
          const response = await api.get(`/wishlist/user/${user.user.id}`);
          if (response.data && response.data.length > 0) {
            const wishlistData = response.data[0];
            const wishlistId = wishlistData._id;
            setWishlistId(wishlistId);

            if (wishlistData.products.includes(productId)) {
              setLiked(true);
            }
          }
        } catch (error) {
          console.error('Error fetching wishlist:', error);
        }
      };

      fetchWishlist();
    }
  }, [productId]);

  const handleLike = async () => {
    if (loggedUser) {
      try {
        const response = await api.get(`/wishlist/user/${loggedUser.user.id}`);
        if (response.data && response.data.length > 0) {
          const wishlistData = response.data[0];
          const wishlistId = wishlistData._id;
          setWishlistId(wishlistId);

          // Check if the product is already in the wishlist
          if (wishlistData.products.includes(productId)) {
            // If the product is already in the wishlist, remove it
            await api.post(`/wishlist/${wishlistId}/remove`, { productId });
            setLiked(false);
          } else {
            // If the product is not in the wishlist, add it
            await api.post(`/wishlist/${wishlistId}/add`, { productId });
            setLiked(true);
          }
        } else {
          const newWishlistResponse = await api.post('/wishlist', { user: loggedUser.user.id, products: [productId] });
          const newWishlistId = newWishlistResponse.data._id;
          setWishlistId(newWishlistId);
          setLiked(true);
        }
      } catch (error) {
        console.error('Error handling like:', error);
      }
    } else {
      console.log('User session is null');
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
