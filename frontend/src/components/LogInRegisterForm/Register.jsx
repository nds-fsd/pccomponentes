import { api } from '../../_utils/api';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { setUserSession } from '../../_utils/localStorage.utils';

import styles from './register.module.css';
import { PrimaryButton, SecondaryButton } from '../Button/Button';
import { useNavigate } from 'react-router-dom';

export const Register = ({ forceUpdate, changeAccountCreated }) => {
  const navigate = useNavigate();
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
    navigate('/');
  };

  const navToLogin = () => {
    navigate('/login');
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
        {errors.username && <p className={styles.errorMessage}>{errors.username.message}</p>}
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
          {...register('password', {
            required: 'Password is required.',
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
              message: 'Password must contain at least one uppercase letter, one lowercase letter and one number.',
            },
            minLength: { value: 8, message: 'Password must be at least 8 characters.' },
          })}
        />
        {errors.password && <p className={styles.errorMessage}>{errors.password.message}</p>}
        <br />
        {/* <input type='password' placeholder='Repeat password' />
          <br /> */}
        <div className={styles.checks}>
          <div className={styles.groupCheck}>
            <input
              className={styles.inputCheck}
              type='checkbox'
              {...register('privacy', {
                required: 'Privacy Policy is required.',
              })}
            />
            <label>
              I have read and accept the{' '}
              <Link to='/privacy-policy' className={styles.privacy}>
                Privacy Policy
              </Link>
              .
            </label>
            <br />
          </div>
          {errors.privacy && <p className={styles.errorMessage}>{errors.privacy.message}</p>}
          <br />
          <div className={styles.groupCheck}>
            <input className={styles.inputCheck} type='checkbox' {...register('newsletter')} />
            <label className={styles.dash}>
              Receive exclusive discounts, news, and trends by email. You can unsubscribe from “My dashboard”.
            </label>
          </div>
        </div>
        <br />
        <div className={styles.buttons}>
          <PrimaryButton value='Create account' />
          <br />
          <p>or</p>
          <br />
          <SecondaryButton
            value='I have an account'
            onClick={() => {
              changeAccountCreated('login');
              navToLogin();
            }}
          />
        </div>
      </form>
    </main>
  );
};
