import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Backoffice from './components/Backoffice/Backoffice';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Routes>
        <Route path='/admin' element={<Backoffice />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
