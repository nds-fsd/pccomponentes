import ProductCard from "../ProductCard/ProductCard"
import styles from "./productList.module.css";

function ProductList() {
  return (
  <div className={styles.productContent}>
    This is the Product List
    <div className={styles.productsContainer}>
      <ProductCard>Product 1</ProductCard>
      <ProductCard>Product 1</ProductCard>
      <ProductCard>Product 1</ProductCard>
      <ProductCard>Product 1</ProductCard>
      <ProductCard>Product 1</ProductCard>
    </div>
  </div>
  )
}

export default ProductList