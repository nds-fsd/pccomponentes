import { Link } from 'react-router-dom';
import { useState } from 'react';
import styles from './navBar.module.css';

function NavBar() {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <nav
        className={`${
          sidebar ? styles.navMenu + ' ' + styles.active : styles.navMenu
        }`}>
        <span
          className={'material-symbols-rounded'}
          id={styles.closeIcon}
          onClick={showSidebar}>
          close
        </span>
        <ul>
          <li onClick={showSidebar}>
            <Link to='/'>Home</Link>
          </li>
          <li onClick={showSidebar}>
            <Link to='product-list'>Product List</Link>
          </li>
        </ul>
      </nav>
      <span
        className='material-symbols-rounded'
        id={styles.hambIcon}
        onClick={showSidebar}>
        menu
      </span>
      <div
        className={`${styles.bgOverlay} ${sidebar ? styles.active : ''}`}
        onClick={showSidebar}></div>
    </>
  );
}

export default NavBar;
