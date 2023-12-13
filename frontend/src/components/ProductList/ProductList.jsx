import ProductCard from "../ProductCard/ProductCard";
import styles from "./productList.module.css";
import { useState } from "react";
import { useEffect } from "react";
import { loadProducts } from "../../_utils/api";


function ProductList({product}) {

  const [products, setProducts] = useState([]);

  useEffect (() =>{
    loadProducts()
      .then((response) => {
        setProducts(response.data)
        console.log(response.data)
      })
      .catch ((error) => {
        console.log("Error!")
      })
  }, []);

  return (
  <div className={styles.productContent}>
    <h2 className={styles.title}>Bestsellers of the <span className={styles.accent}>week</span></h2>
    <div className={styles.productsContainer}>
      {products.map((product) => (
        <div key={product._id}>
            <h1>{product.name}</h1>
            <p>{product.price}</p>
            <p>{product.stock}</p>
            <p>{product.description}</p>
        </div>
      ))}
    </div>
  </div>
  )
}

export default ProductList