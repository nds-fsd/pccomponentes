import React, { useState, useEffect } from 'react';
import styles from './productDetail.module.css';
import ImageCarousel from '../ImageCarousel/ImageCarousel';
import { ShoppingCartOutlined } from '@ant-design/icons';

const ProductDetailContainer = ({ product }) => {
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    // Load cart products from localStorage on component mount
    const storedCartProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];
    setCartProducts(storedCartProducts);
  }, []);

  const addToCart = () => {
    // Ensure the product is not already in the cart
    if (!cartProducts.find((product) => product._id === product.ProductFound._id)) {
      const updatedCartProducts = [...cartProducts, product.ProductFound];
      setCartProducts(updatedCartProducts);
      // Update localStorage with the updated cart products
      localStorage.setItem('cartProducts', JSON.stringify(updatedCartProducts));
    }
  };

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
