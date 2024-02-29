import { Steps, Button } from 'antd';
import { useState, useEffect } from 'react';
import PaymentPage from '../PaymentPage/PaymentPage';
import styles from './Checkout.module.css';
import { PrimaryButton, TextButton } from '../../components/Button/Button';

const Checkout = () => {
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
              <p>{product.quantity} Units</p>
            </div>
          </div>
        );
      }),
    },
    { title: 'Checkout', content: <PaymentPage cartProducts={products} /> },
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
    <main className={`wrapper fullvh`}>
      <Steps current={current} items={items} className={styles.steps} />
      <div>{steps[current].content}</div>
      <div className={styles.buttons}>
        {current > 0 && <TextButton value='Previous' leftIcon='arrow_back' onClick={() => prev()} />}
        {current < steps.length - 1 && <PrimaryButton value='Next' rightIcon='arrow_forward' onClick={() => next()} />}
      </div>
    </main>
  );
};

export default Checkout;
