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
    getUserById('657b2c90d12c0ca283de5839');
  }, []);
  return (
    <section className={styles.profile}>
      <Link to={'/my-account'}>
        <span className='material-symbols-rounded'>arrow_back</span>
      </Link>
      <h3 className={styles.title}>My Profile</h3>
      <div className={styles.card}>
        <h4 className={styles.cardTitle}>Personal Information</h4>
        <div>
          <p className={styles.username}>{user?.username}</p>
          <div className={styles.userInfo}>
            <p>{user?.email}</p>
            <p>{user?.phoneNumber}</p>
            <p>{user.direction?.street}</p>
            <p>{user.direction?.postalCode}</p>
            <p>{user.direction?.country}</p>
          </div>
        </div>
        <button disabled>Edit</button>
      </div>
    </section>
  );
}

export default Profile;
