import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from './context/Provider';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider>
      <App />
    </Provider>
  </React.StrictMode>
);
