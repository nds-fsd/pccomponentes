import styles from './WishlistProducts.module.css';
import WishlistCard from '../WishlistCard/WishlistCard';
const WishlistProducts = ({ products }) => {
  return (
    <div className={styles.productsContainer}>
      {products.map((product) => {
        return <WishlistCard key={product._id} id={product._id} product={product} />;
      })}
    </div>
  );
};

export default WishlistProducts;
