import Lottie from 'lottie-react';
import completedCheck from '../../assets/lottie/completed-check.json';
import styles from './completedOrder.module.css';
import { useEffect } from 'react';
import { api } from '../../_utils/api';

const CompletedPayment = () => {
  // localStorage.removeItem('CartProducts');

  return (
    <main className={`wrapper fullvh ${styles.main}`}>
      <h3>Order Completed!</h3>
      <p>Your products are being processed to be delivered.</p>
      <Lottie animationData={completedCheck} className={` ${styles.lottie}`} />
      <p>Thank you for trusting us!</p>
    </main>
  );
};

export default CompletedPayment;
