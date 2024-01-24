import React from 'react';
import styles from './productDetail.module.css';
import ImageCarousel from '../ImageCarousel/ImageCarousel';

const ProductDetailContainer = ({ product }) => {
  const productData = product && product.ProductFound;
  return (
    <>
      {productData ? (
        <section className={styles.container}>
          <ImageCarousel product={productData} />
          <div className={styles.productdata}>
            <h2>{productData.name}</h2>
            <h3>
              <span className={styles.accent}>{productData.price}€</span>
            </h3>
            <br />
            <h4>Description: </h4>
            <p className={styles.productDescription}>{productData.description}</p>
          </div>
        </section>
      ) : (
        <p>No product data available</p>
      )}
    </>
  );
};

export default ProductDetailContainer;
