import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { api } from '../../_utils/api';
import NavSubCategory from './NavSubCategory/NavBarSubCategory';
import styles from './navBar.module.css';

function NavBar() {
  const [navLvl1, setNavLvl1] = useState(false);
  const [navLvl2, setNavLvl2] = useState(false);
  const [navLvl3, setNavLvl3] = useState(false);
  const showNavLvl1 = () => setNavLvl1(!navLvl1);
  const showNavLvl2 = () => setNavLvl2(!navLvl2);
  const showNavLvl3 = () => setNavLvl3(!navLvl3);
  const hideAll = () => {
    setNavLvl1(false);
    setNavLvl2(false);
    setNavLvl3(false);
  };
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
          <li onClick={showNavLvl1}>
            <Link to='/'>Home</Link>
          </li>
          <li onClick={showNavLvl2}>
            Product List <span className='material-symbols-rounded'>chevron_right</span>
          </li>
        </ul>
        <div className={`${navLvl2 ? styles.navLvl2 + ' ' + styles.active : styles.navLvl2}`}>
          <button onClick={showNavLvl2}>
            <span className='material-symbols-rounded'>chevron_left</span>
            Back
          </button>
          <p className={styles.categoryTitle}>Product List</p>
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
      <div className={`${styles.bgOverlay} ${navLvl1 ? styles.active : ''}`} onClick={hideAll}></div>
    </>
  );
}

export default NavBar;
