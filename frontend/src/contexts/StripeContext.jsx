import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from '../../components/PaymentForm/PaymentForm';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY || 'fallback_stripe_public_key');
const options = {
  // passing the client secret obtained from the server
  clientSecret: process.env.REACT_APP_STRIPE_SECRET_KEY,
};

const StripeContext = () => {
  // Component logic goes here

  return (
    // JSX markup goes here
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
};

export default StripeContext;
