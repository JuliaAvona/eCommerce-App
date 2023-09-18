/* eslint-disable react/jsx-props-no-spreading */
import React, { FC, ChangeEventHandler } from 'react';
import styles from './Select.module.css';

interface SelectProps {
  helper?: string;
  value?: string;
  onChange: ChangeEventHandler<HTMLSelectElement>;
  disabled?: boolean;
  children: React.ReactNode;
  props?: object;
}

const Select: FC<SelectProps> = ({ helper, value, onChange, disabled, children, props }) => {
  return (
    <>
      <select className={styles.select} value={value} onChange={onChange} disabled={disabled} {...props}>
        {children}
      </select>
      {helper && <div className={styles.helper}>{helper}</div>}
    </>
  );
};

export default Select;
