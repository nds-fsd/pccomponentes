import { Link } from 'react-router-dom';
import { useState } from 'react';
import NavSubCategory from './NavSubCategory/NavBarSubCategory';
import styles from './navBar.module.css';

function NavBar() {
  const [navLvl1, setNavLvl1] = useState(false);
  const [navLvl2, setNavLvl2] = useState(false);
  const [navLvl3, setNavLvl3] = useState(false);
  const showNavLvl1 = () => setNavLvl1(!navLvl1);
  const showNavLvl2 = () => setNavLvl2(!navLvl2);
  const showNavLvl3 = () => setNavLvl3(!navLvl3);

  return (
    <>
      <nav className={`${navLvl1 ? styles.navLvl1 + ' ' + styles.active : styles.navLvl1}`}>
        <span className={'material-symbols-rounded'} id={styles.closeIcon} onClick={showNavLvl1}>
          close
        </span>
        <ul>
          <li onClick={showNavLvl1}>
            <Link to='/'>Home</Link>
          </li>
          <li onClick={showNavLvl2}>Product List</li>
        </ul>
        <div className={`${navLvl2 ? styles.navLvl2 + ' ' + styles.active : styles.navLvl2}`}>
          <button onClick={showNavLvl2}>
            <span className='material-symbols-rounded'>chevron_left</span>
            Back
          </button>
          <p className={styles.categoryTitle}>Product List</p>
          <ul>
            <li onClick={showNavLvl3}>
              Headset<span className='material-symbols-rounded'>chevron_right</span>
              <NavSubCategory navLvl3={navLvl3} showNavLvl3={showNavLvl3} />
            </li>
            <li>
              Mouse<span className='material-symbols-rounded'>chevron_right</span>
              <NavSubCategory />
            </li>
            <li>
              Potato<span className='material-symbols-rounded'>chevron_right</span>
              <NavSubCategory />
            </li>
          </ul>
        </div>
      </nav>
      <span className='material-symbols-rounded' id={styles.hambIcon} onClick={showNavLvl1}>
        menu
      </span>
      <div className={`${styles.bgOverlay} ${navLvl1 ? styles.active : ''}`} onClick={showNavLvl1}></div>
      {console.log(`Nav Level 1: ${navLvl1}, Nav Level 2: ${navLvl2}, Nav Level 3: ${navLvl3}`)}
    </>
  );
}

export default NavBar;
