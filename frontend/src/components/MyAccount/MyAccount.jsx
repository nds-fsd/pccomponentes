import { Link } from 'react-router-dom';
import styles from './myAccount.module.css';

function MyAccount() {
  return (
    <main>
      <section className={styles.myAccount}>
        <h3 className={styles.title}>My Account</h3>
        <div className={styles.cards}>
          <Link to={'/profile'} className={styles.card}>
            <span className='material-symbols-rounded'>badge</span>
            My profile
          </Link>
          <Link className={styles.card}>
            <span className='material-symbols-rounded'>local_mall</span>
            My purchases
          </Link>
          <Link className={styles.card}>
            <span className='material-symbols-rounded'>favorite</span>
            Wishlist
          </Link>
        </div>
      </section>
    </main>
  );
}

export default MyAccount;
