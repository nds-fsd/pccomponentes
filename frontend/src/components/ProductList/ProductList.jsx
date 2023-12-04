import ProductCard from "../ProductCard/ProductCard"
import styles from "./productList.module.css";

function ProductList({product}) {

  return (
  <div className={styles.productContent}>
    <h3 className={styles.title}>Bestsellers of the <span className={styles.accent}>week</span></h3>
    <div className={styles.productsContainer}>
      <ProductCard product={product}></ProductCard>
      <ProductCard product={product}></ProductCard>
      <ProductCard product={product}></ProductCard>
      <ProductCard product={product}></ProductCard>
    </div>
  </div>
  )
}

export default ProductList