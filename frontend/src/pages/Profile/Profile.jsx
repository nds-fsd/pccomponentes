import styles from './Profile.module.css';
import Avatar from '../../components/Avatar/Avatar';
import { api } from '../../_utils/api';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { SecondaryButton } from '../../components/Button/Button';
import AddressCard from '../../components/AddressCard/AddressCard';
import { LogOut } from '../../components/Logout/Logout';
import { getUserSession } from '../../_utils/localStorage.utils';
import { Tabs } from 'antd';

export const Profile = () => {
  const userSession = getUserSession();
  const [user, setUser] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedUser, setEditedUser] = useState(null);
  const [userAddresses, setUserAddresses] = useState([]);

  const getUserAddresses = (userId) => {
    api
      .get(`/addresses?userId=${userId}`)
      .then((res) => {
        setUserAddresses(res.data);
      })
      .catch((error) => console.log(error));
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
    getUserById(userSession.id);
    getUserAddresses(userSession.id);
  }, []);

  const openModal = () => {
    setEditedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e, field) => {
    setEditedUser((prevUser) => ({
      ...prevUser,
      [field]: e.target.value,
    }));
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    const { username, email } = editedUser;

    const updatedUserData = {
      username,
      email,
    };

    api
      .patch(`/users/${userSession.id}`, updatedUserData)
      .then((res) => {
        setUser(res.data);
        closeModal();
      })
      .catch((error) => console.log(error));
  };

  const onChange = (key) => {
    // console.log(key);
  };

  const items = [
    {
      key: '1',
      label: 'Personal Information',
      children: (
        <div className={styles.card}>
          <div className={styles.userData}>
            <h4 className={styles.cardTitle}>Personal Information</h4>
            <Avatar username={user?.username} />
          </div>
          <p className={styles.username}>{user?.username}</p>
          <div className={styles.userInfo}>
            <p>{user?.email}</p>
          </div>
          <SecondaryButton onClick={openModal} value='Edit' leftIcon='edit' />
          <LogOut />
        </div>
      ),
    },
    {
      key: '2',
      label: 'Addresses',
      children: (
        <div className={styles.addressesCards}>
          {userAddresses.map((address) => (
            <AddressCard key={address._id} address={address} />
          ))}
        </div>
      ),
    },
  ];

  return (
    <main className={styles.profile}>
      <Link to={'/my-account'}>
        <span className='material-symbols-rounded'>arrow_back</span>
      </Link>
      <h3 className={styles.title}>My Profile</h3>
      <Tabs defaultActiveKey='1' items={items} onChange={onChange} className={styles.tabStyle} />
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalCard}>
            <form onSubmit={handleSaveChanges}>
              <label>
                Username:
                <input type='text' value={editedUser.username} onChange={(e) => handleInputChange(e, 'username')} />
              </label>
              <label>
                Email:
                <input type='text' value={editedUser.email} onChange={(e) => handleInputChange(e, 'email')} />
              </label>
              <SecondaryButton value='Save Changes' />
            </form>
            <SecondaryButton onClick={closeModal} value='Close' />
          </div>
        </div>
      )}
    </main>
  );
};

export default Profile;
