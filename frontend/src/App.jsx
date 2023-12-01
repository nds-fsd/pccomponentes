import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import Home from "./components/Home/Home"
import ProductList from "./components/ProductList/ProductList"
import Product from "./components/Product/Product"
import NoMatch from "./components/NoMatch/NoMatch"
import styles from "./app.module.css";

import { Routes, Route } from "react-router-dom";

function App() {

  const product = {
    id: 1,
    name: "A product"
  }
  return (
  <>
    <Header />
    <Routes>
      <Route path="/" element={ <Home /> } />
      <Route path="/product-list" element={ <ProductList product={product}/> }/>
      <Route path=":id" element={ <Product /> } />
      <Route path="*" element={ <NoMatch /> } />
    </Routes>
    <Footer />
  </>
  )
}

export default App
