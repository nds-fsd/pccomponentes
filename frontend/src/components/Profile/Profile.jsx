import { api } from '../../_utils/api';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from './Profile.module.css';

function Profile() {
  const [user, setUser] = useState({});
  const getUserById = (_id) => {
    api
      .get(`/users/${_id}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getUserById('656f72ab1b73f99d51da573d');
  }, []);
  return (
    <section className={styles.profile}>
      <Link to={'/my-account'}>
        <span className='material-symbols-rounded'>arrow_back</span>
      </Link>
      <h3>My Profile</h3>
      <div className={styles.card}>
        <h4 className={styles.cardTitle}>Personal Information</h4>
        <div>
          <p className={styles.username}>{user.username}</p>
          <div className={styles.userInfo}>
            <p>{user.email}</p>
            <p>"Add ID to backend"</p>
          </div>
        </div>
        <button disabled>Edit</button>
      </div>
    </section>
  );
}

export default Profile;
