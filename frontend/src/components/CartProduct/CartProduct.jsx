import { Link } from 'react-router-dom';
import styles from './CartProduct.module.css';

function CartProduct({ product }) {
  return (
    <Link to={`/${product._id}`} className={styles.product}>
      <img src={product.image[0]} alt='image of the product' />
      <span className={styles.chip}>New</span>
      <div className={styles.text}>
        <p className={styles.productName}>{product.name}</p>
        <p className={styles.productPrice}>{product.price}€</p>
      </div>
    </Link>
  );
}

export default CartProduct;
