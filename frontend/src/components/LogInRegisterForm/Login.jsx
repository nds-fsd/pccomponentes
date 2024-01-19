import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { api } from '../../_utils/api';
import { setUserSession } from '../../_utils/localStorage.utils';
import { Link } from 'react-router-dom';
import styles from './login.module.css';
import PrimaryButton from '../PrimaryButton/PrimaryButton';
import SecondaryButton from '../SecondaryButton/SecondaryButton';

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
    <main className={styles.main}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h2>Log In</h2>
        <br />
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
        <br />
        <input
          className={styles.formInput}
          type='password'
          placeholder='Password'
          {...register('password', { required: 'Password is required.' })}
        />
        {errors.password && <p className={styles.errorMessage}>{errors.password.message}</p>}
        <br />
        <a className={styles.password}>Forgot my password</a>
        <br />
        <div className={styles.buttons}>
          <br />
          <PrimaryButton btnType='submit' value='Log In' />
          <br />
          <p>or</p>
          <br />
          <Link to='/register' className={styles.stretchBtn}>
            <SecondaryButton
              btnType='button'
              value='Create account'
              onClick={() => {
                changeAccountCreated('register');
              }}
            />
          </Link>
        </div>
      </form>
    </main>
  );
};
