import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './app/App';
import Board from './board/Board';
// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    {/* <App /> */}
    <Board />
  </React.StrictMode>
);