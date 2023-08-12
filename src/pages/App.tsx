import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
// import Main from './Main/Main';
// import Modal from './Modal/Modal';
// import Login from './Login/Login';
// import Signup from './Signup/Signup';
import { Pages } from '../types/enums';

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

const App = () => {
  // const [page, setPage] = useState('');
  return (
    <>
      <Link to={Pages.signup}>SignUp</Link>
      <Link to={Pages.login}>Login</Link>
    </>
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
