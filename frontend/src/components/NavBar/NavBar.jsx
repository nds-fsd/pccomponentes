import { Link } from 'react-router-dom';
import { useState } from 'react';
import styles from './navBar.module.css';

function NavBar() {
  const [sidebar, setSidebar] = useState(false);
  const [subMenu, setSubMenu] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const showSubMenu = () => setSubMenu(!subMenu);

  return (
    <>
      <nav className={`${sidebar ? styles.navMenu + ' ' + styles.active : styles.navMenu}`}>
        <span className={'material-symbols-rounded'} id={styles.closeIcon} onClick={showSidebar}>
          close
        </span>
        <ul>
          <li onClick={showSidebar}>
            <Link to='/'>Home</Link>
          </li>
          <li onClick={showSubMenu}>Product List</li>
        </ul>
        <div className={`${subMenu ? styles.subMenu + ' ' + styles.active : styles.subMenu}`}>
          <button onClick={showSubMenu}>
            <span className='material-symbols-rounded'>chevron_left</span>
            Back
          </button>
          <p className={styles.categoryTitle}>Product List</p>
          <ul>
            <li>
              Headset<span className='material-symbols-rounded'>chevron_right</span>
            </li>
            <li>
              Mouse<span className='material-symbols-rounded'>chevron_right</span>
            </li>
            <li>
              Potato<span className='material-symbols-rounded'>chevron_right</span>
            </li>
          </ul>
        </div>
      </nav>
      <span className='material-symbols-rounded' id={styles.hambIcon} onClick={showSidebar}>
        menu
      </span>
      <div className={`${styles.bgOverlay} ${sidebar ? styles.active : ''}`} onClick={showSidebar}></div>
    </>
  );
}

export default NavBar;
