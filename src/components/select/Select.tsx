/* eslint-disable react/jsx-props-no-spreading */
import React, { FC, ChangeEventHandler } from 'react';
import Form from 'react-bootstrap/Form';

interface SelectProps {
  label: string;
  onChange: ChangeEventHandler<HTMLSelectElement>;
  children: React.ReactNode;
  props?: object;
}

const Select: FC<SelectProps> = ({ label, onChange, children, props }) => {
  return (
    <Form.Select aria-label={label} onChange={onChange} {...props}>
      {children}
    </Form.Select>
  );
};

export default React.memo(Select);
