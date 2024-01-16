import computechLogo from '../../../assets/computech-logo.svg';
import { Link } from 'react-router-dom';
import styles from './backofficenav.module.css';

const BackofficeNav = () => {
  return (
    <nav className={styles.nav}>
      <img src={computechLogo} alt='Computech Logo' />
      <ul>
        <li>
          <Link to='/backoffice/products'>
            <span className='material-symbols-rounded'>inventory_2</span>Products
          </Link>
        </li>
        <li>
          <Link to='/backoffice/categories'>
            <span className='material-symbols-rounded'>category</span>Categories
          </Link>
        </li>
        <li>
          <Link to='/backoffice/orders'>
            <span className='material-symbols-rounded'>conveyor_belt</span>Orders
          </Link>
        </li>
        <li>
          <Link to='/backoffice/users'>
            <span className='material-symbols-rounded'>person</span>Users
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default BackofficeNav;
