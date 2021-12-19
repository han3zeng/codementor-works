import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      <h1>React Starter</h1>
      <p>This is project for Codementor</p>
      <ul>
        <li><Link to="/search">Agolia Search</Link></li>
      </ul>
    </>
  );
}

export default Home;
