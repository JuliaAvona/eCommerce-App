import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import Login from '../src/pages/Login/Login';
import button from '../src/components/button/Button';

test('Renders the Login page', () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );
  const input = screen.getByPlaceholderText('Password');
  expect(input).toBeInTheDocument();
  expect(true).toBeTruthy();
});

test('Login page has email input', () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );
  const input = screen.getByPlaceholderText('EMail');
  expect(input).toBeInTheDocument();
  expect(true).toBeTruthy();
});

test('Login input is input', async () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );
  const input = screen.getByPlaceholderText('Password');
  expect(input.tagName).not.toBe(button);
});
