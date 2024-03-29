import styles from './ProductsList.module.css';
import ProductCard from '../ProductCard/ProductCard';
const ProductsList = ({ products }) => {
  return (
    <div className={styles.productsContainer}>
      {products.map((product) => {
        return <ProductCard key={product._id} id={product._id} product={product} />;
      })}
    </div>
  );
};

export default ProductsList;
