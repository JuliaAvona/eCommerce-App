/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, FC, ChangeEvent } from 'react';
import styles from './Input.module.css';

interface InputProps {
  value: string;
  helper?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  props?: unknown;
}

const Input: FC<InputProps> = ({ value, helper, onChange, props }) => {
  return useMemo(() => {
    return (
      <div className={styles.container}>
        <input type="text" value={value} onChange={onChange} {...props} className={styles.input} />
        {helper && <div className={styles.helper}>{helper}</div>}
      </div>
    );
  }, [value, helper]);
};

export default Input;
