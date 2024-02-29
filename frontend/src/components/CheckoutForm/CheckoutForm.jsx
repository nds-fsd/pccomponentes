import { PaymentElement, AddressElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { PrimaryButton } from '../Button/Button';
import styles from './checkoutForm.module.css';

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const { error } = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: 'http://localhost:3000/completed-order',
      },
    });

    if (error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
      setErrorMessage(error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div>
        <h3>Shipping Address</h3>
        <AddressElement options={{ mode: 'shipping' }} />
      </div>
      <div>
        <h3>Payment</h3>
        <PaymentElement />
      </div>
      <PrimaryButton disabled={!stripe} value='Confirm payment' />
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
}

export default CheckoutForm;
