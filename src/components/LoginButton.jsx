import React, { useContext } from 'react';
import { Button } from '@material-ui/core';
import GoogleIcon from '@mui/icons-material/Google';
import { MyContext } from '../context/Provider';

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
      variant="outlined"
      onClick={ handleAuthClick }
      size="large"
      startIcon={ <GoogleIcon /> }
    >
      Conectar
    </Button>
  );

  const disconnectButton = (
    <Button
      variant="contained"
      onClick={ handleSignoutClick }
      size="large"
      color="error"
      startIcon={ <GoogleIcon /> }
    >
      Desconectar
    </Button>
  );

  return isSignedIn ? disconnectButton : connectButton;
}
