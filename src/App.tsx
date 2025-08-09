import * as React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './routes/routes';
import { UserAuthProvider } from './context/UserAuthContext';
import { UserProfileProvider } from './context/UserProfileContext';


interface AppProps {

}

const App: React.FunctionComponent<AppProps> = (props) => {
  return (
    <UserAuthProvider>
      <UserProfileProvider>
       <RouterProvider router={router}/>
      </UserProfileProvider>
    </UserAuthProvider>
  );
};

export default App;