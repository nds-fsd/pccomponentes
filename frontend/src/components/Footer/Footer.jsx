import { Link } from 'react-router-dom';
import styles from './footer.module.css';
import computechLogo from '../../assets/computech-logo.svg';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.text}>
          <Link to={'/terms-and-conditions'}>Terms and conditions</Link>
          <Link to={'/privacy-policy'}>Privacy Policy</Link>
        </div>
        <Link to={'/'}>
          <img src={computechLogo} alt='Computech logo' />
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
