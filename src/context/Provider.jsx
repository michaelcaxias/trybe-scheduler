import PropTypes from 'prop-types';
import React, { createContext } from 'react';

export const MyContext = createContext();

export function Provider({ children }) {
  const context = {
    any: '',
  };

  return (
    <MyContext.Provider value={ context }>
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
