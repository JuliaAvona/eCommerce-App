/* eslint-disable react/jsx-props-no-spreading */
import React, { FC, ChangeEventHandler } from 'react';
import styles from './Select.module.css';

interface SelectProps {
  helper?: string;
  onChange: ChangeEventHandler<HTMLSelectElement>;
  children: React.ReactNode;
  props?: object;
}

const Select: FC<SelectProps> = ({ helper, onChange, children, props }) => {
  return (
    <>
      <select onChange={onChange} {...props} className={styles.select}>
        {children}
      </select>
      {helper && <div className={styles.helper}>{helper}</div>}
    </>
  );
};

export default React.memo(Select);
