import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import ProductPage from './pages/ProductPage/ProductPage';
import CategoryProductsPage from './pages/CategoryProductsPage/CategoryProductsPage';
import SalesPage from './pages/SalesPage/SalesPage';
import TermsConditions from './pages/TermsConditions/TermsConditions';
import PrivacyPolicy from './components/PrivacyPolicy/PrivacyPolicy';
import MyAccount from './pages/MyAccount/MyAccount';
import Profile from './pages/Profile/Profile';
import BackofficeLayout from './components/Backoffice/BackofficeLayout';
import BackofficeHome from './components/Backoffice/BackofficeHome/BackofficeHome';
import BackofficeUsers from './components/Backoffice/BackofficeUsers/BackofficeUsers';
import BackofficeProducts from './components/Backoffice/BackofficeProducts/BackofficeProducts';
import BackofficeCompanies from './components/Backoffice/BackofficeCompanies/BackofficeCompanies';
import BackofficeCategories from './components/Backoffice/BackofficeCategories/BackofficeCategories';
import NoMatch from './pages/NoMatch/NoMatch';
import Cart from './components/Cart/Cart';
import ResultsPage from './pages/ResultsPage/ResultsPage';
import { CartProvider } from './contexts/CartContext';
import { useState } from 'react';
import { Routes, Route, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { getUserRole, getUserToken } from './_utils/localStorage.utils';
import { Register } from './components/LogInRegisterForm/Register';
import { Login } from './components/LogInRegisterForm/Login';

function UserLayout({ children }) {
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
    <>
      <CartProvider>
        <Header isLogged={isLogged} accountCreated={accountCreated} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/category/:categoryId' element={<CategoryProductsPage />} />
          <Route path=':id' element={<ProductPage isLogged={isLogged} />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/results' element={<ResultsPage />} />
          <Route path='/terms-and-conditions' element={<TermsConditions />} />
          <Route path='/privacy-policy' element={<PrivacyPolicy />} />
          <Route path='/sales' element={<SalesPage />} />
          {isLogged && <Route path='/my-account' element={<MyAccount />} />}
          {isLogged && <Route path='/profile' element={<Profile token={token} />} />}
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
        <Footer />
      </CartProvider>
    </>
  );
}

function Backoffice({ children }) {
  const token = getUserToken();
  const isLogged = !!token;

  const navigate = useNavigate();

  const userRole = getUserRole();

  if (isLogged && userRole !== 'admin') {
    return <Navigate to='/' />;
  }

  return (
    <Routes>
      <Route path='/backoffice' element={<BackofficeLayout />}>
        <Route path='/backoffice' element={<BackofficeHome />} />
        <Route path='/backoffice/users' element={<BackofficeUsers />} />
        <Route path='/backoffice/products' element={<BackofficeProducts />} />
        <Route path='/backoffice/companies' element={<BackofficeCompanies />} />
        <Route path='/backoffice/categories' element={<BackofficeCategories />} />
      </Route>
    </Routes>
  );
}

function App() {
  const location = useLocation();

  if (location.pathname.startsWith('/backoffice')) {
    return <Backoffice />;
  } else {
    return <UserLayout />;
  }
}

export default App;
