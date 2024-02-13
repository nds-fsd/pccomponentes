import React, { useState, useEffect } from 'react';
import { InputNumber, Button, Modal } from 'antd';
import styles from './CartProduct.module.css';

const { confirm } = Modal;

function CartProduct({ product, onUpdateCart }) {
  const [quantity, setQuantity] = useState(product.quantity);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    setQuantity(product.quantity);
  }, [product.quantity]);

  const showDeleteConfirmation = () => {
    confirm({
      title: 'Are you sure you want to delete this item?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        handleDelete();
      },
    });
  };

  const handleQuantityChange = (value) => {
    setQuantity(value);
    const updatedCart = JSON.parse(localStorage.getItem('CartProducts')).map((item) => {
      if (item._id === product._id) {
        return { ...item, quantity: value };
      }
      return item;
    });
    localStorage.setItem('CartProducts', JSON.stringify(updatedCart));
    if (onUpdateCart) {
      onUpdateCart(updatedCart);
    }
  };

  const handleDelete = () => {
    const updatedCart = JSON.parse(localStorage.getItem('CartProducts')).filter((item) => item._id !== product._id);
    localStorage.setItem('CartProducts', JSON.stringify(updatedCart));
    if (onUpdateCart) {
      onUpdateCart(updatedCart);
    }
  };

  return (
    <div className={styles.product}>
      <img src={product.image[0]} alt='image of the product' />
      <div className={styles.text}>
        <p className={styles.productName}>{product.name}</p>
        <p className={styles.productPrice}>{product.price}€</p>
      </div>
      <InputNumber min={1} max={10} value={quantity} onChange={handleQuantityChange} />
      <Button type='icon' onClick={showDeleteConfirmation} className={styles.cart_icon}>
        <span class='material-symbols-rounded'>delete</span>
      </Button>
    </div>
  );
}

export default CartProduct;
