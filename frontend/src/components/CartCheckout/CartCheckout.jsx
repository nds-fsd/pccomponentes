import { Steps, Button } from 'antd';
import { useState, useEffect } from 'react';
import styles from './CartCheckout.module.css';

export const CartCheckout = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const storedCartProducts = localStorage.getItem('CartProducts');
    if (storedCartProducts) {
      const parsedCartProducts = JSON.parse(storedCartProducts);
      setProducts(parsedCartProducts);
    }
  }, []);

  const steps = [
    {
      title: 'Review Products',
      content: products.map((product) => {
        return (
          <div key={product._id} className={styles.product}>
            <img src={product.image[0]} alt='image of the product' />
            <div className={styles.text}>
              <p className={styles.productName}>{product.name}</p>
              <p className={styles.productPrice}>{product.price}€</p>
              <p>{product.quantity}</p>
            </div>
          </div>
        );
      }),
    },
    { title: 'Address', content: 'Address' },
    { title: 'Credit Card', content: 'Credit Card' },
  ];

  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  return (
    <>
      <Steps current={current} items={items} />
      <div>{steps[current].content}</div>
      <div
        style={{
          marginTop: 24,
        }}
      >
        {current > 0 && (
          <Button
            style={{
              margin: '0 8px',
            }}
            onClick={() => prev()}
          >
            Previous
          </Button>
        )}
        {current < steps.length - 1 && (
          <Button type='primary' onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type='primary' onClick={() => message.success('Processing complete!')}>
            Done
          </Button>
        )}
      </div>
    </>
  );
};
