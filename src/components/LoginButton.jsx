import React, { useContext } from 'react';
import { Button } from '@material-ui/core';
import { FcGoogle } from 'react-icons/fc';
import { MyContext } from '../context/Provider';
import '../styles/loginButton.scss';

const { gapi } = window;

export default function LoginButton() {
  const { isSignedIn } = useContext(MyContext);

  const handleAuthClick = () => {
    gapi.auth2.getAuthInstance().signIn();
  };

  const handleSignoutClick = () => {
    gapi.auth2.getAuthInstance().signOut();
  };

  const connectButton = (
    <Button
      className="login-button"
      onClick={ handleAuthClick }
      size="large"
    >
      <div className="google-icon-div">
        <FcGoogle />
      </div>
      Logar com o Google
    </Button>
  );

  const disconnectButton = (
    <Button
      variant="contained"
      onClick={ handleSignoutClick }
      size="large"
      color="error"
    >
      Desconectar
    </Button>
  );

  return isSignedIn ? disconnectButton : connectButton;
}
