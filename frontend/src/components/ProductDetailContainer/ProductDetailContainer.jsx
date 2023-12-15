import React from 'react';
import styles from './productDetailContainer.module.css';

const ProductDetailContainer = ({ product }) => {
  const productData = product && product.ProductFound;
  return (
    <div className={styles.container}>
      {productData ? (
        <>
          <img
            className={styles.productImage}
            src={productData.image}
            alt='image of the product'
          />
          <div className={styles.productdata}>
            <h2>{productData.name}</h2>
            <h3>
              <span className={styles.accent}>{productData.price}€</span>
            </h3>
            <br />
            <h4>Description: </h4>
            <p className={styles.productDescription}>
              {productData.description}
            </p>
          </div>
        </>
      ) : (
        <p>No product data available</p>
      )}
    </div>
  );
};

export default ProductDetailContainer;
