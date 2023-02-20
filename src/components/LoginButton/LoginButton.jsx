import React, { useContext } from 'react';
import { MyContext } from '../../context/Provider';

import { Button } from '@mui/material';
import { FcGoogle } from 'react-icons/fc';
import { ImExit } from 'react-icons/im';

import { useNavigate } from 'react-router-dom';
import { useGoogleLogin, googleLogout } from '@react-oauth/google';
import axios from 'axios';

import './LoginButton.scss';

const blankImage = 'https://i.imgur.com/qEgz28w.png';
const SCOPES = 'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/userinfo.profile';

export default function LoginButton() {
  const { isSignedIn, setUserImage, setUserName, setUserEmail, changeSignedInState } = useContext(MyContext);
  const navigate = useNavigate();

  const login = useGoogleLogin({
    scope: SCOPES,
    onSuccess: (response) => signInWorkflow(response),
    onError: (error) => console.error(error),
  });

  const signInWorkflow = async (response) => {
    changeSignedInState(true);
    const userInfo = await requestUserInfo(response);
    updateUserInfo(userInfo.data);
    navigate('/scheduler');
  };

  const updateUserInfo = (userInfo) => {
    const { picture, name, email } = userInfo;
    setUserImage(picture);
    setUserName(name);
    setUserEmail(email);
  };

  const requestUserInfo = async (response) => {
    const gettingUserInfo = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: {
        Authorization: `Bearer ${response.access_token}`
      }
    });
    return gettingUserInfo;
  };

  const handleSignoutClick = () => {
    googleLogout();
    setUserImage(blankImage);
    navigate('/');
  };

  const connectButton = (
    <Button
      className="login-logout login-button"
      onClick={ login }
      size="large"
    >
      <div className="google-icon-div">
        <FcGoogle aria-label="Logo do Google" />
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
        <ImExit aria-label="ícone de saída" />
      </div>
      Desconectar
    </Button>
  );

  return isSignedIn ? disconnectButton : connectButton;
}
