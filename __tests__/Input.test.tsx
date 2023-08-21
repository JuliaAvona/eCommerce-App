import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import Input from '../src/components/input/Input';
import { Forms } from '../src/types/enums';
import handleFormChange from '../src/pages/Signup/Signup';

describe('Input component', () => {
  test('input value is the title props', async () => {
    render(
      <Input
        label="First Name"
        value="Harry"
        helper="name"
        onChange={(e) => handleFormChange(e, Forms.firstName)}
        props={{ type: 'text' }}
      />
    );
    const input = await screen.findByRole('textbox', { name: 'First Name' });
    await waitFor(() => expect(input).toHaveValue('Harry'));
  });

  it('should render Input component correctly', () => {
    render(
      <Input
        label="First Name"
        value="Harry"
        helper="name"
        onChange={(e) => handleFormChange(e, Forms.firstName)}
        props={{ type: 'text' }}
      />
    );
    const element = screen.getByRole('textbox', {
      name: 'First Name',
    });
    expect(element).toBeInTheDocument();
    expect(true).toBeTruthy();
  });
  //
  // it('should test for presence of subheading in the component', () => {
  //   render(<Register />);
  //   const element = screen.getByRole('heading', {
  //     name: /please enter your details below to register yourself\./i,
  //   });
  //   expect(element).toBeInTheDocument();
  // });
  //
  // it('should show error message when all the fields are not entered', async () => {
  //   render(<Register />);
  //   const buttonElement = screen.getByRole('button', {
  //     name: /register/i,
  //   });
  //   await userEvent.click(buttonElement);
  //   const alertElement = screen.getByRole('alert');
  //   expect(alertElement).toBeInTheDocument();
  // });
  //
  // it('should not show any error message when the component is loaded', () => {
  //   render(<Register />);
  //   const alertElement = screen.queryByRole('alert');
  //   expect(alertElement).not.toBeInTheDocument();
  // });
  //
  // it('should show success message when the registration is successful.', async () => {
  //   render(<Register />);
  //   const buttonElement = screen.getByRole('button', {
  //     name: /register/i,
  //   });
  //   await userEvent.click(buttonElement);
  //   const alertElement = screen.getByRole('alert');
  //   expect(alertElement).toBeInTheDocument();
  // });
});
