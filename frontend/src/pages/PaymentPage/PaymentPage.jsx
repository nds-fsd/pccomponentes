import styles from './PaymentPage.module.css';
import PaymentForm from '../../components/PaymentForm/PaymentForm';

function PaymentPage() {
  return (
    <main className={`wrapper ${styles.section}`}>
      <h1>Payment Page</h1>
      <PaymentForm />
    </main>
  );
}

export default PaymentPage;
