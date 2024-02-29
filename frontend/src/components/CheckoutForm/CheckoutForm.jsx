import { PaymentElement, AddressElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { PrimaryButton } from '../Button/Button';
import styles from './checkoutForm.module.css';
import { api } from '../../_utils/api';
import { getUserSession } from '../../_utils/localStorage.utils';

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState(null);
  const [stripeAddress, setStripeAddress] = useState({});
  const [address, setAddress] = useState({});
  const { addressId, setAddressId } = useState('');

  const user = getUserSession();
  const productsLocalStorage = localStorage.getItem('CartProducts');
  const products = JSON.parse(productsLocalStorage);
  const order = products.map((product) => ({
    productId: product._id,
    quantity: product.quantity,
  }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    postAddress();
    // postOrder(order);

    if (!stripe || !elements) {
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const { error } = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        // return_url: 'http://localhost:3000/completed-order',
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

  const postAddress = async () => {
    const newAddress = {
      street: stripeAddress.line1,
      user: user.id,
      postalCode: stripeAddress.postal_code,
      country: stripeAddress.country,
    };
    setAddress(newAddress);
    try {
      const response = await api.post('/addresses', newAddress);
      console.log(response.data._id);
    } catch (error) {
      console.log(error);
    }
  };

  // const postOrder = async (order, address) => {
  //   const newAddress = {
  //     street: address.line1,
  //     user: user.id,
  //     postalCode: address.postal_code,
  //     country: address.country,
  //   };
  //   const newOrder = {
  //     user: user.id,
  //     products: order.productId,
  //     address: address,
  //   };
  //   try {
  //     await api.post('/orders', newOrder);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div>
        <h3>Shipping Address</h3>
        <AddressElement
          options={{ mode: 'shipping' }}
          onChange={(event) => {
            if (event.complete) {
              // Extract potentially complete address
              const stripeAddressData = event.value.address;
              setStripeAddress(stripeAddressData);
              console.log(address);
            }
          }}
        />
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
