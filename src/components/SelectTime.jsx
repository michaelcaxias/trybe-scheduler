/* eslint-disable no-magic-numbers */
/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import { MyContext } from '../context/Provider';
import '../styles/SelectTime.scss';

const ONE_HOUR = 60;
const MAX_TIME = [...Array(ONE_HOUR + 1).keys()].filter((number) => number % 5 === 0);
const TEN = 10;

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
    <FormControl variant="filled" sx={ { minWidth: 250 } } color="secondary">
      <InputLabel>Notificar antecipadamente</InputLabel>
      <Select
        className="select-time"
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

// <Select
//   classNamePrefix="select"
//   onChange={ (event) => (event ? setMinutes(event.value) : setMinutes(0)) }
//   defaultValue={ OPTIONS[0] }
//   isDisabled={ !isSignedIn }
//   isClearable
//   isSearchable
//   options={ OPTIONS }
