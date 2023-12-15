import { Link } from 'react-router-dom';
import styles from './productCard.module.css';

function ProductCard({ product }) {
  return (
    <Link to={`/${product._id}`} className={styles.product}>
      <img src={product.image} alt='image of the product' />
      <span className={styles.chip}>New</span>
      <div className={styles.text}>
        {/* <p className={styles.productBrand}>{product.brand}</p>  At the end isn't useful for the user, mostly product names have the brand included itself */}
        <p className={styles.productName}>{product.name}</p>
        <p className={styles.productPrice}>{product.price}€</p>
      </div>
    </Link>
  );
}

export default ProductCard;
