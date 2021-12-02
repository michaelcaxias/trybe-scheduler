import React, { useContext } from 'react';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { Button } from '@material-ui/core';
import { filterString, getCurrentDate, eventFormat, delayLoop } from '../services/index';
import { MyContext } from '../context/Provider';

const ONE_SECOND = 1000;
const { gapi } = window;

export default function AddEventButton() {
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
    <Button
      disabled={ !isSignedIn }
      onClick={ handleClick }
      variant="outlined"
      startIcon={ <CalendarTodayIcon /> }
    >
      Adicionar
    </Button>
  );
}
