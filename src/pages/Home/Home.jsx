import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Home</h1>
      <button type="button" onClick={ () => navigate('/scheduler') }>Fazer Login</button>
    </div>
  );
};

export default Home;
