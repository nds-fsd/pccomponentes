import { Link } from 'react-router-dom';
import styles from './categoryCard.module.css';

function CategoryCard({ category, onSelectCategory }) {
  return (
    <div className={styles.product} onClick={onSelectCategory}>
      <Link to={`/${category?._id}`}>
        <span>{category?.name}</span>
        <img src={category?.image} alt={category?.name} />
      </Link>
    </div>
  );
}

export default CategoryCard;
