import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import { Pages } from '../types/enums';
import NavigationBar from '../components/navbar/NavigationBar';
import Signup from './Signup/Signup';
import Login from './Login/Login';
import Error from './Error/Error';
import Main from './Main/Main';

const App = () => {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path={Pages.main} element={<Main />} errorElement={<Error />} />
        <Route path={Pages.signup} element={<Signup />} errorElement={<Error />} />
        <Route path={Pages.login} element={<Login />} errorElement={<Error />} />
        <Route path={Pages.default} element={<Main />} errorElement={<Error />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
};

export default App;
