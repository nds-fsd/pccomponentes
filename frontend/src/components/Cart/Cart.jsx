import CartProduct from '../CartProduct/CartProduct';
import styles from './Cart.module.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { Divider, Button } from 'antd';

function Cart() {
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    const storedCartProducts = localStorage.getItem('CartProducts');
    if (storedCartProducts) {
      setCartProducts(JSON.parse(storedCartProducts));
    }
  }, []);

  return (
    <div className={styles.cart}>
      <h2 className={styles.title}>My Cart</h2>
      <div className={styles.cartContainer}>
        <div className={styles.cartProducts}>
          {cartProducts.map((product, index) => (
            <CartProduct key={index} product={product}></CartProduct>
          ))}
        </div>
        <div className={styles.cartOverview}>
          <h3>Overview</h3>
          <p>Subtotal</p>
          <p>Tax</p>
          <Divider />
          <p>Total Price</p>
          <Button className={styles.checkout_button}>Checkout</Button>
        </div>
      </div>
    </div>
  );
}
export default Cart;
