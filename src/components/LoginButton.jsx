import React, { useContext } from 'react';
import { Button } from '@material-ui/core';
import { FcGoogle } from 'react-icons/fc';
import { ImExit } from 'react-icons/im';
import { MyContext } from '../context/Provider';
import '../styles/LoginButton.scss';

const blankImage = 'https://i.imgur.com/qEgz28w.png';
const { gapi } = window;

export default function LoginButton() {
  const { isSignedIn, setUserImage } = useContext(MyContext);

  const handleAuthClick = async () => {
    await gapi.auth2.getAuthInstance().signIn();
    const profileImage = gapi.auth2.getAuthInstance().currentUser.get()
      .getBasicProfile().getImageUrl();
    setUserImage(profileImage);
  };

  const handleSignoutClick = () => {
    gapi.auth2.getAuthInstance().signOut();
    setUserImage(blankImage);
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
