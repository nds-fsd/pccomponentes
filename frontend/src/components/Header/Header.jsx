import { Link } from "react-router-dom";
import styles from "./header.module.css";
import NavBar from "../NavBar/NavBar";
import computechLogo from "../../assets/computech-logo.svg";

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.headerContent}>
          <Link to={"/"}><img src={computechLogo} alt="computech logo" /></Link>
          <div className={styles.icons}>
            <span className="material-symbols-rounded">search</span>
            <span className="material-symbols-rounded">shopping_cart</span>
            <span className="material-symbols-rounded">person</span>
            <NavBar />
          </div>   
        </div>
      </div>
    </header>
  )
}

export default Header