import styles from "./navBar.module.css";

function NavBar() {
  return (
    <nav>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="product-list">Product List</Link></li>
        </ul>
    </nav>
  )
}

export default NavBar