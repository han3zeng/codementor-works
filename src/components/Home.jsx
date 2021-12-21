import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      <h1>Codementor Demo</h1>
      <p>This is project for Codementor interview process.</p>
      <ul>
        <li><Link to="/search">Agolia Search</Link></li>
      </ul>
    </>
  );
}

export default Home;
