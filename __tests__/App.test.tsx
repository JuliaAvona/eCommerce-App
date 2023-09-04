import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../src/pages/App';
import Input from '../src/components/input/Input';

test('Renders the main page 2', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  expect(true).toBeTruthy();
});

test('Renders the main page 3', () => {
  render(<Input value="test" onChange={() => console.log('test')} />);
  expect(true).toBeTruthy();
});
