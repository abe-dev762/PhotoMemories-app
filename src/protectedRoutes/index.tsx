import * as React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';
import CircularProgress from '@mui/material/CircularProgress';



interface ProtectedRoutesProps {

}

const ProtectedRoutes: React.FunctionComponent<ProtectedRoutesProps> = (props) => {
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const location = useLocation();

  if (loading) {
    return (
      <div className='container mx-auto h-screen'>
        <div className='flex flex-col justify-center items-center mt-[20vh]'>
        <CircularProgress className='w-2xs md:w-2xl'/>
        <div className='text-lg'>Loading</div>
        </div>
      </div>
    )
  }

  return user ? (<Outlet/>) : (
    <Navigate to="/login" state={{ location }} />
  );

};

export default ProtectedRoutes;