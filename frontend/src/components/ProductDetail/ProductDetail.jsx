import React from 'react';
import styles from './productDetail.module.css';
import ImageCarousel from '../ImageCarousel/ImageCarousel';
import { PrimaryButton } from '../Button/Button';
import LikeButton from '../LikeButton/LikeButton';
import { useCart } from '../../contexts/CartContext';
import { message, Rate } from 'antd';

const ProductDetail = ({ product, rating }) => {
  const { setCartProductsCount } = useCart();
  const [messageApi, contextHolder] = message.useMessage();
  const addCartSuccessToast = () => {
    messageApi.open({
      type: 'success',
      content: 'Product added to cart',
    });
  };

  const addToCart = () => {
    if (product) {
      let existingCartItems = JSON.parse(localStorage.getItem('CartProducts')) || [];

      const existingProductIndex = existingCartItems.findIndex((item) => item._id === product._id);

      if (existingProductIndex !== -1) {
        existingCartItems[existingProductIndex].quantity += 1;
      } else {
        existingCartItems.push({ ...product, quantity: 1 });
      }

      localStorage.setItem('CartProducts', JSON.stringify(existingCartItems));

      setCartProductsCount(existingCartItems.length);

      addCartSuccessToast();
    }
  };

  return (
    <>
      {contextHolder}
      {product ? (
        <section className={styles.section}>
          <ImageCarousel product={product} />
          <div className={styles.product}>
            <h2>{product.name}</h2>
            {rating && rating.totalReviews > 0 && (
              <div className={styles.rateContainer}>
                <Rate className={styles.rateStars} disabled allowHalf value={rating?.totalRating} />
                <p className={styles.rating}>
                  ({rating?.totalReviews} {rating?.totalReviews === 1 ? 'review' : 'reviews'})
                </p>
              </div>
            )}
            <p className={styles.productDescription}>{product.description}</p>
            <div className={styles.addCartContainer}>
              <div className={styles.prices}>
                <p className={product.sale > 0 && styles.oldPrice}>{product.price}€</p>
                {product.sale > 0 && <p className={styles.sale}>{product.sale}€</p>}
              </div>
              <div className={styles.buttons}>
                <PrimaryButton
                  disabled={product.stock === 0}
                  value='Add to cart'
                  onClick={addToCart}
                  rightIcon='shopping_cart'
                />
                <LikeButton />
              </div>
            </div>
          </div>
        </section>
      ) : (
        <p>No product data available</p>
      )}
    </>
  );
};
export default ProductDetail;
