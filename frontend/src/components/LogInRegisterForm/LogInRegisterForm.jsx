import { useState } from 'react';

export const LogInRegisterForm = () => {
  const [accountCreated, setAccountCreated] = useState(true);

  const changeAccountCreated = (btnType) => {
    if (btnType == 'login') return setAccountCreated(true);
    else if (btnType == 'register') return setAccountCreated(false);
  };

  if (accountCreated) {
    return (
      <>
        <h3>Log In</h3>
        <input type='text' placeholder='Email address'></input> <br />
        <input type='text' placeholder='Password'></input> <br />
        <a href=''>Forgot my password</a> <br />
        <button onClick={() => changeAccountCreated('login')}>Log In</button> <br />
        <p>or</p>
        <button onClick={() => changeAccountCreated('register')}>Create account</button>
      </>
    );
  }

  return (
    <>
      <h3>Create account</h3>
      <input type='text' placeholder='Name'></input> <br />
      <input type='text' placeholder='Email address'></input> <br />
      <input type='text' placeholder='Password'></input> <br />
      <input type='text' placeholder='Repeat password'></input> <br />
      <input type='checkbox'></input>
      <label>I have read and accept the Privacy Policy</label>
      <br />
      <input type='checkbox'></input>
      <label>Receive exclusive discounts, news, and trends by email. You can unsubscribe from “My dashboard”</label>
      <br />
      <button onClick={() => changeAccountCreated('register')}>Create account</button> <br />
      <p>or</p>
      <button onClick={() => changeAccountCreated('login')}>I have an account</button>
    </>
  );
};
