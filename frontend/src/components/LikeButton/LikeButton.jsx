import { useState } from 'react';
import styles from './likeButton.module.css';

const LikeButton = () => {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };

  return (
    <button onClick={handleLike} className={styles.button}>
      <span className={`material-symbols-rounded ${liked ? 'outlined' : ''}`}>favorite</span>
    </button>
  );
};

export default LikeButton;
