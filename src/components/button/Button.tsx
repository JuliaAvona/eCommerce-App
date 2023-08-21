/* eslint-disable react/jsx-props-no-spreading */
import React, { FC } from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  disabled?: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  props?: unknown;
  children: React.ReactNode;
}

const Button: FC<ButtonProps> = ({ disabled, onClick, props, children }) => {
  return (
    <button
      className={disabled ? styles.buttonDisabled : styles.button}
      disabled={disabled}
      type="button"
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default React.memo(Button);
