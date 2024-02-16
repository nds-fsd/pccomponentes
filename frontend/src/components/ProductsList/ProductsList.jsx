import styles from './ProductsList.module.css';
import ProductCard from '../ProductCard/ProductCard';
const ProductsList = ({ products }) => {
  return (
    <div className={styles.productsContainer}>
      {products.map((product) => (
        <ProductCard key={product._id} product={product}></ProductCard>
      ))}
    </div>
  );
};

export default ProductsList;
