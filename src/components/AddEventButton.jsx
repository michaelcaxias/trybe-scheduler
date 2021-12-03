import React, { useContext, useState, useEffect } from 'react';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Alert from './Alert';
import { filterString, getCurrentDate, eventFormat, delayLoop } from '../services/index';
import { MyContext } from '../context/Provider';

const ONE_SECOND = 1000;
const { gapi } = window;

export default function AddEventButton() {
  const {
    isSignedIn, colorId, minutes, scheduleValue,
  } = useContext(MyContext);

  const [snackPack, setSnackPack] = useState([]);
  const [open, setOpen] = useState(false);
  const [messageInfo, setMessageInfo] = useState(undefined);
  const [alertVariant, setAlertVariant] = useState('success');

  const handleClick = () => {
    const scheduleFiltered = filterString(scheduleValue);
    scheduleFiltered.forEach(delayLoop((calendarEvents) => {
      const message = `
      Evento criado:
      ${calendarEvents.startTime} até ${calendarEvents.endTime} - ${calendarEvents.title}
      `;
      const request = gapi.client.calendar.events.insert({
        calendarId: 'primary',
        resource: eventFormat(calendarEvents, getCurrentDate(), colorId.id, minutes),
      });
      request.execute((event) => {
        if (!event.htmlLink) {
          setAlertVariant('error');
          const messageEvent = 'Não foi possível criar o evento';
          setSnackPack((prev) => [...prev, {
            message: messageEvent, key: new Date().getTime(),
          }]);
        } else {
          setAlertVariant('success');
          setSnackPack((prev) => [...prev, {
            message, key: new Date().getTime(),
          }]);
        }
      });
    }, ONE_SECOND));
  };

  const handleClose = (_event, reason) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  const handleExited = () => {
    setMessageInfo(undefined);
  };

  useEffect(() => {
    if (snackPack.length && !messageInfo) {
      setMessageInfo({ ...snackPack[0] });
      setSnackPack((prev) => prev.slice(1));
      setOpen(true);
    } else if (snackPack.length && messageInfo && open) {
      setOpen(false);
    }
  }, [snackPack, messageInfo, open]);

  return (
    <>
      <Button
        disabled={ !isSignedIn }
        onClick={ handleClick }
        variant="outlined"
        startIcon={ <CalendarTodayIcon /> }
      >
        Adicionar
      </Button>
      <Snackbar
        key={ messageInfo ? messageInfo.key : undefined }
        open={ open }
        autoHideDuration={ 3000 }
        onClose={ handleClose }
        TransitionProps={ { onExited: handleExited } }
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            sx={ { p: 0.5 } }
            onClick={ handleClose }
          >
            <CloseIcon />
          </IconButton>
        }
      >
        <Alert onClose={ handleClose } severity={ alertVariant } sx={ { width: '100%' } }>
          { messageInfo ? messageInfo.message : undefined }
        </Alert>
      </Snackbar>
    </>
  );
}
