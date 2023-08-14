/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, FC, ChangeEvent } from 'react';
import Form from 'react-bootstrap/Form';

interface InputProps {
  label: string;
  value: string;
  helper?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  props?: unknown;
}

const Input: FC<InputProps> = ({ label, value, helper, onChange, props }) => {
  return useMemo(() => {
    return (
      <>
        <Form.Label htmlFor={label}>{label}</Form.Label>
        <Form.Control id={label} value={value} onChange={onChange} {...props} size="sm" aria-describedby="helper" />
        <Form.Text id="helper" muted>
          {helper}
        </Form.Text>
      </>
    );
  }, [value, helper]);
};

export default Input;
