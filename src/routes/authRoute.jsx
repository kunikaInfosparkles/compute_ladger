import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = () => {
  const check = Cookies.get("__er_urAccess");
  return check ? <Outlet /> : <Navigate to="/login" />;
};
export const JudgeRoute = () => {
  const check = localStorage.getItem('judgeToken');
  return check ? <Outlet /> : <Navigate to="/judgelogin" />;
};

export const PublicRoute = () => {
  const check = true
  return check ? <Outlet /> : <Navigate to="/" />;
};


