import { doSignOut } from '../../../services/firebase/auth/auth';
import { logout } from '../../../reducer/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function useLogout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutUser = async () => {
    try {
      await doSignOut();
      dispatch(logout());
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
  return { logoutUser };
}

export default useLogout;
