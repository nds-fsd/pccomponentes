import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { api } from '../../_utils/api';
import { setUserSession } from '../../_utils/localStorage.utils';

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>Create account</h3>
      <input type='text' placeholder='Name' {...register('username', { required: 'Name is required.' })} />
      <br />
      {errors.name && <p>{errors.name.message}</p>}
      <br />
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
      {/* <input type='password' placeholder='Repeat password' />
      <br /> */}
      <input type='checkbox' {...register('privacy', { required: 'Privacy Policy is required.' })} />
      <label>I have read and accept the Privacy Policy</label>
      {errors.privacy && <p>{errors.privacy.message}</p>}
      <br />
      <input type='checkbox' {...register('subscribe')} />
      <label>Receive exclusive discounts, news, and trends by email. You can unsubscribe from “My dashboard”</label>
      <br />
      <br />
      <input type='submit' value='Create account' />
      <br />
      <p>or</p>
      <input
        type='button'
        onClick={() => {
          changeAccountCreated('login');
        }}
        value='I have an account'
      />
    </form>
  );
};
