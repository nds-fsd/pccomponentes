import { Link } from 'react-router-dom';
import { getUserSession } from '../../_utils/localStorage.utils';
import styles from './myAccount.module.css';

function MyAccount() {
  const userSession = getUserSession();
  return (
    <main className={styles.main}>
      <section className={styles.myAccount}>
        <div className={styles.heading}>
          <p>Welcome!</p>
          <h2 className={styles.title}>{userSession.username}</h2>
          <p className={styles.subtitle}>Here you can find all your information</p>
        </div>
        <div className={styles.cards}>
          <Link to={'/profile'} className={styles.card}>
            <span className='material-symbols-rounded'>badge</span>
            My profile
          </Link>
          <Link className={styles.card}>
            <span className='material-symbols-rounded'>local_mall</span>
            My purchases
          </Link>
          <Link to={'/my-wishlist'} className={styles.card}>
            <span className='material-symbols-rounded'>favorite</span>
            Wishlist
          </Link>
        </div>
      </section>
    </main>
  );
}

export default MyAccount;
