import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { MyContext } from '../../context/Provider';
import LoginButton from '../../components/LoginButton/LoginButton';
import Loading from '../../components/Loading/Loading';

const Login = () => {
  const { loading, isSignedIn } = useContext(MyContext);

  const loginPage = (
    <div>
      <h1>Faça login!</h1>
      <LoginButton />
    </div>
  );

  function validar() {
    if (isSignedIn) {
      return <Navigate to="/scheduler" />;
    }
    return loginPage;
  }

  return loading ? <Loading /> : validar();
};

export default Login;
