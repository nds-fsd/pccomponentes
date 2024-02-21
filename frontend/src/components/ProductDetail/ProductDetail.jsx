import React from 'react';
import styles from './productDetail.module.css';
import ImageCarousel from '../ImageCarousel/ImageCarousel';
import { PrimaryButton } from '../Button/Button';
import { message } from 'antd';

const ProductDetailContainer = ({ product }) => {
  const productData = product && product.ProductFound;
  const [messageApi, contextHolder] = message.useMessage();
  const addCartSuccessToast = () => {
    messageApi.open({
      type: 'success',
      content: 'Product added to cart',
    });
  };

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
      addCartSuccessToast();
    }
  };

  return (
    <>
      {contextHolder}
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
