import React, { useContext } from 'react';

import { Button } from '@material-ui/core';

import { FcGoogle } from 'react-icons/fc';
import { ImExit } from 'react-icons/im';

import { gapi } from 'gapi-script';

import { useNavigate } from 'react-router-dom';

import { MyContext } from '../../context/Provider';

import './LoginButton.scss';

const blankImage = 'https://i.imgur.com/qEgz28w.png';

export default function LoginButton() {
  const { isSignedIn, setUserImage, changeSignedInState } = useContext(MyContext);
  const navigate = useNavigate();

  const handleAuthClick = async () => {
    // Faz o Login
    await gapi.auth2.getAuthInstance().signIn();

    // Depois verifica se o usuário está logado, e seta esse valor em isSignedIn
    await gapi.auth2.getAuthInstance().isSignedIn.listen(changeSignedInState);
    await changeSignedInState(gapi.auth2.getAuthInstance().isSignedIn.get());

    // Agora pega a imagem do usuário e seta em userImage
    const profileImage = gapi.auth2.getAuthInstance().currentUser.get()
      .getBasicProfile().getImageUrl();

    setUserImage(profileImage);

    // Finalmente navega para a página de schedule
    navigate('/scheduler');
  };

  const handleSignoutClick = () => {
    gapi.auth2.getAuthInstance().signOut();
    setUserImage(blankImage);
    navigate('/');
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
