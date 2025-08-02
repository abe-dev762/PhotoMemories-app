import * as React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';


interface ProtectedRoutesProps {

}

const ProtectedRoutes: React.FunctionComponent<ProtectedRoutesProps> = (props) => {
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const location = useLocation();

  if (loading) {
    return (
      <div>...Loading</div>
    )
  }

  return user ? (<Outlet/>) : (
    <Navigate to="/login" state={{ location }} />
  );

};

export default ProtectedRoutes;