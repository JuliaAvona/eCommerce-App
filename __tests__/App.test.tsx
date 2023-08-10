import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import App, { sum } from '../src/pages/App';

test('demo', () => {
  expect(true).toBe(true);
});

test('Renders the main page', () => {
  render(<App />);
  expect(true).toBeTruthy();
});

test('demo', () => {
  expect(sum(1, 2)).toBe(3);
});
