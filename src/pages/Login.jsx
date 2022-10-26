import React, { useContext } from 'react';

import { MyContext } from '../context/Provider';
import LoginButton from '../components/LoginButton';
import Loading from '../components/Loading';

const Login = () => {
  const { loading } = useContext(MyContext);

  const loginPage = (
    <div>
      <h1>Faça login!</h1>
      <LoginButton />
    </div>
  );

  return loading ? <Loading /> : loginPage;
};

export default Login;
