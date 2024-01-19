import { Outlet } from 'react-router-dom';
import BackofficeNav from './BackofficeNav/BackofficeNav';

const BackofficeLayout = () => {
  return (
    <>
      <BackofficeNav />
      <Outlet />
    </>
  );
};
export default BackofficeLayout;
