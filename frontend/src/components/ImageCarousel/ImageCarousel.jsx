import React from 'react';
import styles from './ImageCarousel.module.css';

const ImageCarousel = ({ product }) => {
  const productData = product && product.ProductFound;
  return (
    <div className={styles.container}>
      {productData ? (
        <>
          <img className={styles.productImage} src={productData.image} alt='image of the product' />
        </>
      ) : (
        <p>No product data available</p>
      )}
    </div>
  );
};

export default ImageCarousel;
