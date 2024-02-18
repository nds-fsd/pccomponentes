import { Outlet } from 'react-router-dom';
import BackofficeNav from './BackofficeNav/BackofficeNav';

import styles from './backofficeLayout.module.css';

const BackofficeLayout = () => {
  return (
    <div className={styles.body}>
      <BackofficeNav />
      <Outlet />
    </div>
  );
};

export default BackofficeLayout;
