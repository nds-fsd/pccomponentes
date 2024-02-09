import CartProduct from '../CartProduct/CartProduct';
import styles from './Cart.module.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { api } from '../../_utils/api';

function Cart({ product }) {
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    return api.get('/products');
  };

  useEffect(() => {
    getAllProducts()
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log('Error!');
      });
  }, []);

  return (
    <div className={styles.productContent}>
      <h2 className={styles.title}>My Cart</h2>
      <div className={styles.productsContainer}>
        {products.map((product) => (
          <CartProduct key={product._id} product={product}></CartProduct>
        ))}
      </div>
    </div>
  );
}

export default Cart;
