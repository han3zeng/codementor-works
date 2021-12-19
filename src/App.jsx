import React from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './components/Home';
import normalize from './utils/normalize';
import Navigation from './components/Navigation';
import { paths } from './config';

const theme = {
  formGray: '#ccc',
  formHighlightGray: '#333',
  errorRed: 'red',
  fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji',
};

const GlobalStyle = createGlobalStyle`
  ${normalize};
  body {
    background: white;
  }
  button {
    background-color: white;
    outline: none;
    border: 1px solid ${(props) => props.theme.formGray};
    padding: 6px 5px;
    cursor: pointer;
    &:hover {
      box-shadow: 2px 2px 2px gray;
    }
  }

  input {
    box-sizing: border-box;
    border: 1px solid ${(props) => props.theme.formGray};
    padding: 6px 3px;
    outline: none;
    &:focus {
      border: 1px solid ${(props) => props.theme.formHighlightGray};
    }
    &:invalid  {
      border: 1px solid ${(props) => props.theme.errorRed};
    }
  }

  select {
    border: 1px solid ${(props) => props.theme.formGray};
    padding: 6px 3px;
    outline: none;
    &:focus {
      border: 1px solid ${(props) => props.theme.formHighlightGray};
    }
    &:invalid  {
      border: 1px solid ${(props) => props.theme.errorRed};
    }
  }

  a {
    color: black;
    text-decoration: none;
  }

  h2 {
    font-size: 24px;
  }
`;

function App() {
  return (
    <ThemeProvider
      theme={theme}
    >
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            element={<Navigation />}
          >
            <Route
              path="/search"
              element={<div>search</div>}
            />
            <Route
              path="/favorite"
              element={<div>favorite</div>}
            />
          </Route>
        </Routes>
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  );
}

export default App;
