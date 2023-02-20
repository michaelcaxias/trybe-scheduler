import PropTypes from 'prop-types';
import React, { useState, useEffect, createContext, useRef, useMemo } from 'react';
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

  const [userImage, setUserImage] = usePersistedState('userImage', blankImage);
  const [userName, setUserName] = usePersistedState('userName', 'Carregando...');
  const [userEmail, setUserEmail] = usePersistedState('userEmail', 'Carregando...');

  const [loading, setLoading] = useState(false);

  const scheduleElementRef = useRef(null);

  const context = useMemo(() => ({
      minutes,
      isSignedIn,
      colorId,
      scheduleValue,
      setMinutes,
      setUserImage,
      setUserName,
      setUserEmail,
      userImage,
      userName,
      userEmail,
      changeSignedInState,
      setColorId,
      changeScheduleValue,
      scheduleElementRef,
      links,
      setLinks,
      loading,
      accessToken,
      setAccessToken
  }), [accessToken, minutes, isSignedIn, colorId, scheduleValue, userImage, userName, userEmail, links, loading]);

  return (
    <MyContext.Provider value={ context }>
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
