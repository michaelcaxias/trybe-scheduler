import React, { useContext, useState, useEffect } from 'react';

import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import Alert from '../Alert/Alert';

import { filterString, getCurrentDate, eventFormat, delayLoop } from '../../services';

import { MyContext } from '../../context/Provider';

import { googleLogout } from '@react-oauth/google';
import axios from 'axios';

const { REACT_APP_API_KEY } = process.env;

import './AddEventButton.scss';
import { useNavigate } from 'react-router';


const ONE_SECOND = 1000;

export default function AddEventButton() {
  const {
    isSignedIn, colorId, minutes, scheduleValue, links, accessToken
  } = useContext(MyContext);

  const [snackPack, setSnackPack] = useState([]);
  const [open, setOpen] = useState(false);
  const [messageInfo, setMessageInfo] = useState(undefined);
  const [alertVariant, setAlertVariant] = useState('success');

  const navigate = useNavigate();

  const eventNotPossible = () => {
    setAlertVariant('warning');
    setSnackPack((prev) => [...prev, {
      message: 'Insira um valor válido no campo de texto', key: new Date().getTime(),
    }]);
  };

  const insertEvents = (textAreaValue) => (
    textAreaValue.forEach(delayLoop(async (calendarEvents) => {
      const message = `Evento criado: ${calendarEvents.title}`;
      const errorEventMessage = 'Não foi possível criar o evento';
      const calendarEventFormat = eventFormat(calendarEvents, getCurrentDate(), colorId.id, minutes);
      const request = await insertEventCalendarAPI(calendarEventFormat);
      const response = request.data;
      logoutUserIfUnauthorized(response);
      if (!response.htmlLink) {
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
  }, ONE_SECOND)));

  const logoutUserIfUnauthorized = (error) => {
    if (error.code === 401) {
      googleLogout();
      navigate('/');
    }
  };

  const insertEventCalendarAPI = async (calendarEvents) => {
    const baseURL = 'https://content.googleapis.com';
    const calendarPath = '/calendar/v3/calendars/primary/events?alt=json&key=';
    const URL = `${baseURL}${calendarPath}${REACT_APP_API_KEY}`;
    return axios.post(URL, calendarEvents, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      }
    });
  };

  const handleClick = () => {
    const scheduleFiltered = filterString(scheduleValue, links);
    if (!scheduleFiltered.length) {
      eventNotPossible();
    }
    insertEvents(scheduleFiltered);
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
    <div className="add-event-button">
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
    </div>
  );
}
