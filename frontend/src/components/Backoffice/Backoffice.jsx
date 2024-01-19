import BackofficeProducts from './BackofficeProducts/BackofficeProducts';
import BackofficeNav from './BackofficeNav/BackofficeNav';
import styles from './backoffice.module.css';

import { ConfigProvider, theme } from 'antd';
const { darkAlgorithm } = theme;

const Backoffice = () => {
  return (
    <ConfigProvider theme={{ algorithm: darkAlgorithm }}>
      <div className={styles.body}>
        <BackofficeNav />
        <BackofficeProducts />
      </div>
    </ConfigProvider>
  );
};

export default Backoffice;
