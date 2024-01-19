import { useState } from 'react';
import { api } from '../../_utils/api';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { setUserSession } from '../../_utils/localStorage.utils';

import styles from './register.module.css';

export const Register = ({ forceUpdate, changeAccountCreated }) => {
  const [error, setError] = useState();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({});

  const doRegister = (data) => {
    api.post('auth/register', data).then((response) => {
      if (response?.data.token) {
        setUserSession(response.data);
        forceUpdate();
      }
    });
  };

  const onSubmit = (data) => {
    doRegister(data);
  };

  return (
    <main className={styles.main}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h2>Create account</h2>
        <br />
        <input
          className={styles.formInput}
          type='text'
          placeholder='Name'
          {...register('username', { required: 'Name is required.' })}
        />
        {errors.name && <p className={styles.errorMessage}>{errors.username.message}</p>}
        <br />
        <input
          className={styles.formInput}
          type='email'
          placeholder='Email address'
          {...register('email', {
            required: 'Email is required.',
            pattern: { value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, message: 'Invalid email format.' },
          })}
        />
        {errors.email && <p className={styles.errorMessage}>{errors.email.message}</p>} <br />
        <input
          className={styles.formInput}
          type='password'
          placeholder='Password'
          {...register('password', { required: 'Password is required.' })}
        />
        {errors.password && <p className={styles.errorMessage}>{errors.password.message}</p>}
        <br />
        {/* <input type='password' placeholder='Repeat password' />
          <br /> */}
        <input type='checkbox' {...register('privacy', { required: 'Privacy Policy is required.' })} />
        <label>I have read and accept the Privacy Policy</label>
        {errors.privacy && <p className={styles.errorMessage}>{errors.privacy.message}</p>}
        <br />
        <input type='checkbox' {...register('subscribe')} />
        <label>Receive exclusive discounts, news, and trends by email. You can unsubscribe from “My dashboard”</label>
        <br />
        <input className={styles.formInput} type='submit' value='Create account' />
        <br />
        <p>or</p>
        <br />
        <Link to='/login'>
          <input
            className={styles.formInput}
            type='button'
            onClick={() => {
              changeAccountCreated('login');
            }}
            value='I have an account'
          />
        </Link>
      </form>
    </main>
  );
};
