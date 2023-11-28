import styles from "./index.module.css";

function ProductCard() {

  return (
  <div className={styles.product}>
    <img src="https://picsum.photos/300" alt="" />
    This is a Product
  </div>
  )
}

export default ProductCard