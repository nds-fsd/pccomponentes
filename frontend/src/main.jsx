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

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ConfigProvider theme={{ algorithm: darkAlgorithm }}>
          <Elements
            stripe={loadStripe(
              'pk_test_51OmfzmJSpZHT2eqbEtIXMKquOEfyOQIw5zOC2V0PGhgUecZaRwLhjvtcgrNX5uDNZ7MhcOw3qG33UNnvZSD200ia00ZcS4inqh'
            )}
          >
            <App />
          </Elements>
        </ConfigProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
