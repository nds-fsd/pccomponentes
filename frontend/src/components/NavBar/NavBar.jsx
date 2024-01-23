import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { api } from '../../_utils/api';
import NavSubCategory from './NavSubCategory/NavBarSubCategory';
import styles from './navBar.module.css';

function NavBar({ navLvl1, navLvl2, navLvl3, showNavLvl1, showNavLvl2, showNavLvl3, hideAll }) {
  const [categories, setCategories] = useState([]);
  const getAllCategories = async () => {
    return api.get('/categories');
  };

  useEffect(() => {
    getAllCategories()
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log('Error!');
      });
  }, []);

  return (
    <>
      <nav className={`${navLvl1 ? styles.navLvl1 + ' ' + styles.active : styles.navLvl1}`}>
        <span className={'material-symbols-rounded'} id={styles.closeIcon} onClick={showNavLvl1}>
          close
        </span>
        <ul>
          <li onClick={showNavLvl2}>
            <div>
              <span className='material-symbols-rounded'>category</span>
              Categories
            </div>
            <span className='material-symbols-rounded'>chevron_right</span>
          </li>
          <li onClick={showNavLvl1}>
            <Link to='/sales'>
              <span className='material-symbols-rounded'>shoppingmode</span>
              Sales
            </Link>
          </li>
        </ul>
        <div className={`${navLvl2 ? styles.navLvl2 + ' ' + styles.active : styles.navLvl2}`}>
          <button onClick={showNavLvl2}>
            <span className='material-symbols-rounded'>chevron_left</span>
            Back
          </button>
          <p className={styles.categoryTitle}>Categories</p>
          <ul>
            {categories.map((category) => (
              <li key={category._id} onClick={showNavLvl3}>
                <p>
                  {category.categoryName}
                  <span className='material-symbols-rounded'>chevron_right</span>
                </p>
                <NavSubCategory
                  navLvl3={navLvl3}
                  showNavLvl3={showNavLvl3}
                  hideAll={hideAll}
                  categoryName={category.categoryName}
                />
              </li>
            ))}
          </ul>
        </div>
      </nav>
      <span className='material-symbols-rounded' id={styles.hambIcon} onClick={showNavLvl1}>
        menu
      </span>
      {/* <div className={`${styles.bgOverlay} ${navLvl1 ? styles.active : ''}`} onClick={hideAll}></div> */}
    </>
  );
}

export default NavBar;
