import React, { useContext } from 'react';
import { Button } from '@material-ui/core';
import { FcGoogle } from 'react-icons/fc';
import { ImExit } from 'react-icons/im';
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
      className="login-logout login-button"
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
      className="login-logout logout-button"
      variant="contained"
      onClick={ handleSignoutClick }
      size="large"
      color="error"
    >
      <div className="exit-icon-div">
        <ImExit />
      </div>
      Desconectar
    </Button>
  );

  return isSignedIn ? disconnectButton : connectButton;
}
