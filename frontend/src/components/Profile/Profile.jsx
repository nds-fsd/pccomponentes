import { api } from '../../_utils/api';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import styles from './Profile.module.css';
import { LogOut } from '../Logout/Logout';
import { useQuery } from 'react-query';

export const Profile = ({ token }) => {
  const [update, setUpdate] = useState(false);
  const [data, setData] = useState([]);

  const forceUpdate = () => {
    setUpdate(!update);
  };

  const getUsers = () => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    return api
      .get('/users', config)
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => console.log(error));
  };

  const { isLoading } = useQuery('users', getUsers);
  if (isLoading) return <div>Loading...</div>;
  return (
    <section className={styles.profile}>
      {data?.length === 0 && <div>User not found</div>}
      {console.log(token)}
      {console.log(data)}
      {data?.map((user) => {
        <div key={user._id}>
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
        </div>;
      })}
    </section>
  );
};

export default Profile;
