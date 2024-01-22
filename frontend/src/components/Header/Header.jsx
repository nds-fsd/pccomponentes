import { Link } from 'react-router-dom';
import styles from './header.module.css';
import NavBar from '../NavBar/NavBar';
import computechLogo from '../../assets/computech-logo.svg';
import computechLogoText from '../../assets/computech-logo-text.svg';

export const Header = ({ isLogged, accountCreated }) => {
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
            {isLogged && (
              <Link to={'my-account'}>
                <span className='material-symbols-rounded'>person</span>
              </Link>
            )}
            {!isLogged && accountCreated && (
              <Link to={'login'}>
                <span className='material-symbols-rounded'>person</span>
              </Link>
            )}
            {!isLogged && !accountCreated && (
              <Link to={'register'}>
                <span className='material-symbols-rounded'>person</span>
              </Link>
            )}
            <NavBar />
          </div>
        </div>
      </div>
      {/* <div className={`${styles.bgOverlay} ${propNavLvl2 ? styles.active : ''}`}></div> */}
    </header>
  );
};

export default Header;
