import React, { useContext } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { MyContext } from '../../context/Provider';

import './SelectTime.scss';

const ONE_HOUR = 60;
const FIVE = 5;
const MAX_TIME = [...Array(ONE_HOUR + 1).keys()].filter((number) => number % FIVE === 0);

const OPTIONS = MAX_TIME.map((time) => {
  const moreThanZero = {
    value: time,
    label: `${time < 1 ? `${time} minuto` : `${time} minutos`}`,
  };
  const zero = {
    value: time,
    label: 'Na mesma hora',
  };
  return time === 0 ? zero : moreThanZero;
});

export default function SelectTime() {
  const { minutes, setMinutes, isSignedIn } = useContext(MyContext);
  return (
    <FormControl
      variant="filled"
      className="select-time"
      sx={ { minWidth: 250 } }
      color="secondary"
    >
      <InputLabel>Notificar antecipadamente</InputLabel>
      <Select
        value={ minutes }
        onChange={ ({ target: { value } }) => setMinutes(value) }
        disabled={ !isSignedIn }
      >
        {OPTIONS.map(({ value, label }) => (
          <MenuItem
            key={ value }
            value={ value }
          >
            {label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
