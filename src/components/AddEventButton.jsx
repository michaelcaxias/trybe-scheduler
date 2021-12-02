import React, { useContext } from 'react';
import { MyContext } from '../context/Provider';
import { filterString, getCurrentDate, eventFormat, delayLoop } from '../services/index';

const ONE_SECOND = 1000;
const { gapi } = window;

export default function AddEvent() {
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

  return (
    <button
      type="button"
      disabled={ !isSignedIn }
      onClick={ handleClick }
    >
      Adicionar
    </button>
  );
}
