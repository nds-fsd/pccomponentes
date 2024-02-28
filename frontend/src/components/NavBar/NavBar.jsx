import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { api } from '../../_utils/api';
import NavSubCategory from './NavSubCategory/NavBarSubCategory';
import styles from './navBar.module.css';

const subCategories = {
  Consoles: ['PlayStation', 'Xbox', 'Nintendo'],
  Smartphones: ['Apple', 'Samsung', 'Xiaomi', 'OnePlus'],
  Gamepads: ['Wireless', 'Scuf'],
  Games: ['PlayStation', 'Xbox', 'Nintendo'],
  VR: ['Headset', 'Accessories', 'Controllers'],
  Headsets: ['Logitech', 'Corsair', 'Razer'],
  Mouses: ['Logitech', 'Corsair', 'Razer', 'SteelSeries'],
  Monitors: ['Samsung', 'LG', 'Acer'],
};

function NavBar({ isDesktop, navLvl1, navLvl2, navLvl3, showNavLvl1, showNavLvl2, showNavLvl3, hideAll }) {
  const [categories, setCategories] = useState([]);
  const [actualCategory, setActualCategory] = useState('');

  const handleSetActualCategory = (category) => {
    showNavLvl3();
    setActualCategory(category);
  };

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

  useEffect(() => {
    if (navLvl1 || navLvl2 === true) {
      document.body.classList.add('overflow-y-hidden');
    } else {
      document.body.classList.remove('overflow-y-hidden');
    }
  }, [navLvl1, navLvl2]);

  return (
    <>
      <nav className={`${navLvl1 ? styles.navLvl1 + ' ' + styles.active : styles.navLvl1}`}>
        <span className={'material-symbols-rounded'} id={styles.closeIcon} onClick={showNavLvl1}>
          close
        </span>
        <ul className={styles.lvl1Items}>
          <li
            onClick={showNavLvl2}
            onMouseEnter={() => {
              if (isDesktop && !navLvl2) {
                showNavLvl2();
              }
            }}
          >
            {' '}
            <div>
              <span className='material-symbols-rounded'>category</span>
              Categories
            </div>
            <span className='material-symbols-rounded'>chevron_right</span>
          </li>
          <li onClick={hideAll}>
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
          <ul className={styles.lvl2Items}>
            {isDesktop
              ? categories.slice(0, 5).map((category) => (
                  <li key={category._id} onClick={showNavLvl3}>
                    <p>
                      {category.name}
                      <span className='material-symbols-rounded'>chevron_right</span>
                    </p>
                    <NavSubCategory
                      navLvl3={navLvl3}
                      showNavLvl3={showNavLvl3}
                      hideAll={hideAll}
                      categoryName={category.name}
                      subCategories={subCategories[category.name]}
                    />
                  </li>
                ))
              : categories.map((category) => {
                  return (
                    <li key={category._id} onClick={() => handleSetActualCategory(category)}>
                      <p>
                        {category.name}
                        <span className='material-symbols-rounded'>chevron_right</span>
                      </p>
                      <NavSubCategory
                        navLvl3={navLvl3}
                        showNavLvl3={showNavLvl3}
                        hideAll={hideAll}
                        categoryName={actualCategory.name}
                        subCategories={subCategories[category.name]}
                      />
                    </li>
                  );
                })}
            <li onClick={showNavLvl3} className={styles.allProductsItem}>
              <Link to={'/results'}>See all</Link>
            </li>
          </ul>
        </div>
      </nav>
      <span className='material-symbols-rounded' id={styles.hambIcon} onClick={showNavLvl1}>
        menu
      </span>
      <div className={`${styles.bgOverlayMobile} ${navLvl1 ? styles.active : ''}`} onClick={hideAll}></div>
    </>
  );
}

export default NavBar;
