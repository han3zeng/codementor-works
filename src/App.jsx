import React from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './components/Home';
import normalize from './utils/normalize';
import Navigation from './components/Navigation';
import Layout from './components/Layout';
import Search from './features/Search';
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
      border: 1px solid ${(props) => props.theme.formHighlightGray};
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
            element={<Layout />}
          >
            <Route
              index
              element={<Home />}
            />
          </Route>
          <Route
            element={<Navigation />}
          >
            <Route
              path={`${paths.search}`}
              element={<Search />}
            />
            <Route
              path={`${paths.favorite}`}
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
