import { Link } from 'react-router-dom';
import styles from './header.module.css';
import NavBar from '../NavBar/NavBar';
import computechLogo from '../../assets/computech-logo.svg';
import computechLogoText from '../../assets/computech-logo-text.svg';

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.headerContent}>
          <Link to={'/'}>
            <img src={computechLogo} alt='computech logo' />
            <img className={styles.computechLogoText} src={computechLogoText} alt='computech text' />
          </Link>
          <div className={styles.icons}>
            <span className='material-symbols-rounded'>search</span>
            <span className='material-symbols-rounded'>shopping_cart</span>
            <Link to={'my-account'}>
              <span className='material-symbols-rounded'>person</span>
            </Link>
            <NavBar />
          </div>
        </div>
      </div>
      {/* <div className={`${styles.bgOverlay} ${propNavLvl2 ? styles.active : ''}`}></div> */}
    </header>
  );
}

export default Header;
