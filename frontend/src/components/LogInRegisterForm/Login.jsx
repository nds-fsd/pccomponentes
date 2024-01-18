import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { api } from '../../_utils/api';
import { setUserSession } from '../../_utils/localStorage.utils';
import { Link } from 'react-router-dom';
import styles from './login.module.css';

export const Login = ({ forceUpdate, changeAccountCreated }) => {
  const [error, setError] = useState();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({});

  const doLogin = (data) => {
    api
      .post('auth/login', data)
      .then((response) => {
        if (response?.data.token) {
          setUserSession(response.data);
          forceUpdate();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onSubmit = (data) => {
    doLogin(data);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h3>Log In</h3>
      <input
        type='text'
        placeholder='Email address'
        {...register('email', {
          required: 'Email is required.',
          pattern: { value: /^\S+@\S+$/i, message: 'Invalid email format.' },
        })}
      />
      <br />
      {errors.email && <p>{errors.email.message}</p>} <br />
      <input type='password' placeholder='Password' {...register('password', { required: 'Password is required.' })} />
      <br />
      {errors.password && <p>{errors.password.message}</p>}
      <br />
      <input type='submit' value='Log In' />
      <br />
      <p>or</p>
      <Link to='/register'>
        <input
          type='button'
          onClick={() => {
            changeAccountCreated('register');
          }}
          value='Create account'
        />
      </Link>
    </form>
  );
};
