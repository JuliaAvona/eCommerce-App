/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, FC, ChangeEvent } from 'react';
import styles from './Checkbox.module.css';

interface CheckboxProps {
  checked: boolean;
  label: string;
  name: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  props?: object;
}

const Checkbox: FC<CheckboxProps> = ({ checked, label, name, onChange, props }) => {
  return useMemo(() => {
    return (
      <div className={styles.container}>
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          {...props}
          className={styles.checkbox}
          name={name}
        />
        {label && (
          <label className={styles.label} htmlFor={name}>
            {label}
          </label>
        )}
      </div>
    );
  }, [checked, label]);
};

export default Checkbox;
