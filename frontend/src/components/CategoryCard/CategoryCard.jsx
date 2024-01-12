import { Link } from 'react-router-dom';
import styles from './categoryCard.module.css';
import categoryImage from '../../assets/img/headset.png';

function CategoryCard({ category }) {
  return (
    <Link to={`/${category?._id}`} className={styles.product}>
      {category?.categoryName}
    </Link>
  );
}

export default CategoryCard;
