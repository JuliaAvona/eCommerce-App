import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import React, { FC } from 'react';
import { Pages } from '../types/enums';
import NavigationBar from '../components/navbar/NavigationBar';
import Signup from './Signup/Signup';
import Login from './Login/Login';
import Error from './Error/Error';
import Main from './Main/Main';
import { isAuth } from '../utils/storage';
import { getProductsForAnonym } from '../api/index';

interface PrivateRouteProps {
  element: JSX.Element;
  authPath: string;
}

const PrivateRoute: FC<PrivateRouteProps> = ({ element, authPath }) => {
  const isAuthenticated = isAuth();
  if (!!authPath && isAuthenticated) return <Navigate to={authPath} />;
  if (!!authPath && !isAuthenticated) return element;
  return element;
};

if (!isAuth()) {
  getProductsForAnonym();
}

const App = () => {
  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path={Pages.main} element={<Main />} errorElement={<Error />} />
        <Route
          path={Pages.signup}
          element={<PrivateRoute element={<Signup />} authPath={Pages.main} />}
          errorElement={<Error />}
        />
        <Route
          path={Pages.login}
          element={<PrivateRoute element={<Login />} authPath={Pages.main} />}
          errorElement={<Error />}
        />
        <Route path={Pages.default} element={<Main />} errorElement={<Error />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
};

export default App;
