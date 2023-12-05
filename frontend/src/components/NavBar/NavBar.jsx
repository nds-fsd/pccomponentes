import { Link } from "react-router-dom";
import { useState } from "react";
import styles from "./navBar.module.css";

function NavBar() {

    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);


    return (
    <>
        <span className='material-symbols-rounded' onClick={showSidebar}>menu</span>
        <nav className={`${sidebar ? styles.navMenu + " " + styles.active : styles.navMenu}`}>
            <span onClick={showSidebar} className="material-symbols-rounded">close</span>
            <ul>
                <li onClick={showSidebar}><Link to="/">Home</Link></li>
                <li onClick={showSidebar}><Link to="product-list">Product List</Link></li>
            </ul>
        </nav>
    </>
  )
}

export default NavBar