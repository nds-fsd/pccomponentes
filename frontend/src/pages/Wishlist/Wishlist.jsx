import React, { useState, useEffect } from 'react';
import styles from './Wishlist.module.css';

function Wishlist() {
  const [loggedUser, setLoggedUser] = useState(null);

  useEffect(() => {
    const userSession = localStorage.getItem('user-session');
    if (userSession) {
      const user = JSON.parse(userSession);
      setLoggedUser(user);
    }
  }, []);

  return <div className={styles.wishlistContainer}></div>;
}

export default Wishlist;
