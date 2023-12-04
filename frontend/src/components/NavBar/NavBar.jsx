import { Link } from "react-router-dom";
import { useState } from "react";
import styles from "./navBar.module.css";

function NavBar() {

    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);


    return (
    <>
        <span className="material-symbols-rounded">menu</span>
        <nav className={`${styles.navMenu} ${sidebar ? styles.active : styles.closed}`}>
            <ul>
                <li><span className="material-symbols-rounded">close</span></li>
                <li><Link to="/">Home</Link></li>
                <li><Link to="product-list">Product List</Link></li>
            </ul>
        </nav>
    </>
  )
}

export default NavBar