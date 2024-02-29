import styles from './categoryCard.module.css';

function CategoryCard({ category, onSelectCategory }) {
  const handleClick = () => {
    onSelectCategory(category?._id);
  };

  return (
    <div className={styles.product} onClick={handleClick}>
      <div>
        <span>{category?.name}</span>
        <img src={category?.image} alt={category?.name} />
      </div>
    </div>
  );
}

export default CategoryCard;
