import { Link } from "react-router-dom";
import styles from "./productCard.module.css";
import laptopImage from "../../assets/img/laptop.png"

function ProductCard({ product }) {
  return (
  <Link to={`/${product.id}`} className={styles.product}>
    <span className={styles.chip}>New</span>
    <img src={laptopImage} alt="image of the product" />
    <p className={styles.productBrand}>Brand</p>
    <p className={styles.productName}>{product.name}</p>
    <p className={styles.productPrice}>999€</p>
  </Link>
  )
}

export default ProductCard