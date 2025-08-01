import * as React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom';


interface ProtectedRoutesProps {

}

const ProtectedRoutes: React.FunctionComponent<ProtectedRoutesProps> = (props) => {
  const isAuth: boolean = false;
  const location = useLocation();

  return isAuth ? (<Outlet/>) : (
    <Navigate to="/login" state={{ location }} />
  );

};

export default ProtectedRoutes;