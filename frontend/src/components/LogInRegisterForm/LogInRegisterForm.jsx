import { useState } from 'react';
import { Register } from './Register';
import { Login } from './Login';

export const LogInRegisterForm = ({forceUpdate}) => {
  const [accountCreated, setAccountCreated] = useState(true);
  

  const changeAccountCreated = (btnType) => {
    if (btnType == 'login') return setAccountCreated(true);
    else if (btnType == 'register') return setAccountCreated(false);
  };

  if (accountCreated) {
    return <Login forceUpdate={forceUpdate} changeAccountCreated={changeAccountCreated} />;
  }

  return <Register forceUpdate={forceUpdate} changeAccountCreated={changeAccountCreated} />;
};
