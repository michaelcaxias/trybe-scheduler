import PropTypes from 'prop-types';
import React, { useState, createContext } from 'react';

export const MyContext = createContext();

export function Provider({ children }) {
  const [minutes, setMinutes] = useState(0);

  const context = {
    minutes,
    setMinutes,
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
