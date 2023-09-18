/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, FC, ChangeEvent } from 'react';
import styles from './Input.module.css';

interface InputProps {
  value: string;
  helper?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  props?: object;
}

const Input: FC<InputProps> = ({ value, helper, onChange, disabled, props }) => {
  return useMemo(() => {
    return (
      <div className={styles.container}>
        <input type="text" value={value} onChange={onChange} disabled={disabled} {...props} className={styles.input} />
        {helper && <div className={styles.helper}>{helper}</div>}
      </div>
    );
  }, [value, helper, disabled]);
};

export default Input;
