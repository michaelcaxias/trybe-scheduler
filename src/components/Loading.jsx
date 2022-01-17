import React from 'react';
import '../styles/Loading.scss';
import rocket from '../images/rocket.svg';

export default function Loading() {
  return (
    <section className="loading-section">
      <h1>Carregando...</h1>
      <div className="mars">
        <div className="first-eye" />
        <div className="second-eye" />
      </div>
      <div className="orbit">
        <img
          className="rocket"
          src={ rocket }
          alt="rocket"
        />
      </div>
    </section>
  );
}
