import CategoryCard from "../CategoryCard/CategoryCard"
import styles from "./categoryList.module.css";

function CategoryList( {product} ) {
  return (
  <section className={styles.section}>
    <h2 className={styles.title}>Equipment for advanced <span className={styles.accent}>gaming</span></h2>
    <div className={styles.categoriesContainer}>
      <CategoryCard product={product}/>
      <CategoryCard product={product}/>
      <CategoryCard product={product}/>
      <CategoryCard product={product}/>
    </div>
  </section>
  )
}

export default CategoryList