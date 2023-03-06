import React, { useContext } from 'react';
import { MyContext } from '../../context/Provider';

import { Button } from '@mui/material';
import { FcGoogle } from 'react-icons/fc';

import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

import './LoginButton.scss';

const SCOPES = 'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/userinfo.profile';

export default function LoginButton() {
  const { changeSignedInState, setAccessToken, setUserInfo } = useContext(MyContext);
  const navigate = useNavigate();

  const login = useGoogleLogin({
    scope: SCOPES,
    onSuccess: (response) => signInWorkflow(response),
    onError: (error) => console.error(error),
  });

  const signInWorkflow = async (response) => {
    changeSignedInState(true);
    setAccessToken(response.access_token);
    const userInfo = await requestUserInfo(response);
    updateUserInfo(userInfo.data);
    navigate('/scheduler');
  };

  const updateUserInfo = (userInfo) => {
    setUserInfo(userInfo);
  };

  const requestUserInfo = async (response) => {
    const gettingUserInfo = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: {
        Authorization: `Bearer ${response.access_token}`
      }
    });
    return gettingUserInfo;
  };

  return (
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
}
