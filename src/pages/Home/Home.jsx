/* eslint-disable max-len */
import React, { useState, useContext } from 'react';
import { filterString, getCurrentDate, eventFormat, delayLoop } from './index';
import SelectTime from '../../components/SelectTime';
import { MyContext } from '../../context/Provider';
import SelectColors from '../../components/SelectColors';

const { gapi } = window;

const ONE_SECOND = 1000;

export default function Home() {
  const { isSignedIn } = useContext(MyContext);
  const [scheduleValue, changeScheduleValue] = useState('');

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
        disabled={ !isSignedIn }
      />
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
