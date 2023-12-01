import ProductCard from "../ProductCard/ProductCard"
import styles from "./productList.module.css";

function ProductList({product}) {

  return (
  <div className={styles.productContent}>
    This is the Product List
    <div className={styles.productsContainer}>
      <ProductCard product={product}></ProductCard>
      <ProductCard product={product}></ProductCard>
      <ProductCard product={product}></ProductCard>
      <ProductCard product={product}></ProductCard>
      <ProductCard product={product}></ProductCard>
    </div>
  </div>
  )
}

export default ProductList