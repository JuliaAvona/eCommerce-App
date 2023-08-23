/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, FC, ChangeEvent } from 'react';
import styles from './Checkbox.module.css';

interface CheckboxProps {
  checked: boolean;
  label: string;
  name: string;
  disabled?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  props?: object;
}

const Checkbox: FC<CheckboxProps> = ({ checked, label, name, disabled, onChange, props }) => {
  return useMemo(() => {
    return (
      <div className={styles.container}>
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          {...props}
          className={styles.checkbox}
          id={name}
          disabled={disabled}
        />
        {label && (
          <label className={styles.label} htmlFor={name}>
            {label}
          </label>
        )}
      </div>
    );
  }, [checked, label, disabled]);
};

export default Checkbox;
