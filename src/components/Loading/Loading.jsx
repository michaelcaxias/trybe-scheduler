import React from 'react';
import { images } from '../../constants'

import './Loading.scss';

export default function Loading() {
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
  </section>
  );
}
