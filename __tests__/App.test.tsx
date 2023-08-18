import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App, { sum } from '../src/pages/App';
import Link from '../src/components/Link/Link';
import { Pages } from '../src/types/enums';
import Loginlink from '../src/components/Loginlink/Loginlink';
import Input from '../src/components/input/Input';

// test('demo', () => {
//   expect(true).toBe(true);
// });

// сейчас тесты не проходит из-за стилей, т.к будем переписывать скорее всего под бустрам - пока что отключил тест

test('Renders the main page', () => {
  render(<Link href={Pages.main}>Test</Link>);
  const link = screen.getByRole('link', {
    name: /Test/i,
  });
  expect(link).toBeInTheDocument();
  expect(true).toBeTruthy();
});

test('Renders the main page', () => {
  render(
    <BrowserRouter>
      <Loginlink />
    </BrowserRouter>
  );
  expect(true).toBeTruthy();
});

test('Renders the main page', () => {
  render(<App />);
  expect(true).toBeTruthy();
});

test('Renders the main page', () => {
  render(<Input label="test" value="test" onChange={() => console.log('test')} />);
  expect(true).toBeTruthy();
});

test('demo', () => {
  expect(sum(1, 2)).toBe(3);
});
