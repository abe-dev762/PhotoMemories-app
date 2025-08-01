import * as React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './routes';

interface AppProps {

}

const App: React.FunctionComponent<AppProps> = (props) => {
  return <RouterProvider router={router}/>;
};

export default App;