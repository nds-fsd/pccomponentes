import Layout from './components/Layout';
import Home from './components/Home/Home';
import ProductList from './components/ProductList/ProductList';
import Product from './components/Product/Product';
import TermsConditions from './components/TermsConditions/TermsConditions';
import PrivacyPolicy from './components/PrivacyPolicy/PrivacyPolicy';
import MyAccount from './components/MyAccount/MyAccount';
import Profile from './components/Profile/Profile';
import BackofficeLayout from './components/Backoffice/BackofficeLayout';
import BackofficeUsers from './components/Backoffice/BackofficeUsers/BackofficeUsers';
import NoMatch from './components/NoMatch/NoMatch';

import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/product-list' element={<ProductList />} />
          <Route path=':id' element={<Product />} />
          <Route path='/terms-and-conditions' element={<TermsConditions />} />
          <Route path='/privacy-policy' element={<PrivacyPolicy />} />
          <Route path='/my-account' element={<MyAccount />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='*' element={<NoMatch />} />
        </Route>
      </Routes>

      <Routes>
        <Route path='/backoffice' element={<BackofficeLayout />}>
          <Route path='backoffice/users' element={<BackofficeUsers />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
