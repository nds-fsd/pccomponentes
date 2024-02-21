import styles from './productChip.module.css';

function ProductChip({ product }) {
  console.log(product);
  const fiveDaysAgo = new Date();
  fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);

  if (product.stock === 0) {
    return <span className={`${styles.chip} ${styles.outOfStock}`}>Out of stock</span>;
  } else if (product.sale === true) {
    return <span className={`${styles.chip} ${styles.sale}`}>On sale</span>;
  } else if (new Date(product.date) < fiveDaysAgo) {
    return <span className={`${styles.chip} ${styles.new}`}>New</span>;
  } else {
    return null;
  }
}
export default ProductChip;
