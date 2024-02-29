import { useState, useEffect } from 'react';
import { api } from '../../_utils/api';
import WishlistProducts from '../../components/WishlistProducts/WishlistProducts';
import styles from './Wishlist.module.css';
function Wishlist() {
  const [loggedUser, setLoggedUser] = useState(null);
  const [wishlistId, setWishlistId] = useState(null);
  const [wishlistProductIds, setWishlistProductIds] = useState([]);
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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
            const productIds = wishlistData.products;
            setWishlistId(wishlistId);
            setWishlistProductIds(productIds);
            const productDetailsPromises = productIds.map(async (productId) => {
              const productResponse = await api.get(`/products/${productId}`);
              return productResponse.data;
            });
            const products = await Promise.all(productDetailsPromises);
            setWishlistProducts(products);
          } else {
            setWishlistId(null);
            setWishlistProductIds([]);
            setWishlistProducts([]);
          }
        } catch (error) {
          console.error('Error fetching wishlist:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchWishlist();
    }
  }, []);

  return (
    <div className={styles.wishlistContainer}>
      <h1>My Wishlist</h1>
      {loading ? (
        <p>Loading...</p>
      ) : wishlistId ? (
        <WishlistProducts products={wishlistProducts} />
      ) : (
        <p>You have no items in your wishlist.</p>
      )}
    </div>
  );
}

export default Wishlist;
