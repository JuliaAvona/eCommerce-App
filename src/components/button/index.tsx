/* eslint-disable react/jsx-props-no-spreading */
import React, { FC } from 'react';
import BootstrapButton from 'react-bootstrap/Button';

interface ButtonProps {
  variant: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  props?: unknown;
  children: React.ReactNode;
}

const Button: FC<ButtonProps> = ({ variant, onClick, props, children }) => {
  return (
    <BootstrapButton variant={variant} onClick={onClick} {...props}>
      {children}
    </BootstrapButton>
  );
};

export default React.memo(Button);
