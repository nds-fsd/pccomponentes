import { Link } from "react-router-dom";
import styles from "./header.module.css";
import computechLogo from "../../assets/computech-logo.svg"

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.headerContent}>
          <img src={computechLogo} alt="computech logo" />
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
            <span className="material-symbols-rounded">search</span>
            <span className="material-symbols-rounded">shopping_cart</span>
            <span className="material-symbols-rounded">person</span>
            <span className="material-symbols-rounded">menu</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header