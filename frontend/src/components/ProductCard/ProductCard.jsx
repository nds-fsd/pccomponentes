import { Link } from "react-router-dom";
import styles from "./index.module.css";

function ProductCard() {

  return (
  <Link to=":productId" className={styles.product}>
    <img src="https://picsum.photos/300" alt="" />
    This is a Product
  </Link>
  )
}

export default ProductCard