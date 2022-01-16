import React from 'react';
import '../styles/Loading.scss';
import rocket from '../images/rocket.svg';

export default function Loading() {
  return (
    <section className="loading-section">
      <div className="mars">
        <div className="eyes" />
        <div className="mounth" />
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
