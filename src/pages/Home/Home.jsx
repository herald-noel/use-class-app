import { useNavigate } from 'react-router-dom';
import { doSignOut } from '../../services/firebase/auth';
import { useDispatch } from 'react-redux';
import { logout } from '../../reducer/user/userSlice';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <>
      <div>Home</div>
      <button
        onClick={() =>
          doSignOut().then(() => {
            dispatch(logout());
            navigate('/');
          })
        }
      >
        Sign out
      </button>
    </>
  );
};

export default Home;
