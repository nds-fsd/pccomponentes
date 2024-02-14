import { Link } from 'react-router-dom';
import styles from './footer.module.css';
import computechLogo from '../../assets/computech-logo.svg';

function Footer() {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.text}>
          <Link to={'terms-and-conditions'} onClick={scrollToTop}>
            Terms and conditions
          </Link>
          <Link to={'privacy-policy'} onClick={scrollToTop}>
            Privacy Policy
          </Link>
        </div>
        <img src={computechLogo} alt='Computech logo' />
      </div>
    </footer>
  );
}

export default Footer;
