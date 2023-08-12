import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './pages/App.tsx';
import Error from './pages/Error/Error';
import './index.css';
import Signup from './pages/Signup/Signup';
import { Pages } from './types/enums';
import Login from './pages/Login/Login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
  },
  {
    path: Pages.signup,
    element: <Signup />,
    errorElement: <Error />,
  },
  {
    path: Pages.login,
    element: <Login />,
    errorElement: <Error />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
