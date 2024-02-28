import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { api } from '../../../_utils/api';
import { setUserSession } from '../../../_utils/localStorage.utils';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './backLogin.module.css';
import { PrimaryButton } from '../../Button/Button';
import logobacklogin from '../../../assets/logobacklogin.svg';

const BackLogin = ({}) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});
  const [password, setPassword] = useState('');
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState('visibility_off');

  useEffect(() => {
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;

    if (user && user.role === 'admin') {
      navigate('/backoffice');
    }
  }, []);

  const doBackofficeLogin = async (data) => {
    try {
      const response = await api.post('auth/login', data);

      if (response?.data.token) {
        setUserSession(response.data);

        navigateUser(response.data.user.role);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const navigateUser = async (role) => {
    if (role === 'admin') {
      navigate('/backoffice');
    } else {
      navigate('/backofficeLogin');
    }
  };

  const handleToggle = () => {
    if (type === 'password') {
      setIcon('visibility');
      setType('text');
    } else {
      setIcon('visibility_off');
      setType('password');
    }
  };

  const onSubmit = (data) => {
    doBackofficeLogin(data);
  };

  return (
    <main>
      <div className={styles.main}>
        <div className={styles.leftPanel}>
          <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
            <div>
              <h2>Backoffice Log In</h2>
            </div>
            <div>
              <input
                className={styles.formInput}
                type='text'
                placeholder='Email address'
                {...register('email', {
                  required: 'Email is required.',
                  pattern: { value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, message: 'Invalid email format.' },
                })}
              />
              {errors.email && <p className={styles.errorMessage}>{errors.email.message}</p>}
            </div>
            <div>
              <div className='mb-4 flex'>
                <input
                  className={styles.formInput}
                  type={type}
                  placeholder='Password'
                  {...register('password', { required: 'Password is required.' })}
                />
                <span onClick={handleToggle}>
                  <span className={`material-symbols-rounded ${styles.eyeIcon}`}>{icon}</span>
                </span>
              </div>
            </div>
            {errors.password && <p className={styles.errorMessage}>{errors.password.message}</p>}
            <div>
              <a className={styles.password}>Forgot my password</a>
            </div>
            <div>
              <PrimaryButton value='Log In' />
            </div>
          </form>
        </div>
        <div className={styles.rightPanel}>
          <div className={styles.logo}>
            <img src={logobacklogin} alt='computech logo' />
          </div>
        </div>
      </div>
    </main>
  );
};

export default BackLogin;
