import styles from './PaymentPage.module.css';

import { useState, useEffect } from 'react';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../../components/CheckoutForm/CheckoutForm';
import AddressForm from '../../components/CheckoutForm/AddressForm/AddressForm';

import { api } from '../../_utils/api';

function PaymentPage() {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    const getStripePublicKey = async () => {
      try {
        const response = await api.get('/create-payment-intent/public-key');
        const { publicKey } = response.data;
        setStripePromise(loadStripe(publicKey, { locale: 'en' }));
      } catch (error) {
        console.log(error);
      }
    };
    getStripePublicKey();
  }, []);

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const response = await api.post('/create-payment-intent');
        const { clientSecret } = response.data;
        setClientSecret(clientSecret);
      } catch (error) {
        console.log(error);
      }
    };
    createPaymentIntent();
  }, []);

  const appearance = {
    theme: 'night',
    variables: { colorPrimary: '#4261e1' },
  };

  const options = {
    clientSecret,
    appearance,
    business: 'CompuTech',
  };

  return (
    <main className={`wrapper ${styles.section}`}>
      <h1>Payment Page</h1>
      {/* {console.log(`clientSecret: ${clientSecret}`)} */}
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={options}>
          <AddressForm />
          <CheckoutForm clientSecret={clientSecret} />
        </Elements>
      )}
    </main>
  );
}

export default PaymentPage;
