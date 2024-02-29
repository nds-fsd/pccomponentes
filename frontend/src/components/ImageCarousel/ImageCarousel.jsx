import React, { useState } from 'react';
import ProductChip from '../ProductChip/ProductChip';
import styles from './ImageCarousel.module.css';

const ImageCarousel = ({ product }) => {
  const images = Array.isArray(product.image) ? product.image : [];
  const [currentIndex, setCurrentIndex] = useState(0);

  const setMainImage = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className={styles.carousel}>
      <ProductChip product={product} />
      <img src={images[currentIndex]} alt={`image of the product`} />
      <div className={styles.thumbnailContainer}>
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`thumbnail ${index + 1}`}
            onClick={() => setMainImage(index)}
            className={index === currentIndex ? styles.selectedThumbnail : styles.thumbnail}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
