import { Link } from "react-router-dom";
import styles from "./productCard.module.css";

function ProductCard({ product }) {
  return (
  <Link to={`/${product.id}`} className={styles.product}>
    {product.name}
    <img src="https://picsum.photos/200" alt="random photo" />
  </Link>
  )
}

export default ProductCard