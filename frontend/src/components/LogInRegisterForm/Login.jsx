import { useForm } from 'react-hook-form';
import { api } from '../../_utils/api';
import { setUserSession } from '../../_utils/localStorage.utils';
import { useNavigate } from 'react-router-dom';
import styles from './login.module.css';
import { PrimaryButton, SecondaryButton } from '../Button/Button';

export const Login = ({ forceUpdate, changeAccountCreated }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const doLogin = async (data) => {
    try {
      const response = await api.post('auth/login', data);

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
    doLogin(data);
  };

  const navToRegister = () => {
    navigate('/register');
  };

  return (
    <main className={styles.main}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h2>Log In</h2>
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
        <a className={styles.password}>Forgot my password</a>
        <div className={styles.buttons}>
          <PrimaryButton value='Log In' />
          <p>or</p>
          <SecondaryButton
            value='Create account'
            onClick={() => {
              changeAccountCreated('register');
              navToRegister();
            }}
          />
        </div>
      </form>
    </main>
  );
};
