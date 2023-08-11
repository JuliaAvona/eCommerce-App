import './App.css';
import { useState } from 'react';
import Main from './Main/Main';
import Modal from './Modal/Modal';
// import Login from './Login/Login';
import Signup from './Signup/Signup';

const App = () => {
  const [modalActive, setModalActive] = useState(true);

  return (
    <>
      <Main />
      <button type="submit" onClick={() => setModalActive(true)}>
        Login
      </button>
      <button type="submit" onClick={() => setModalActive(true)}>
        SignUp
      </button>
      {modalActive && (
        <Modal active={modalActive} setActive={setModalActive}>
          <Signup />
        </Modal>
      )}
    </>
  );
};

export function sum(a: number, b: number) {
  return a + b;
}

export default App;
