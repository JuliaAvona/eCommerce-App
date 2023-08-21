import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import hideLogin from '../../assets/svg/visibility-off.svg';
import showLogin from '../../assets/svg/visibility.svg';
import { logIn } from '../../api/index';
import { isAuthorized } from '../../utils/storage';
import { Pages } from '../../types/enums';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailDirty, setEmailDirty] = useState<boolean>(false);
  const [passwordDirty, setPasswordDirty] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string>('email empty');
  const [passwordError, setPasswordError] = useState<string>('password empty');
  const [formValid, setFormValid] = useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [passwordIcon, setPasswordIcon] = useState<string>(showLogin); // Предположим, что showLogin имеет тип string
  const navigate = useNavigate();

  useEffect((): void => {
    if (emailError || passwordError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [emailError, passwordError]);

  const emailHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
    setEmailDirty(true);

    const containsAtSymbolRegex = /@/ as RegExp;
    const nospaceRegex = /^\s+|\s+$/ as RegExp;
    const containsDomainRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ as RegExp;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ as RegExp;

    switch (true) {
      case !containsAtSymbolRegex.test(e.target.value):
        setEmailError('Email address must contain an "@" symbol separating local part and domain name');
        break;
      case nospaceRegex.test(e.target.value):
        setEmailError('Email address must not contain leading or trailing whitespace');
        break;
      case !containsDomainRegex.test(e.target.value):
        setEmailError('Email address must contain a domain name (e.g., example.com)');
        break;
      case !emailRegex.test(e.target.value):
        setEmailError('Email address must be properly formatted (e.g., user@example.com)');
        break;
      default:
        setEmailError('');
    }
  };

  const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
    setPasswordDirty(true);

    switch (true) {
      case e.target.value.length < 8:
        setPasswordError('Password must be at least 8 characters long');
        break;
      case !/[A-Z]/.test(e.target.value):
        setPasswordError('Password must contain at least one uppercase letter (A-Z)');
        break;
      case !/[a-z]/.test(e.target.value):
        setPasswordError('Password must contain at least one lowercase letter (a-z)');
        break;
      case !/\d/.test(e.target.value):
        setPasswordError('Password must contain at least one digit (0-9)');
        break;
      case /^\s+|\s+$/.test(e.target.value):
        setPasswordError('Password cannot contain spaces');
        break;
      default:
        setPasswordError('');
    }
  };

  const blurHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    switch (e.target.name) {
      case 'email':
        setEmailDirty(true);
        break;
      case 'password':
        setPasswordDirty(true);
        break;
      default:
        setPasswordDirty(false);
    }
  };

  const togglePasswordVisibility = (): void => {
    setPasswordVisible((prevPasswordVisible) => !prevPasswordVisible);
    setPasswordIcon((prevPasswordIcon) => (prevPasswordIcon === showLogin ? hideLogin : showLogin));
  };

  const getAuthorization = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    logIn(email, password).then(() => {
      if (isAuthorized()) {
        navigate('/main');
      } else {
        setPasswordError('Incorrect username or password😬 Please try again');
      }
    });
  };

  if (isAuthorized()) {
    navigate(Pages.main);
  }

  return (
    <div className={styles.loginPage}>
      <div className={styles.form}>
        <h2 className={styles.headline}>Login page</h2>
        <form className={styles.registerForm}>
          <input
            value={email}
            onChange={(e) => emailHandler(e)}
            onBlur={(e) => blurHandler(e)}
            type="text"
            placeholder="email"
            name="email"
          />
          {emailDirty && emailError && <div className={styles.error}>{emailError}</div>}
          <input
            value={password}
            onChange={(e) => passwordHandler(e)}
            type={passwordVisible ? 'text' : 'password'}
            placeholder="password"
            name="password"
            className={styles.passwdWrap}
          />
          <button type="button" className={styles.showPassword} onClick={togglePasswordVisibility}>
            <img className="m-auto" src={passwordIcon} alt={passwordVisible ? 'Hide Password' : 'Show Password'} />
          </button>
          {passwordDirty && passwordError && <div className={styles.error}>{passwordError}</div>}
          <button
            className={`${formValid ? styles.button : styles.disabledButton}`}
            disabled={!formValid}
            type="submit"
            onClick={(e) => getAuthorization(e)}
          >
            login
          </button>
          <p className={styles.message}>
            Not registered? <a href="/signup">Create an account</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
