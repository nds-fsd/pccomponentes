import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../Profile/Avatar';
import { getUserToken, getUserSession } from '../../_utils/localStorage.utils';
import styles from './header.module.css';
import NavBar from '../NavBar/NavBar';
import computechLogo from '../../assets/computech-logo.svg';
import computechLogoText from '../../assets/computech-logo-text.svg';

export const Header = ({ isLogged, accountCreated }) => {
  const [username, setUsername] = useState('');
  const [navLvl1, setNavLvl1] = useState(false);
  const [navLvl2, setNavLvl2] = useState(false);
  const [navLvl3, setNavLvl3] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1024);
  const showNavLvl1 = () => setNavLvl1(!navLvl1);
  const showNavLvl2 = () => setNavLvl2(!navLvl2);
  const showNavLvl3 = () => setNavLvl3(!navLvl3);
  const hideAll = () => {
    setNavLvl1(false);
    setNavLvl2(false);
    setNavLvl3(false);
  };

  addEventListener('resize', () => {
    setIsDesktop(window.innerWidth > 1024);
  });

  const [cartProductsCount, setCartProductsCount] = useState(0);

  useEffect(() => {
    const token = getUserToken();
    const cartProducts = JSON.parse(localStorage.getItem('CartProducts')) || [];
    setCartProductsCount(cartProducts.length);
    if (isLogged && token) {
      try {
        const userSession = getUserSession();

        const userUsername = userSession.username;

        setUsername(userUsername);
      } catch (error) {
        console.error('Error getting username:', error);
      }
    }
  }, [isLogged]);

  return (
    <>
      <header
        className={styles.header}
        onMouseLeave={() => {
          if (isDesktop && navLvl2) {
            hideAll();
          }
        }}
      >
        <div className={styles.headerContainer}>
          <div className={styles.headerContent}>
            <Link to={'/'} onClick={hideAll}>
              <img src={computechLogo} alt='computech logo' />
              <img className={styles.computechLogoText} src={computechLogoText} alt='computech text' />
            </Link>
            <div className={styles.icons}>
              <span className='material-symbols-rounded'>search</span>
              <Link to={'/cart'} className={styles.cartElements}>
                <span className='material-symbols-rounded'>shopping_cart</span>
                {cartProductsCount > 0 && <div className={styles.cartCount}>{cartProductsCount}</div>}
              </Link>
              {isLogged && (
                <Link to={'/my-account'} className={styles.avatar}>
                  <Avatar username={username} />
                </Link>
              )}
              {!isLogged && accountCreated && (
                <Link to={'/login'}>
                  <span className='material-symbols-rounded'>person</span>
                </Link>
              )}
              {!isLogged && !accountCreated && (
                <Link to={'/register'}>
                  <span className='material-symbols-rounded'>person</span>
                </Link>
              )}
              <NavBar
                navLvl1={navLvl1}
                navLvl2={navLvl2}
                navLvl3={navLvl3}
                showNavLvl1={showNavLvl1}
                showNavLvl2={showNavLvl2}
                showNavLvl3={showNavLvl3}
                hideAll={hideAll}
                isDesktop={isDesktop}
              />
            </div>
          </div>
        </div>
      </header>
      <div className={`${styles.bgOverlayDesktop} ${navLvl1 || navLvl2 ? styles.active : ''}`} onClick={hideAll}></div>
    </>
  );
};

export default Header;
