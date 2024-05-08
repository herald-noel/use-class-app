import { observer } from "mobx-react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import AuthLoginViewModel from "../../viewModels/AuthLoginViewModel";

const PrivateUserRoutes = observer(() => {
  const isAuthenticated = AuthLoginViewModel.user !== null;
  return isAuthenticated ? <Outlet /> : <Navigate to='/' replace />;
});

export default PrivateUserRoutes;
