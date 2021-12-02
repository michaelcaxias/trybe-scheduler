import React, { useContext } from 'react';
import { filterString, getCurrentDate, eventFormat, delayLoop } from './index';
import SelectTime from '../../components/SelectTime';
import { MyContext } from '../../context/Provider';
import SelectColors from '../../components/SelectColors';
import TextArea from '../../components/TextArea';

const { gapi } = window;

const ONE_SECOND = 1000;

export default function Home() {
  const {
    isSignedIn, colorId, minutes, scheduleValue,
  } = useContext(MyContext);

  const handleClick = () => {
    const scheduleFiltered = filterString(scheduleValue);
    scheduleFiltered.forEach(delayLoop((calendarEvents) => {
      const request = gapi.client.calendar.events.insert({
        calendarId: 'primary',
        resource: eventFormat(calendarEvents, getCurrentDate(), colorId.id, minutes),
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

  return (
    <main>
      <button
        type="button"
        onClick={ isSignedIn ? handleSignoutClick : handleAuthClick }
      >
        { isSignedIn ? 'Sair' : 'Logar' }
      </button>
      <TextArea />
      <button
        type="button"
        disabled={ !isSignedIn }
        onClick={ handleClick }
      >
        Adicionar
      </button>
      <SelectTime />
      <SelectColors />
    </main>
  );
}
