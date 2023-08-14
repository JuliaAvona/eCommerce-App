import { useEffect, useState } from 'react';
import styles from './Login.module.css';
import hideLogin from '../../assets/svg/visibility_off.svg';
import showLogin from '../../assets/svg/visibility.svg';
import { logIn } from '../../api/index';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [emailError, setEmailError] = useState('email empty');
  const [passwordError, setPasswordError] = useState('password empty');
  const [formValid, setFormValid] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordIcon, setPasswordIcon] = useState(showLogin);

  useEffect(() => {
    if (emailError || passwordError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [emailError, passwordError]);

  const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailDirty(true);

    const containsAtSymbolRegex = /@/;
    const nospaceRegex = /^\s+|\s+$/;
    const containsDomainRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

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

  const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordDirty(true);

    switch (true) {
      case e.target.value.length < 8:
        setPasswordError('Password must be at least 8 characters long');
        break;
      // case !/[A-Z]/.test(e.target.value):
      //   setPasswordError('Password must contain at least one uppercase letter (A-Z)');
      //   break;
      case !/[a-z]/.test(e.target.value):
        setPasswordError('Password must contain at least one lowercase letter (a-z)');
        break;
      case !/\d/.test(e.target.value):
        setPasswordError('Password must contain at least one digit (0-9)');
        break;
      // case !/[!@#$%^&*]/.test(e.target.value):
      //   setPasswordError('Password must contain at least one special character (!@#$%^&*)');
      //   break;
      case /^\s+|\s+$/.test(e.target.value):
        setPasswordError('Password cannot contain spaces');
        break;
      default:
        setPasswordError('');
    }
  };

  const blurHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevPasswordVisible) => !prevPasswordVisible);
    setPasswordIcon((prevPasswordIcon) => (prevPasswordIcon === showLogin ? hideLogin : showLogin));
  };

  function getAuthorization(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    logIn(email, password);
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
