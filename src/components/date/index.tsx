import React, { FC, ChangeEvent } from 'react';

interface InputProps {
  label: string;
  value: string;
  helper?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Date: FC<InputProps> = ({ label, value, helper, onChange }) => {
  return (
    <>
      <label className="form-label" htmlFor="Last Name">
        {label}
      </label>
      <input
        className="form-control form-control-sm"
        type="date"
        onChange={onChange}
        max="2009-01-01"
        min="1900-01-01"
        value={value}
      />
      <small className="form-text text-muted">{helper}</small>
    </>
  );
};

export default React.memo(Date);
