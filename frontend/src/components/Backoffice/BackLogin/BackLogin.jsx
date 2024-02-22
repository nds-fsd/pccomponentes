import React from 'react';
import { useForm } from 'react-hook-form';
import { api } from '../../../_utils/api';
import { setUserSession } from '../../../_utils/localStorage.utils';
import { useNavigate } from 'react-router-dom';
import styles from './backLogin.module.css';
import { PrimaryButton } from '../../Button/Button';

const BackLogin = ({ forceUpdate }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const doBackLogin = async (data) => {
    try {
      const response = await api.post('auth/back-login', data);

      if (response?.data.token) {
        setUserSession(response.data);
        forceUpdate();

        await navigateUser(response.data.user.role);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const navigateUser = async (role) => {
    if (role === 'admin') {
      navigate('/backoffice');
    } else {
      navigate('/');
    }
  };

  const onSubmit = (data) => {
    doBackLogin(data);
  };

  return (
    <main className={styles.main}>
      <div className={styles.leftPanel}>
        <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
          <div>
            <h2>Log In</h2>
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
            <input
              className={styles.formInput}
              type='password'
              placeholder='Password'
              {...register('password', { required: 'Password is required.' })}
            />
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
    </main>
  );
};

export default BackLogin;
