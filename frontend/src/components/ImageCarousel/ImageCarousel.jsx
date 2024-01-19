import React, { useState } from 'react';
import styles from './ImageCarousel.module.css';

const ImageCarousel = ({ product }) => {
  const images = Array.isArray(product.image) ? product.image : [];
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const setMainImage = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className={styles.carousel}>
      {/* <button onClick={prevImage} className={styles.prevbutton}>
        <span className={'material-symbols-rounded'}>navigate_before</span>
      </button> */}
      <img src={images[currentIndex]} alt={`image of the product`} />
      {/* <button onClick={nextImage} className={styles.nextbutton}>
        <span className={'material-symbols-rounded'}>navigate_next</span>
      </button> */}
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
