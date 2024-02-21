import { Link } from 'react-router-dom';
import ProductChip from '../ProductChip/ProductChip';
import styles from './productCard.module.css';

function ProductCard({ product }) {
  return (
    <Link to={`/${product._id}`} className={styles.product}>
      <img src={product.image[0]} alt='image of the product' />
      <ProductChip product={product} />
      <div className={styles.text}>
        <p className={styles.productName}>{product.name}</p>
        <p className={styles.productPrice}>{product.price}€</p>
      </div>
    </Link>
  );
}

export default ProductCard;
