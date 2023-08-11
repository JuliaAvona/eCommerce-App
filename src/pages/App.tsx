/* eslint-disable react/jsx-one-expression-per-line */
import { BrowserRouter } from 'react-router-dom';
import './App.css';

function App() {

  return (
    <>
      <BrowserRouter>
        <h1>Main page 🏠</h1>
      </BrowserRouter>
    </>
  );
}

export function sum(a: number, b: number) {
  return a + b;
}

export default App;
