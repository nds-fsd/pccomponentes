import Layout from './components/Layout';
import Home from './components/Home/Home';
import ProductList from './components/ProductList/ProductList';
import Product from './components/Product/Product';
import TermsConditions from './components/TermsConditions/TermsConditions';
import PrivacyPolicy from './components/PrivacyPolicy/PrivacyPolicy';
import MyAccount from './components/MyAccount/MyAccount';
import Profile from './components/Profile/Profile';
import BackofficeLayout from './components/Backoffice/BackofficeLayout';
import BackofficeHome from './components/Backoffice/BackofficeHome/BackofficeHome';
import BackofficeUsers from './components/Backoffice/BackofficeUsers/BackofficeUsers';
import NoMatch from './components/NoMatch/NoMatch';

import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { getUserToken } from './_utils/localStorage.utils';
import { Register } from './components/LogInRegisterForm/Register';
import { Login } from './components/LogInRegisterForm/Login';

const queryClient = new QueryClient();

function App() {
  const [accountCreated, setAccountCreated] = useState(true);
  const [update, setUpdate] = useState(true);

  const changeAccountCreated = (btnType) => {
    if (btnType == 'login') return setAccountCreated(true);
    else if (btnType == 'register') return setAccountCreated(false);
  };

  const forceUpdate = () => {
    setUpdate(!update);
  };

  const token = getUserToken();
  const isLogged = !!token;

  return (
    <QueryClientProvider client={queryClient}>
      <Header isLogged={isLogged} accountCreated={accountCreated} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product-list' element={<ProductList />} />
        <Route path=':id' element={<Product />} />
        <Route path='/terms-and-conditions' element={<TermsConditions />} />
        <Route path='/privacy-policy' element={<PrivacyPolicy />} />
        {isLogged && <Route path='/my-account' element={<MyAccount />} />}
        <Route path='/profile' element={<Profile token={token} />} />

        {!isLogged && !accountCreated && (
          <Route
            path='/register'
            element={<Register forceUpdate={forceUpdate} changeAccountCreated={changeAccountCreated} />}
          />
        )}
        {!isLogged && accountCreated && (
          <Route
            path='/login'
            element={<Login forceUpdate={forceUpdate} changeAccountCreated={changeAccountCreated} />}
          />
        )}
        <Route path='*' element={<NoMatch />} />
      </Routes>

      <Routes>
        <Route path='/backoffice' element={<BackofficeLayout />}>
          <Route path='/backoffice' element={<BackofficeHome />} />
          <Route path='backoffice/users' element={<BackofficeUsers />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
