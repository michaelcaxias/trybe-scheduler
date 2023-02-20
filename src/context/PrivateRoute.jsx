import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import {
  Navigate,
} from 'react-router-dom';
import { MyContext } from './Provider';
import Loading from '../components/Loading/Loading';

const PrivateRoute = ({ children }) => {
  const { isSignedIn, loading } = useContext(MyContext);

  function validateWorkflow() {
    if (!isSignedIn) {
      return <Navigate to="/login" />;
    }
    return children;
  }

  return loading ? <Loading /> : validateWorkflow();
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
