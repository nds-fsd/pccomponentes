import CartProduct from '../CartProduct/CartProduct';
import styles from './Cart.module.css';
import { useState, useEffect } from 'react';

function Cart() {
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    // Fetch cart products from localStorage on component mount
    const storedCartProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];
    setCartProducts(storedCartProducts);
  }, []);

  // Function to add a product to the cart
  const addToCart = (product) => {
    const updatedCartProducts = [...cartProducts, product];
    setCartProducts(updatedCartProducts);
    // Store updated cartProducts in localStorage
    localStorage.setItem('cartProducts', JSON.stringify(updatedCartProducts));
  };

  // Function to remove a product from the cart
  const removeFromCart = (productId) => {
    const updatedCartProducts = cartProducts.filter((product) => product._id !== productId);
    setCartProducts(updatedCartProducts);
    // Store updated cartProducts in localStorage
    localStorage.setItem('cartProducts', JSON.stringify(updatedCartProducts));
  };

  return (
    <div className={styles.productContent}>
      <h2 className={styles.title}>My Cart</h2>
      <div className={styles.cartContainer}>
        {cartProducts.map((product) => (
          <CartProduct key={product._id} product={product} removeFromCart={() => removeFromCart(product._id)} />
        ))}
      </div>
    </div>
  );
}

export default Cart;
