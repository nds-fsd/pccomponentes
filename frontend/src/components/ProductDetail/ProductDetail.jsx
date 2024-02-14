import React from 'react';
import styles from './productDetail.module.css';
import ImageCarousel from '../ImageCarousel/ImageCarousel';
import { ShoppingCartOutlined } from '@ant-design/icons';

const ProductDetailContainer = ({ product }) => {
  const productData = product && product.ProductFound;

  const addToCart = () => {
    // Check if productData exists
    if (productData) {
      // Retrieve existing cart items from localStorage or initialize an empty array
      let existingCartItems = JSON.parse(localStorage.getItem('CartProducts')) || [];

      // Check if the product already exists in the cart
      const existingProductIndex = existingCartItems.findIndex((item) => item._id === productData._id);

      if (existingProductIndex !== -1) {
        // If the product already exists, increase its quantity
        existingCartItems[existingProductIndex].quantity += 1;
      } else {
        // If the product doesn't exist, add it to the cart with a quantity of 1
        existingCartItems.push({ ...productData, quantity: 1 });
      }

      // Update the CartProducts key in localStorage with the new cart items
      localStorage.setItem('CartProducts', JSON.stringify(existingCartItems));

      // Alert the user that the product has been added to the cart (optional)
      alert('Product added to cart!');
    }
  };

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
            <button className={styles.button} onClick={addToCart}>
              Add to cart
              <ShoppingCartOutlined />
            </button>
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
