import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Link, Route, Routes} from 'react-router-dom';
import React from 'react';
// import Main from './Main/Main';
// import Modal from './Modal/Modal';
// import Login from './Login/Login';
// import Signup from './Signup/Signup';
import { Pages } from '../types/enums';
import {Badge, Nav} from "react-bootstrap";
import BootstrapButton from "react-bootstrap/Button";
import { Navigation } from "../components/navbar";
import Signup from "./Signup/Signup";
import Login from "./Login/Login";
import Error from "./Error/Error";
import Main from "./Main/Main";

/*
const redirect = (page: string, setPage: React.Dispatch<React.SetStateAction<string>>) => {
  switch (page) {
    case Pages.signup:
      return <Signup />;
    case Pages.login:
      return <Login />;
    default:
      return (
        <>
          <Main />
          <button type="submit" onClick={() => setPage(Pages.signup)}>
            Login
          </button>
          <button type="submit" onClick={() => setPage(Pages.login)}>
            SignUp
          </button>
        </>
      );
  }
};
*/

function Redirect(props: { to: string }) {
    return null;
}

const App = () => {
  // const [page, setPage] = useState('');
    return (
        <Router>
            <Navigation/>
            <Routes>
                <Route path={'/'} element={<Main />} errorElement={<Error/>}/>
                <Route path={Pages.signup} element={<Signup/>} errorElement={<Error/>}/>
                <Route path={Pages.login} element={<Login/>} errorElement={<Error/>}/>
                {/* 404 Redirect */}
                {/*<Route render={() => (<Redirect to={Pages.error} />)} />*/}
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
