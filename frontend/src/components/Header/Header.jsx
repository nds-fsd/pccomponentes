import { Link } from "react-router-dom";
import styles from "./header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <img src="../../assets/computech-logo.svg" alt="computech logo" />
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link> 
            </li>
            <li>
              <Link to="product-list">Product List</Link> 
            </li>
          </ul>
        </nav>
        <div className={styles.icons}>
          <span class="material-symbols-rounded">search</span>
          <span class="material-symbols-rounded">shopping_cart</span>
          <span class="material-symbols-rounded">person</span>
          <span class="material-symbols-rounded">menu</span>
        </div>
      </div>
    </header>
  )
}

export default Header