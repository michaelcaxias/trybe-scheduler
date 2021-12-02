/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { filterString, getCurrentDate, eventFormat, delayLoop } from './index';

const { gapi } = window;

const CLIENT_ID = '21771173827-darl8kjorgcnu0chelaillutki3fqc5e.apps.googleusercontent.com';
const API_KEY = 'AIzaSyCuU61dFOxsqTw0 wu8qvRSisl5nqTG4vbA';
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];
const SCOPES = 'https://www.googleapis.com/auth/calendar.events';

const ONE_SECOND = 1000;

export default function Home() {
  const [scheduleValue, changeScheduleValue] = useState('');
  const [isSignedIn, changeSignedInState] = useState(false);

  const handleClick = () => {
    const scheduleFiltered = filterString(scheduleValue);
    scheduleFiltered.forEach(delayLoop((calendarEvents) => {
      const request = gapi.client.calendar.events.insert({
        calendarId: 'primary',
        resource: eventFormat(calendarEvents, getCurrentDate()),
      });

      request.execute((event) => {
        console.log(`Event created: ${event.htmlLink}`);
      });
    }, ONE_SECOND));
  };

  const handleAuthClick = () => {
    gapi.auth2.getAuthInstance().signIn();
  };

  const handleSignoutClick = () => {
    gapi.auth2.getAuthInstance().signOut();
  };

  useEffect(() => {
    gapi.load('client:auth2', () => {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      }).then(() => {
        gapi.auth2.getAuthInstance().isSignedIn.listen(changeSignedInState);
        changeSignedInState(gapi.auth2.getAuthInstance().isSignedIn.get());
      }).catch((error) => console.log(`Error intialize:${error}`));

      gapi.client.load('calendar', 'v3');
    });
  }, []);

  return (
    <main>
      <button
        type="button"
        onClick={ isSignedIn ? handleSignoutClick : handleAuthClick }
      >
        { isSignedIn ? 'Sair' : 'Logar' }
      </button>
      <textarea
        cols="30"
        onChange={ ({ target: { value } }) => changeScheduleValue(value) }
        rows="10"
        placeholder="Cole aqui a agenda do dia"
      />
      <button
        type="button"
        onClick={ handleClick }
      >
        Adicionar
      </button>
    </main>
  );
}
