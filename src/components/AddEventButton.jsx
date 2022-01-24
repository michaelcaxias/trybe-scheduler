/* eslint-disable sonarjs/cognitive-complexity */
import React, { useContext, useState, useEffect } from 'react';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Alert from './Alert';
import { filterString, getCurrentDate, eventFormat, delayLoop } from '../services/index';
import { MyContext } from '../context/Provider';
import '../styles/AddEventButton.scss';

const { gapi } = window;
const ONE_SECOND = 1000;

export default function AddEventButton() {
  const {
    isSignedIn, colorId, minutes, scheduleValue, links,
  } = useContext(MyContext);

  const [snackPack, setSnackPack] = useState([]);
  const [open, setOpen] = useState(false);
  const [messageInfo, setMessageInfo] = useState(undefined);
  const [alertVariant, setAlertVariant] = useState('success');

  const eventNotPossible = () => {
    setAlertVariant('warning');
    setSnackPack((prev) => [...prev, {
      message: 'Insira um valor válido no campo de texto', key: new Date().getTime(),
    }]);
  };

  const insertEvent = (textAreaValue) => (
    textAreaValue.forEach(delayLoop((calendarEvents) => {
      const message = `Evento criado: ${calendarEvents.title}`;
      const errorEventMessage = 'Não foi possível criar o evento';
      const request = gapi.client.calendar.events.insert({
        calendarId: 'primary',
        resource: eventFormat(calendarEvents, getCurrentDate(), colorId.id, minutes),
      });
      request.execute((event) => {
        if (!event.htmlLink) {
          setAlertVariant('error');
          setSnackPack((prev) => [...prev, {
            message: errorEventMessage, key: new Date().getTime(),
          }]);
        } else {
          setAlertVariant('success');
          setSnackPack((prev) => [...prev, {
            message, key: new Date().getTime(),
          }]);
        }
      });
    }, ONE_SECOND)));

  const handleClick = () => {
    const scheduleFiltered = filterString(scheduleValue, links);
    if (!scheduleFiltered.length) {
      eventNotPossible();
    }
    insertEvent(scheduleFiltered);
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
        size="large"
        startIcon={ <CalendarTodayIcon /> }
        className="add-event-button"
      >
        Adicionar
      </Button>
      <Snackbar
        anchorOrigin={ { vertical: 'top', horizontal: 'right' } }
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
