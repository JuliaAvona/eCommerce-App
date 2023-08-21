import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Input from './Input';

describe('Input component', () => {
  const mockOnChange = jest.fn();

  it('renders without crashing', () => {
    render(<Input value="" onChange={mockOnChange} />);
  });

  it('renders input field with given value', () => {
    const { getByDisplayValue } = render(<Input value="Test Value" onChange={mockOnChange} />);
    expect(getByDisplayValue('Test Value')).toBeInTheDocument();
  });

  it('renders helper text when provided', () => {
    const { getByText } = render(<Input value="" onChange={mockOnChange} helper="Helper Text" />);
    expect(getByText('Helper Text')).toBeInTheDocument();
  });

  it('calls onChange function when input value changes', () => {
    const { getByRole } = render(<Input value="" onChange={mockOnChange} />);
    const input = getByRole('textbox');

    fireEvent.change(input, { target: { value: 'New Value' } });
    expect(mockOnChange).toHaveBeenCalled();
  });
});
