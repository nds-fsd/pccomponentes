import { Link } from 'react-router-dom';
import styles from './navBarSubCategory.module.css';

const NavSubCategory = ({ navLvl3, showNavLvl3, hideAll, categoryName }) => {
  return (
    <>
      <div className={`${navLvl3 ? styles.navLvl3 + ' ' + styles.active : styles.navLvl3}`}>
        <button onClick={showNavLvl3}>
          <span className='material-symbols-rounded'>chevron_left</span>
          Back
        </button>
        <p className={styles.categoryTitle}>{categoryName}</p>
        <ul className={styles.lvl3Items}>
          <li onClick={hideAll}>
            <Link to={`/${categoryName?.toLowerCase()}`}>All</Link>
          </li>
          <li onClick={hideAll}>
            <Link to={`/${categoryName?.toLowerCase()}/${'item-2'}`}>item 2</Link>
          </li>
          <li onClick={hideAll}>
            <Link to={`/${categoryName?.toLowerCase()}/${'item-3'}`}>item 3</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default NavSubCategory;
