import PropTypes from 'prop-types';
import React, { useState, useEffect, createContext, useRef } from 'react';
const { gapi } = window;
import usePersistedState from '../hooks/usePersistedState';

const blankImage = 'https://i.imgur.com/qEgz28w.png';

const { REACT_APP_API_KEY, REACT_APP_CLIENT_ID } = process.env;

const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];
const SCOPES = 'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/userinfo.profile';

export const MyContext = createContext();

export function Provider({ children }) {
  const [minutes, setMinutes] = usePersistedState('minutes', 0);
  const [isSignedIn, changeSignedInState] = usePersistedState('isSignedIn', false);
  const [colorId, setColorId] = usePersistedState('color',
    { color: '#33b679', name: 'Sálvia', id: '2' });

  const [scheduleValue, changeScheduleValue] = useState('');
  const [links, setLinks] = useState([]);

  const [userImage, setUserImage] = usePersistedState('userImage', blankImage);
  const [userName, setUserName] = usePersistedState('userName', 'Carregando...');
  const [userEmail, setUserEmail] = usePersistedState('userEmail', 'Carregando...');

  const [loading, setLoading] = useState(true);

  const scheduleElementRef = useRef(null);

  const context = {
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
  };

  useEffect(() => {
    try {
      initalizeGapi();
    } catch (error) {
      console.error('Error intialize: ', error);
    } finally {
      setLoading(false);
    }
  }, []);
  
  const initalizeGapi = async () => {
    gapi.load('client:auth2', async () => {
      const apiKey = REACT_APP_API_KEY || '';
      const clientId = REACT_APP_CLIENT_ID || '';
  
      await gapi.client.init({
        apiKey,
        clientId,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      });
    
      await gapi.client.load('calendar', 'v3');
    });
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
