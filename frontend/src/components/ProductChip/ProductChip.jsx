import styles from './productChip.module.css';

function ProductChip({ product }) {
  const fiveDaysAgo = new Date();
  fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);

  if (product.stock === 0) {
    return <span className={`${styles.chip} ${styles.outOfStock}`}>Out of stock</span>;
  } else if (product.sale > 0) {
    return (
      <span className={`${styles.chip} ${styles.sale}`}>
        On sale {((1 - product.sale / product.price) * 100).toFixed(0)} %
      </span>
    );
  } else if (new Date(product.creationDate) > fiveDaysAgo) {
    return <span className={`${styles.chip} ${styles.new}`}>New</span>;
  } else {
    return null;
  }
}
export default ProductChip;
