import PropTypes from 'prop-types';
import React, { useState, createContext, useRef, useMemo } from 'react';
import usePersistedState from '../hooks/usePersistedState';

const blankImage = 'https://i.imgur.com/qEgz28w.png';

export const MyContext = createContext();

export function Provider({ children }) {
  const [minutes, setMinutes] = usePersistedState('minutes', 0);
  const [isSignedIn, changeSignedInState] = usePersistedState('isSignedIn', false);
  const [accessToken, setAccessToken] = usePersistedState('accessToken', '');
  const [colorId, setColorId] = usePersistedState('color',
    { color: '#33b679', name: 'Sálvia', id: '2' });

  const [scheduleValue, changeScheduleValue] = useState('');
  const [links, setLinks] = useState([]);

  const [userInfo, setUserInfo] = useState({ picture: blankImage, name: 'Carregando...', email: 'Carregando...' });

  const [loading, setLoading] = useState(true);

  const scheduleElementRef = useRef(null);

  const context = useMemo(
    () => ({
      minutes,
      isSignedIn,
      colorId,
      scheduleValue,
      setMinutes,
      changeSignedInState,
      setColorId,
      changeScheduleValue,
      scheduleElementRef,
      links,
      setLinks,
      loading,
      setLoading,
      accessToken,
      setAccessToken,
      userInfo,
      setUserInfo,
    }),
    [
      accessToken,
      minutes,
      isSignedIn,
      colorId,
      scheduleValue,
      links,
      loading,
      userInfo,
    ]
  );

  return (
    <MyContext.Provider value={ context }>
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
