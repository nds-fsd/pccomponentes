import ProductCard from '../ProductCard/ProductCard';
import styles from './productList.module.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { api } from '../../_utils/api';

function ProductList({
  product,
}) {
  const [
    products,
    setProducts,
  ] =
    useState(
      []
    );

  const getAllProducts =
    async () => {
      return api.get(
        '/products'
      );
    };

  useEffect(() => {
    getAllProducts()
      .then(
        (
          response
        ) => {
          setProducts(
            response.data
          );
          console.log(
            response.data
          );
        }
      )
      .catch(
        (
          error
        ) => {
          console.log(
            'Error!'
          );
        }
      );
  }, []);

  return (
    <div
      className={
        styles.productContent
      }
    >
      <h2
        className={
          styles.title
        }
      >
        Bestsellers
        of
        the{' '}
        <span
          className={
            styles.accent
          }
        >
          week
        </span>
      </h2>
      <div
        className={
          styles.productsContainer
        }
      >
        {products.map(
          (
            product
          ) => (
            <ProductCard
              key={
                product._id
              }
              product={
                product
              }
            ></ProductCard>
          )
        )}
      </div>
    </div>
  );
}

export default ProductList;
