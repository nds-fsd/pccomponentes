import { getUserSession, removeSession } from '../../_utils/localStorage.utils';
import { useNavigate } from 'react-router-dom';
import SecondaryButton from '../SecondaryButton/SecondaryButton';
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

  return <SecondaryButton btnType='button' onClick={doLogout} value='Logout' />;
};
