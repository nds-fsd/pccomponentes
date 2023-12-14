import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import ProductList from "./components/ProductList/ProductList";
import Product from "./components/Product/Product";
import TermsConditions from "./components/TermsConditions/TermsConditions";
import PrivacyPolicy from "./components/PrivacyPolicy/PrivacyPolicy";
import NoMatch from "./components/NoMatch/NoMatch";

import {
  Routes,
  Route,
} from 'react-router-dom';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Home />
          }
        />
        <Route
          path="/product-list"
          element={
            <ProductList />
          }
        />
        <Route
          path=":id"
          element={
            <Product />
          }
        />
        <Route
          path="/terms-and-conditions"
          element={
            <TermsConditions />
          }
        />
        <Route
          path="/privacy-policy"
          element={
            <PrivacyPolicy />
          }
        />
        <Route
          path="*"
          element={
            <NoMatch />
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
