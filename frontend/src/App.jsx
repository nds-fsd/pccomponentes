import { useState } from "react";
import Home from "./components/Home/Home"
import ProductList from "./components/ProductList/ProductList"
import Product from "./components/Product/Product"
import NoMatch from "./components/NoMatch/NoMatch"
import styles from "./App.module.css";

import { Routes, Route, Link } from "react-router-dom";

function App() {
  const [reload, setReload] = useState(false);

  const reloadPage = () => setReload(!reload);

  return (
  <>
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div>LOGO</div>
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
        <button>User</button>
      </div>
    </header>
    <>
      <Routes>
        <Route path="/" element={ <Home reload={reload}/> } />
        <Route path="product-list" element={ <ProductList reload={reload}/> }>
          <Route path=":productId" element={ <Product reload={reload}/> } />
        </Route>
        <Route path="*" element={ <NoMatch /> } />
      </Routes>
    </>
  </>


  )
}

export default App
