/* eslint-disable react/jsx-one-expression-per-line */
import './App.css';
import Main from './Main/Main';
import Modal from './Modal/Modal';
import { useState } from 'react';

import Login from './Login/Login';
// import Signup from './Signup/Signup';

function App() {
  const [modalActive, setModalActive] = useState(false);

  return (
    <>
      <Main />
      <button onClick={() => setModalActive(true)}>Login</button>
      <button>SignUp</button>
      {modalActive && (
        <Modal active={modalActive} setActive={setModalActive}>
          <Login />
        </Modal>
      )}
    </>
  );
}

export function sum(a: number, b: number) {
  return a + b;
}

export default App;
