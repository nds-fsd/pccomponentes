import { Link } from 'react-router-dom';
import styles from './productCard.module.css';
import laptopImage from '../../assets/img/laptop.png';

function ProductCard({ product }) {
  return (
    <Link to={`/${product._id}`} className={styles.product}>
      <span className={styles.chip}>New</span>
      <img src={laptopImage} alt='image of the product' />
      <div className={styles.text}>
        <p className={styles.productBrand}>{product.brand}</p>
        <p className={styles.productName}>{product.name}</p>
        <p className={styles.productPrice}>{product.price}</p>
      </div>
    </Link>
  );
}

export default ProductCard;
