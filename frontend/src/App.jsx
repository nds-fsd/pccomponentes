import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import Home from "./components/Home/Home"
import ProductList from "./components/ProductList/ProductList"
import Product from "./components/Product/Product"
import NoMatch from "./components/NoMatch/NoMatch"
import styles from "./app.module.css";

import { Routes, Route, Link } from "react-router-dom";

function App() {

  return (
  <>
    <Header />
    <Routes>
      <Route path="/" element={ <Home /> } />
      <Route path="/product-list" element={ <ProductList /> }/>
      <Route path="/product/:id" element={ <Product /> } />
      <Route path="*" element={ <NoMatch /> } />
    </Routes>
    <Footer />
  </>
  )
}

export default App
