import { Link } from 'react-router-dom';
import styles from './categoryCard.module.css';

function CategoryCard({ category }) {
  return (
    <Link to={`/${category?._id}`} className={styles.product}>
      <span className={styles.categoryName}>{category?.categoryName}</span>
      <img src={category?.categoryImage} alt={category?.categoryName} />
    </Link>
  );
}

export default CategoryCard;
