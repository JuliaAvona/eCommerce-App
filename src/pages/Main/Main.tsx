import './Main.module.css';
import {Link} from "react-router-dom";
import {Pages} from "../../types/enums";

const Main = () => {
  return (
      <>
        <Link to={Pages.signup}>SignUp</Link>
        <Link to={Pages.login}>Login</Link>
      </>

  );
};

export default Main;
