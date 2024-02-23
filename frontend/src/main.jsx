import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ConfigProvider, theme } from 'antd';
const { darkAlgorithm } = theme;
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY || 'fallback_stripe_public_key');

const queryClient = new QueryClient();

const options = {
  // passing the client secret obtained from the server
  clientSecret: process.env.REACT_APP_STRIPE_SECRET_KEY,
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Elements stripe={stripePromise} options={options}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ConfigProvider theme={{ algorithm: darkAlgorithm }}>
            <App />
          </ConfigProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </Elements>
  </React.StrictMode>
);
