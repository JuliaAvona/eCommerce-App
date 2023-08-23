import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.scss';
import { login } from '../../api/index';
import { emailValidation, passwordValidation } from '../../utils/validator';
import Input from '../../components/input/Input';
import InputPass from '../../components/inputPass/InputPass';
import Button from '../../components/button/Button';
import { Pages } from '../../types/enums';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [formValid, setFormValid] = useState<boolean>(false);
  const [onLoad, setOnLoad] = useState<boolean>(false);
  const [responseError, setResponseError] = useState<string>('');
  const navigate = useNavigate();
  useEffect((): void => {
    if (emailError || passwordError) setFormValid(false);
    else if (email && password) setFormValid(true);
  }, [emailError, passwordError, email, password]);

  const emailHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
    const validationResult = emailValidation(e.target.value);
    if (validationResult !== e.target.value) setEmailError(validationResult);
    else setEmailError('');
  };

  const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
    const validationResult = passwordValidation(e.target.value);
    if (validationResult !== e.target.value) setPasswordError(validationResult);
    else setPasswordError('');
  };

  const getAuthorization = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setOnLoad(true);
    login(email, password)
      .then(() => navigate(Pages.main))
      .catch((error) => {
        setResponseError(error);
        setOnLoad(false);
      });
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.form}>
        <h2 className={styles.headline}>Login page</h2>
        <form>
          <Input
            value={email}
            helper={emailError}
            onChange={(e) => emailHandler(e)}
            props={{ placeholder: 'EMail', name: 'email' }}
          />

          <InputPass value={password} helper={passwordError} onChange={(e) => passwordHandler(e)} />

          <h3 className={styles.headline3}>{responseError}</h3>
          <Button disabled={!formValid || onLoad} props={{ type: 'submit' }} onClick={(e) => getAuthorization(e)}>
            login
          </Button>

          <p className={styles.formMessage}>
            Not registered? <Link to="/signup">Create an account</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
