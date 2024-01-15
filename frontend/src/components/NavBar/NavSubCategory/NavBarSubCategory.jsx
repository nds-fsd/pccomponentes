import styles from './navBarSubCategory.module.css';

const NavSubCategory = ({ navLvl3, showNavLvl3 }) => {
  return (
    <>
      <div className={`${navLvl3 ? styles.navLvl3 + ' ' + styles.active : styles.navLvl3}`}>
        <button onClick={showNavLvl3}>
          <span className='material-symbols-rounded'>chevron_left</span>
          Back
        </button>
        <p className={styles.categoryTitle}>Headset</p>
        <ul>
          <li>item 1</li>
          <li>item 2</li>
          <li>item 3</li>
        </ul>
      </div>
    </>
  );
};

export default NavSubCategory;
