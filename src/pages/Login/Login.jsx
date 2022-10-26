import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { MyContext } from '../../context/Provider';
import LoginButton from '../../components/LoginButton/LoginButton';
import Loading from '../../components/Loading/Loading';
import { AppWrap, MotionWrap } from '../../wrapper';

import logo from '../../images/logo.svg';

import './Login.scss';

const Login = () => {
  const { loading, isSignedIn } = useContext(MyContext);

  const loginPage = (
    <>
    <div className="login__logo">
      <img src={logo}/>
      <h1>Trybe Schedule</h1>
    </div>

    <div className="app__flex login__box">
      <h2 className="login__head">Faça login!</h2>
      <p className="p-text">Para a aplicação conseguir alterar seu calendar, você precisa nos autorizar, não se preocupe com a mensagem de <span className="bold-text">aplicação não verificada</span>, estamos resolvendo isso.</p>
      <LoginButton />
    </div>
    </>
  );

  function validar() {
    if (isSignedIn) {
      return <Navigate to="/scheduler" />;
    }
    return loginPage;
  }

  return loading ? <Loading /> : validar();
};

export default AppWrap(MotionWrap(Login, ''), 'Login', 'app_light_blackbg');
