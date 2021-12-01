import { useEffect } from "react";
import { gapi } from 'gapi-script';

function App() {
  const CLIENT_ID = '21771173827-darl8kjorgcnu0chelaillutki3fqc5e.apps.googleusercontent.com';
  const API_KEY = 'AIzaSyCuU61dFOxsqTw0 wu8qvRSisl5nqTG4vbA';
  const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
  const SCOPES = "https://www.googleapis.com/auth/calendar";
  const authorizeButton = document.getElementById('authorize_button');
  const signoutButton = document.getElementById('signout_button');
  const addEventButton = document.getElementById('add_event');


  function handleClientLoad() {
    gapi.load('client:auth2', initClient);
  }

  function initClient() {
    gapi.client.init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES
    }).then(function () {
      gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

      updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
      authorizeButton.onclick = handleAuthClick;
      signoutButton.onclick = handleSignoutClick;
      addEventButton.onclick = handleAddEvent;
    }, function(error) {
      appendPre(JSON.stringify(error, null, 2));
    });
  }

  function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
      authorizeButton.style.display = 'none';
      signoutButton.style.display = 'block';
      listUpcomingEvents();
    } else {
      authorizeButton.style.display = 'block';
      signoutButton.style.display = 'none';
    }
  }

  function handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
  }
  function handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
  }

  function handleAddEvent() {
    const currentDate = new Date();
    const date = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
    const scheduleValue = document.querySelector('textarea').value;
    const scheduleFiltered = filterString(scheduleValue);
    scheduleFiltered.forEach(delayLoop(({ title, startTime, endTime }) => {
      const event = {
        'summary': title,
        'location': 'Remoto',
        'description': '',
        'start': {
          'dateTime': `${date}T${startTime}:00-03:00`,
          'timeZone': 'America/Sao_Paulo'
        },
        'end': {
          'dateTime': `${date}T${endTime}:00-03:00`,
          'timeZone': 'America/Sao_Paulo'
        },
        'reminders': {
          'useDefault': false,
          'overrides': [
            {'method': 'popup', 'minutes': 10}
          ]
        },
        'colorId': '2',
      };
      const request = gapi.client.calendar.events.insert({
        'calendarId': 'primary',
        'resource': event
      });

      request.execute((event) => {
        appendPre('Event created: ' + event.htmlLink);
      });
    }, 1000))
  }

  const filterString = (string) => {
    return string
    .split('\n')
    .filter(line => line)
    .map(filterLines => filterLines.split(/zoom/i)[0])
    .filter(char => char[0] !== ' ')
    .map(filterLines => {
      const filterObligated = filterLines.split('[*]')
      return filterObligated[1] ? filterObligated[1].trim() : filterObligated[0]
    })
    .map(filterLines => {
      const filterArray = filterLines.split('-')
      return {
        title: filterArray[1].trim(),
        startTime: filterArray[0].split('às')[0].replace('h',':').trim(),
        endTime: filterArray[0].split('às')[1].replace('h',':').trim(),
      }
    })
  }

  const delayLoop = (func, delay) => {
    return (param, i) => {
      setTimeout(() => {
        func(param);
      }, i * delay);
    }
  };

  function appendPre(message) {
    const pre = document.getElementById('content');
    const textContent = document.createTextNode(message + '\n');
    pre.appendChild(textContent);
  }

  function listUpcomingEvents() {
    gapi.client.calendar.events.list({
      'calendarId': 'primary',
      'timeMin': (new Date()).toISOString(),
      'showDeleted': false,
      'singleEvents': true,
      'maxResults': 10,
      'orderBy': 'startTime'
    });
  }

  return (
    <main>
      <p>Google Calendar API Quickstart</p>
      <button id="authorize_button" style={{ display: 'none' }}>Authorize</button>
      <button id="signout_button" style={{ display: 'none' }}>Sign Out</button>
      <textarea cols="30" rows="10" placeholder="Cole aqui a agenda do dia"></textarea>
      <button id="add_event">Adicionar</button>
  
      <pre id="content" style={{ whiteSpace: 'pre-wrap' }}></pre>
    </main>
  );
}

export default App;
