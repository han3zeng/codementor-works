import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import '@babel/polyfill';
import App from './App';

const renderPage = () => {
  ReactDOM.render(
    <StrictMode>
      <App />
    </StrictMode>,
    document.getElementById('root')
  );
};

renderPage();

if (module.hot || process.env.NODE_ENV !== 'production') {
  module.hot.accept('./App.jsx', renderPage);
}
