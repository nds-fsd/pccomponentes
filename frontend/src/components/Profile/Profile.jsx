import { api } from '../../_utils/api';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from './Profile.module.css';
import { LogInRegisterForm } from '../LogInRegisterForm/LogInRegisterForm';
import { LogOut } from '../Logout/Logout';

export const Profile = ({ isLogged }) => {
  const [user, setUser] = useState({});
  const [update, setUpdate] = useState(false);

  const forceUpdate = () => {
    setUpdate(!update);
  };

  const getUserById = (_id) => {
    api
      .get(`/users/${_id}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getUserById('659ef9d9949793d9459558d0');
  }, []);

  if (!isLogged) {
    return <LogInRegisterForm forceUpdate={forceUpdate} />;
  }

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
        <LogOut forceUpdate={forceUpdate} />
      </div>
    </section>
  );
};

export default Profile;
