import { useState } from 'react';
import { Register } from './Register';
import { Login } from './Login';

export const LogInRegisterForm = ({forceUpdate, changeAccountCreated}) => {
  

  if (accountCreated) {
    return <Login forceUpdate={forceUpdate} changeAccountCreated={changeAccountCreated} />;
  }

  return <Register forceUpdate={forceUpdate} changeAccountCreated={changeAccountCreated} />;
};
