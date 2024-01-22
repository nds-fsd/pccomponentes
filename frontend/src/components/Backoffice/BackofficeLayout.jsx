import { Outlet } from 'react-router-dom';
import { ConfigProvider, theme } from 'antd';
const { darkAlgorithm } = theme;
import BackofficeNav from './BackofficeNav/BackofficeNav';

import styles from './backofficeLayout.module.css';

const BackofficeLayout = () => {
  return (
    <ConfigProvider theme={{ algorithm: darkAlgorithm }}>
      <div className={styles.body}>
        <BackofficeNav />
        <Outlet />
      </div>
    </ConfigProvider>
  );
};

export default BackofficeLayout;
