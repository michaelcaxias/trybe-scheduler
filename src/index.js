import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from './context/Provider';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';
const { REACT_APP_CLIENT_ID } = process.env;

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <GoogleOAuthProvider clientId={REACT_APP_CLIENT_ID}>
    <Provider>
      <App />
    </Provider>
  </GoogleOAuthProvider>
);
