import styles from './Login.module.css';

const Login: React.FC = () => {
  return (
    <div className={styles.loginPage}>
      <div className={styles.form}>
        <h2 className={styles.headline}>Login page</h2>
        <form className={styles.registerForm}>
          <input type="text" placeholder="email" />
          <input type="password" placeholder="password" />
          <button className={styles.button}>login</button>
          <p className={styles.message}>
            Not registered? <a href="#">Create an account</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
