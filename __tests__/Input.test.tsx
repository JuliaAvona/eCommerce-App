import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import Input from '../src/components/input/Input';
import { Forms } from '../src/types/enums';
import handleFormChange from '../src/pages/Signup/Signup';

describe('Input component', () => {
  test('input value is the title props', async () => {
    render(
      <Input
        value="Harry"
        helper="name"
        onChange={(e) => handleFormChange(e, Forms.firstName)}
        props={{ placeholder: 'First Name', name: 'firstname' }}
      />
    );
    const input = await screen.findByRole('textbox', { name: 'firstname' });
    await waitFor(() => expect(input).toHaveValue('Harry'));
  });

  it('should render Input component correctly', () => {
    render(
      <Input
        value="Harry"
        helper="name"
        onChange={(e) => handleFormChange(e, Forms.firstName)}
        props={{ placeholder: 'First Name', name: 'firstname' }}
      />
    );
    const element = screen.getByRole('textbox', {
      name: 'firstname',
    });
    expect(element).toBeInTheDocument();
    expect(true).toBeTruthy();
  });

  it('should not show any error message when the component is loaded', () => {
    render(
      <Input
        value="Harry"
        helper="name"
        onChange={(e) => handleFormChange(e, Forms.firstName)}
        props={{ placeholder: 'First Name', name: 'firstname' }}
      />
    );
    const alertElement = screen.queryByRole('alert');
    expect(alertElement).not.toBeInTheDocument();
  });
});
