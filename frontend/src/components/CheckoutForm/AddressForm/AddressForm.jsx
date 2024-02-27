import { AddressElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { PrimaryButton } from '../../Button/Button';
import styles from './AddressForm.module.css';

function AddressForm() {
  const [address, setAddress] = useState({}); //[street, city, postalCode, country
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    } else {
      console.log(address);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <AddressElement
        options={{ mode: 'shipping' }}
        onChange={(event) => {
          if (event.complete) {
            // Extract potentially complete address
            const address = event.value.address;
            setAddress(address);
          }
        }}
      />
      <br />
      <PrimaryButton disabled={!stripe} value='Confirm address' />
    </form>
  );
}

export default AddressForm;
