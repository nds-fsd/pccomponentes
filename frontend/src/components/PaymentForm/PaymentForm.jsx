import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { api } from '../../_utils/api';

function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
    if (!error) {
      const { id } = paymentMethod;
      const { data } = await api.post('/checkout', { id, amount: 1000 });
      console.log(data);
    } else {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type='submit'>Pay</button>
    </form>
  );
}

export default PaymentForm;
