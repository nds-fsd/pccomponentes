import ProductCard from "../ProductCard/ProductCard"
import styles from "./categoryList.module.css";

function CategoryList( {product} ) {
  return (
  <section className={styles.section}>
    <h3>Equipment for advanced <span className={styles.accent}>gaming</span></h3>
    <div className={styles.categoriesContainer}>
      <ProductCard product={product}/>
      <ProductCard product={product}/>
      <ProductCard product={product}/>
      <ProductCard product={product}/>
    </div>
  </section>
  )
}

export default CategoryList