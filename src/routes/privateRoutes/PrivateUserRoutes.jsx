import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateUserRoutes = () => {
  const role = localStorage.getItem('role');
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  return isAuthenticated === true ? <Outlet /> : <Navigate to='/' replace />;
};

export default PrivateUserRoutes;
