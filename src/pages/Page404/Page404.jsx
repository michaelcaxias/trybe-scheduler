import React from 'react';
import { Button } from '@mui/material';
import { images } from '../../constants'

import './Page404.scss';

const Page404 = () => {
  return (
    <section className="loading-section">
    <div id="stars"></div>
    <div id="stars2"></div>
    <div id="stars3"></div>

    <div className="mars">
      <div className="first-eye" />
      <div className="second-eye" />
    </div>
    <div className="orbit">
      <img
        className="rocket"
        src={ images.rocket }
        alt="rocket"
      />
    </div>
    <div className="text">
      <h1>404</h1>
      <h2>Página não encontrada</h2>
    </div>
    <Button 
      variant="contained"
      color="primary"
      href="/"
      style={{ position: 'absolute', bottom: '10%' }}
    >Voltar para Home</Button>
  </section>
  )
}

export default Page404