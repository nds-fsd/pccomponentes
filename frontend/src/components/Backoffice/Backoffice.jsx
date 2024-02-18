import BackofficeCompany from './BackofficeCompany/BackofficeCompany';
import BackofficeProducts from './BackofficeProducts/BackofficeProducts';
import BackofficeUsers from './BackofficeUsers/BackofficeUsers';
import BackofficeNav from './BackofficeNav/BackofficeNav';
import styles from './backoffice.module.css';
import BackofficeHome from './BackofficeHome/BackofficeHome';

const Backoffice = () => {
  return (
    <div className={styles.body}>
      <BackofficeNav />
      <BackofficeCompany />
      <BackofficeHome />
      <BackofficeProducts />
      <BackofficeUsers />
    </div>
  );
};

export default Backoffice;
