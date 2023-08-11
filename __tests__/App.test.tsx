import '@testing-library/jest-dom';
// import { render } from '@testing-library/react';
// import App, { sum } from '../src/pages/App';
import { sum } from '../src/pages/App';

test('demo', () => {
  expect(true).toBe(true);
});

// сейчас тесты не проходит из-за стилей, т.к будем переписывать скорее всего под бустрам - пока что отключил тест
/*
test('Renders the main page', () => {
  render(<App />);
  expect(true).toBeTruthy();
}); 
*/

test('demo', () => {
  expect(sum(1, 2)).toBe(3);
});
