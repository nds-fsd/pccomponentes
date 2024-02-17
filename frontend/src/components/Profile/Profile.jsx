import styles from './Profile.module.css';
import Avatar from './Avatar';
import { api } from '../../_utils/api';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SecondaryButton from '../SecondaryButton/SecondaryButton';

import { LogOut } from '../Logout/Logout';
import { getUserSession } from '../../_utils/localStorage.utils';

export const Profile = () => {
  const userSession = getUserSession();
  const [user, setUser] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedUser, setEditedUser] = useState(null);

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

  return (
    <main className={styles.profile}>
      <Link to={'/my-account'}>
        <span className='material-symbols-rounded'>arrow_back</span>
      </Link>
      <h3 className={styles.title}>My Profile</h3>
      <div className={styles.card}>
        <div>
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
      </div>

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
