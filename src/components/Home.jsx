import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useSearch from '../hooks/useSearch';


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
