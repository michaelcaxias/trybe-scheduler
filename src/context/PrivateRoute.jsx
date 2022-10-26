import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import {
  Navigate,
} from 'react-router-dom';
import { MyContext } from './Provider';
import Loading from '../components/Loading';

const PrivateRoute = ({ children }) => {
  const { isSignedIn, loading } = useContext(MyContext);

  function validar() {
    console.log(isSignedIn);
    if (!isSignedIn) {
      return <Navigate to="/login" />;
    }
    return children;
  }

  return loading ? <Loading /> : validar();
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
