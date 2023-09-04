/* eslint-disable react/jsx-props-no-spreading */
import React, { FC, ChangeEventHandler } from 'react';
import styles from './Select.module.css';

interface SelectProps {
  helper?: string;
  onChange: ChangeEventHandler<HTMLSelectElement>;
  disabled?: boolean;
  children: React.ReactNode;
  props?: object;
}

const Select: FC<SelectProps> = ({ helper, onChange, disabled, children, props }) => {
  return (
    <>
      <select className={styles.select} onChange={onChange} disabled={disabled} {...props}>
        {children}
      </select>
      {helper && <div className={styles.helper}>{helper}</div>}
    </>
  );
};

export default Select;
