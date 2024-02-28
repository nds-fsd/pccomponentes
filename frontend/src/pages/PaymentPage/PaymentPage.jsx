import styles from './PaymentPage.module.css';

import { useState, useEffect } from 'react';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../../components/CheckoutForm/CheckoutForm';

import { api } from '../../_utils/api';

function PaymentPage({ cartProducts }) {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState('');

  function extractProductInfo(cartProducts) {
    return cartProducts.map((product) => ({
      productId: product._id,
      quantity: product.quantity,
    }));
  }

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
        const productsForCheckout = extractProductInfo(cartProducts);
        console.log('productsForCheckout', productsForCheckout);
        const response = await api.post('/create-payment-intent', { products: productsForCheckout });
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
    <>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm clientSecret={clientSecret} />
        </Elements>
      )}
    </>
  );
}

export default PaymentPage;
