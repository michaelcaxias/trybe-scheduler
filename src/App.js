/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';

const { gapi } = window;

const CLIENT_ID = '21771173827-darl8kjorgcnu0chelaillutki3fqc5e.apps.googleusercontent.com';
const API_KEY = 'AIzaSyCuU61dFOxsqTw0 wu8qvRSisl5nqTG4vbA';
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];
const SCOPES = 'https://www.googleapis.com/auth/calendar.events';

const ONE_SECOND = 1000;
const regex = /([0-2][0-9]h[0-5][0-9])/;

const filterString = (string) => string
  .split('\n')
  .filter((str) => str.match(regex))
  .map((line) => {
    const optionalLine = line.split('[*]');
    return optionalLine[1] ? `${optionalLine[1].trim()} (Opcional)` : optionalLine[0];
  })
  .map((line) => {
    const filterArray = line.split('-');
    const optionalLine = line.includes('(Opcional)');
    return {
      title: filterArray[1].trim(),
      startTime: filterArray[0].split('às')[0].replace('h', ':').trim(),
      endTime: filterArray[0].split('às')[1].replace('h', ':').trim(),
      description: optionalLine ? 'Momento Opcional' : '',
    };
  });

const getCurrentDate = () => {
  const date = new Date();
  const fullYear = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${fullYear}-${month}-${day}`;
};

const eventFormat = ({ title, startTime, endTime, description }, date) => ({
  summary: title,
  location: 'Remoto',
  description,
  start: {
    dateTime: `${date}T${startTime}:00-03:00`,
    timeZone: 'America/Sao_Paulo',
  },
  end: {
    dateTime: `${date}T${endTime}:00-03:00`,
    timeZone: 'America/Sao_Paulo',
  },
  reminders: {
    useDefault: false,
    overrides: [
      { method: 'popup', minutes: 10 },
    ],
  },
  colorId: '2',
});

const delayLoop = (func, delay) => (param, i) => {
  setTimeout(() => {
    func(param);
  }, i * delay);
};

function App() {
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

export default App;
