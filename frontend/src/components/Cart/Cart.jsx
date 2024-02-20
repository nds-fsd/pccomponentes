import CartProduct from '../CartProduct/CartProduct';
import styles from './Cart.module.css';
import { useState, useEffect } from 'react';
import { Divider, Button } from 'antd';
import { PrimaryButton } from '../Button/Button';

function Cart() {
  const [cartProducts, setCartProducts] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const storedCartProducts = localStorage.getItem('CartProducts');
    if (storedCartProducts) {
      const parsedCartProducts = JSON.parse(storedCartProducts);
      setCartProducts(parsedCartProducts);
      updatePrices(parsedCartProducts);
    }
  }, []);

  useEffect(() => {
    updatePrices(cartProducts);
  }, [cartProducts]);

  const updatePrices = (products) => {
    const subtotalValue = products.reduce((total, product) => total + product.price * product.quantity, 0);
    const taxValue = subtotalValue * 0.21;
    const totalPriceValue = subtotalValue + taxValue;
    setSubtotal(subtotalValue);
    setTax(taxValue);
    setTotalPrice(totalPriceValue);
  };

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
          <div className={styles.itemContainer}>
            <p>Subtotal:</p>
            <p>€{subtotal.toFixed(2)}</p>
          </div>
          <div className={styles.itemContainer}>
            <p>Tax 21%:</p>
            <p>€{tax.toFixed(2)}</p>
          </div>
          <Divider className={styles.divider} />
          <div className={styles.itemContainer}>
            <p>Total Price:</p>
            <p>€{totalPrice.toFixed(2)}</p>
          </div>
          <PrimaryButton value='Checkout' leftIcon='shopping_cart' />
        </div>
      </div>
    </div>
  );
}

export default Cart;
