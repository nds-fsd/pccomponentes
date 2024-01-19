import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const Layout = () => {
  return (
    <>
      <Header isLogged={isLogged} accountCreated={accountCreated} />
      <Outlet />
      <Footer />
    </>
  );
};
export default Layout;
