import { useState } from 'react';
import { getUserSession, removeSession } from '../../_utils/localStorage.utils';

export const LogOut = ({ forceUpdate }) => {
  const isLogged = !!getUserSession();
  if (!isLogged) {
    return undefined;
  }

  const doLogout = () => {
    removeSession();
    forceUpdate();
  };

  return <button onClick={doLogout}>Logout</button>;
};
