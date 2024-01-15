import styles from './navBarSubCategory.module.css';

const NavSubCategory = () => {
  return (
    <>
      <div className={styles.navLvl3}>
        <ul>
          <li>item1</li>
          <li>item2</li>
          <li>item3</li>
        </ul>
      </div>
    </>
  );
};

export default NavSubCategory;
