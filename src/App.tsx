import * as React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './routes';
import { UserAuthProvider } from './context/UserAuthContext';

interface AppProps {

}

const App: React.FunctionComponent<AppProps> = (props) => {
  return (
    <UserAuthProvider>
      <RouterProvider router={router}/>
    </UserAuthProvider>
  );
};

export default App;