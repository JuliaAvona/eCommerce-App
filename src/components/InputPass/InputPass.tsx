/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, FC, ChangeEvent, useState } from 'react';
import styles from './InputPass.module.css';
import hide from '../../assets/svg/visibility-off.svg';
import show from '../../assets/svg/visibility.svg';

interface InputProps {
  value: string;
  helper?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
const InputPass: FC<InputProps> = ({ value, helper, onChange }) => {
  const [showPassword, setShowPassword] = useState(true);

  const handleToggle = () => {
    setShowPassword(() => !showPassword);
  };

  return useMemo(() => {
    return (
      <div className={styles.container}>
        <input
          type={showPassword ? 'text' : 'password'}
          value={value}
          placeholder="Password"
          onChange={onChange}
          className={styles.input}
        />
        <button className={styles.button} type="button" onClick={handleToggle}>
          <img className={styles.img} src={showPassword ? show : hide} alt={showPassword ? 'Show' : 'Hide'} />
        </button>
        {helper && <div className={styles.helper}>{helper}</div>}
      </div>
    );
  }, [value, helper, showPassword]);
};

export default InputPass;
