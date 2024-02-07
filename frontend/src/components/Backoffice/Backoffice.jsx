import BackofficeCompany from './BackofficeCompany/BackofficeCompany';
import BackofficeProducts from './BackofficeProducts/BackofficeProducts';
import BackofficeUsers from './BackofficeUsers/BackofficeUsers';
import BackofficeNav from './BackofficeNav/BackofficeNav';
import styles from './backoffice.module.css';
import BackofficeHome from './BackofficeHome/BackofficeHome';

import { ConfigProvider, theme } from 'antd';
const { darkAlgorithm } = theme;

const Backoffice = () => {
  return (
    <ConfigProvider theme={{ algorithm: darkAlgorithm }}>
      <div className={styles.body}>
        <BackofficeNav />
        <BackofficeCompany />
        <BackofficeHome />
        <BackofficeProducts />
        <BackofficeUsers />
      </div>
    </ConfigProvider>
  );
};

export default Backoffice;
