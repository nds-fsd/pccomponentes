import { getUserSession, removeSession } from '../../_utils/localStorage.utils';
import { useNavigate } from 'react-router-dom';
export const LogOut = ({}) => {
  const navigate = useNavigate();
  const isLogged = !!getUserSession();
  if (!isLogged) {
    return undefined;
  }

  const doLogout = () => {
    removeSession();
    navigate('/');
  };

  return <button onClick={doLogout}>Logout</button>;
};
