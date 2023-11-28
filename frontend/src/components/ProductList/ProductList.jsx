import styles from "./index.module.css";
import ProductCard from "../ProductCard/ProductCard"
function ProductList() {

  return (
  <div className={styles.productList}>
    <div className={styles.productContent}>
      This is the Product List
      <ProductCard>Product 1</ProductCard>
    </div>
  </div>
  )
}

export default ProductList