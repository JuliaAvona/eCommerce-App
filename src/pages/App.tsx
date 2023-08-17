import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import { Pages } from '../types/enums';
import Navigation from '../components/navbar/Navbar';
import Signup from './Signup/Signup';
import Login from './Login/Login';
import Error from './Error/Error';
import Main from './Main/Main';
import { isAuthorized } from '../utils/storage';

/*
const redirect = (page: string, setPage: React.Dispatch<React.SetStateAction<string>>) => {
  switch (page) {
    case Pages.signup:
      return <Signup />;
    case Pages.login:
      return <Loginlink />;
    default:
      return (
        <>
          <Main />
          <button type="submit" onClick={() => setPage(Pages.signup)}>
            Loginlink
          </button>
          <button type="submit" onClick={() => setPage(Pages.login)}>
            SignUp
          </button>
        </>
      );
  }
};
*/
//
// const Redirect = (props: { to: string }) => {
//   return null;
// };

const App = () => {
  // const [page, setPage] = useState('');
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path={Pages.main} element={<Main />} errorElement={<Error />} />
        <Route path={Pages.signup} element={<Signup />} errorElement={<Error />} />
        <Route path={Pages.login} element={isAuthorized() ? <Main /> : <Login />} errorElement={<Error />} />
        <Route path={Pages.default} element={<Main />} errorElement={<Error />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
  // redirect(page, setPage);
  /* 
  modalActive && (
    <Modal active={modalActive} setActive={setModalActive}>
      <Signup />
    </Modal>
  ) 
  */
};

export function sum(a: number, b: number) {
  return a + b;
}

export default App;
