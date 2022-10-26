import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import {
  Navigate,
} from 'react-router-dom';
import { MyContext } from './Provider';

const PrivateRoute = ({ children }) => {
  const { isSignedIn } = useContext(MyContext);

  if (!isSignedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
