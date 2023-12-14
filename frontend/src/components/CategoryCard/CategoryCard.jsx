import { Link } from 'react-router-dom';
import styles from './categoryCard.module.css';
import categoryImage from '../../assets/img/headset.png';

function CategoryCard({ product }) {
  return (
    <Link to={`/${product?.id}`} className={styles.product}>
      {product?.category}
      <img src={categoryImage} alt="image of the category" />
    </Link>
  );
}

export default CategoryCard;
