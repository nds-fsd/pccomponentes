import React from 'react';
import styles from './productDetail.module.css';
import ImageCarousel from '../ImageCarousel/ImageCarousel';
import { PrimaryButton } from '../Button/Button';
import { useCart } from '../../contexts/CartContext';

const ProductDetailContainer = ({ product }) => {
  const productData = product && product.ProductFound;
  const { setCartProductsCount } = useCart();

  const addToCart = () => {
    if (productData) {
      let existingCartItems = JSON.parse(localStorage.getItem('CartProducts')) || [];

      const existingProductIndex = existingCartItems.findIndex((item) => item._id === productData._id);

      if (existingProductIndex !== -1) {
        existingCartItems[existingProductIndex].quantity += 1;
      } else {
        existingCartItems.push({ ...productData, quantity: 1 });
      }

      localStorage.setItem('CartProducts', JSON.stringify(existingCartItems));

      setCartProductsCount(existingCartItems.length);

      alert('Product added to cart!');
    }
  };

  return (
    <>
      {productData ? (
        <section className={styles.section}>
          <ImageCarousel product={productData} />
          <div className={styles.productData}>
            <h2>{productData.name}</h2>
            <p className={styles.rating}>rating</p>
            <p className={styles.productDescription}>{productData.description}</p>
            <div className={styles.addCartContainer}>
              <p className={styles.price}>{productData.price}€</p>
              <PrimaryButton value='Add to cart' onClick={addToCart} rightIcon='shopping_cart' />
            </div>
          </div>
        </section>
      ) : (
        <p>No product data available</p>
      )}
    </>
  );
};
export default ProductDetailContainer;
