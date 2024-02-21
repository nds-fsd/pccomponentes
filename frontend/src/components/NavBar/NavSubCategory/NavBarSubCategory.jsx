import { Link } from 'react-router-dom';
import styles from './navBarSubCategory.module.css';

const NavSubCategory = ({ navLvl3, showNavLvl3, hideAll, categoryName, subCategories }) => {
  return (
    <>
      <div className={`${navLvl3 ? styles.navLvl3 + ' ' + styles.active : styles.navLvl3}`}>
        <button onClick={showNavLvl3}>
          <span className='material-symbols-rounded'>chevron_left</span>
          Back
        </button>
        <p className={styles.categoryTitle}>{categoryName}</p>
        <ul className={styles.lvl3Items}>
          {subCategories?.map((subCategory) => (
            <li onClick={hideAll} key={`${categoryName}_${subCategory}`}>
              <Link to={`/${categoryName?.toLowerCase()}/${subCategory?.toLowerCase()}`}>{subCategory}</Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default NavSubCategory;
