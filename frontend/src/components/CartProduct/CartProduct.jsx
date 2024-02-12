import { Link } from 'react-router-dom';
import { InputNumber, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import styles from './CartProduct.module.css';

function CartProduct({ product }) {
  return (
    <Link to={`/${product._id}`} className={styles.product}>
      <img src={product.image[0]} alt='image of the product' />
      <div className={styles.text}>
        <p className={styles.productName}>{product.name}</p>
        <p className={styles.productPrice}>{product.price}€</p>
      </div>
      <InputNumber min={1} max={10} defaultValue={1} />
      <Button type='icon' icon={<DeleteOutlined />}></Button>
    </Link>
  );
}

export default CartProduct;
