import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { MyContext } from '../../context/Provider';
import LoginButton from '../../components/LoginButton/LoginButton';
import Loading from '../../components/Loading/Loading';

import { AppWrap, MotionWrap } from '../../wrapper';
import Footer from '../../components/Footer/Footer';

import { images } from '../../constants';

import './Login.scss';

const Login = () => {
  const { loading, isSignedIn } = useContext(MyContext);

  const loginPage = (
    <>
    <div className="login__logo">
      <img src={images.logo} alt=""/>
      <h1>Trybe Scheduler</h1>
    </div>

    <div className="app__flex login__box">
      <h2 className="login__head">Faça login!</h2>
        <p className="p-text">
          Caso você tenha problemas ao adicionar a sua agenda da Trybe, 
          <span className="bold-text"> limpe os cookies e recarregue a página</span>
          , isso deve resolver a maioria dos problemas, se não resolver, nos chame no Slack!
        </p>
      <LoginButton />
    </div>
    </>
  );

  function validateWorkflow() {
    if (isSignedIn) {
      return <Navigate to="/scheduler" />;
    }
    return loginPage;
  }

  return loading ? <Loading /> : validateWorkflow();
};

export default AppWrap(MotionWrap(Login, ''), null, Footer, 'Login', '');
