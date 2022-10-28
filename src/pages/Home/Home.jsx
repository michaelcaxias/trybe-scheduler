import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppWrap, MotionWrap } from '../../wrapper';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="app__home">
      <h1>Home</h1>
      <button type="button" onClick={ () => navigate('/scheduler') }>Fazer Login</button>
    </div>
  );
};

export default AppWrap(MotionWrap(Home, ''), Header, Footer, 'Home', '');
