import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import Routes from './Routes';
import { Provider } from './context/Provider';

ReactDOM.render(
  <React.StrictMode>
    <Provider>
      <Routes />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
