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
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h2>Backoffice Log In</h2>
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
        <input
          className={styles.formInput}
          type='password'
          placeholder='Password'
          {...register('password', { required: 'Password is required.' })}
        />
        {errors.password && <p className={styles.errorMessage}>{errors.password.message}</p>}
        <PrimaryButton value='Log In' />
      </form>
    </main>
  );
};

export default BackLogin;
