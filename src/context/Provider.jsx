import PropTypes from 'prop-types';
import React, { useState, useEffect, createContext, useRef } from 'react';
import { gapi } from 'gapi-script';
import usePersistedState from '../hooks/usePersistedState';

const blankImage = 'https://i.imgur.com/qEgz28w.png';

const { REACT_APP_KEYS } = process.env;

const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];
const SCOPES = 'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/userinfo.profile';

export const MyContext = createContext();

export function Provider({ children }) {
  const [minutes, setMinutes] = usePersistedState('minutes', 0);
  const [isSignedIn, changeSignedInState] = useState(false);
  const [colorId, setColorId] = usePersistedState('color',
    { color: '#33b679', name: 'Sálvia', id: '2' });

  const [scheduleValue, changeScheduleValue] = useState('');
  const [links, setLinks] = useState([]);
  const [userImage, setUserImage] = usePersistedState('userImage', blankImage);

  const [loading, setLoading] = useState(true);
  const [serviceId, setServiceId] = usePersistedState('serviceId', 2);

  const scheduleElementRef = useRef(null);

  const context = {
    minutes,
    isSignedIn,
    colorId,
    scheduleValue,
    setMinutes,
    setUserImage,
    userImage,
    changeSignedInState,
    setColorId,
    changeScheduleValue,
    scheduleElementRef,
    links,
    setLinks,
    loading,
    serviceId,
    setServiceId,
  };

  useEffect(() => {
    const keys = JSON.parse(REACT_APP_KEYS);
    const { apiKey, clientId } = keys.find((key) => key.id === serviceId);
    gapi.load('client:auth2', () => {
      gapi.client.init({
        apiKey,
        clientId,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      }).then(() => {
        gapi.auth2.getAuthInstance().isSignedIn.listen(changeSignedInState);
        changeSignedInState(gapi.auth2.getAuthInstance().isSignedIn.get());
      })
        .catch((error) => console.log('Error intialize: ', error));

      gapi.client.load('calendar', 'v3').then(() => {
        setUserImage(gapi.auth2.getAuthInstance().currentUser.get()
          .getBasicProfile().getImageUrl());
        setLoading(false);
      }).catch(() => setLoading(false));
    });
  }, [setUserImage, serviceId]);

  return (
    <MyContext.Provider value={ context }>
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
