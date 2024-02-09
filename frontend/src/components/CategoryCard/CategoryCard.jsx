import { Link } from 'react-router-dom';
import styles from './categoryCard.module.css';

function CategoryCard({ category }) {
  return (
    <Link to={`/${category?._id}`} className={styles.product}>
      <span>{category?.name}</span>
      <img src={category?.image} alt={category?.name} />
    </Link>
  );
}

export default CategoryCard;
