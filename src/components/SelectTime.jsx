import React, { useContext } from 'react';
import Select from 'react-select';
import { MyContext } from '../context/Provider';

const ONE_HOUR = 60;
const MAX_TIME = [...Array(ONE_HOUR + 1).keys()];

const OPTIONS = MAX_TIME.map((time) => {
  const moreThanZero = {
    value: time,
    label: `${time < TEN ? `${time} minuto` : `${time} minutos`}`,
  };
  const zero = {
    value: time,
    label: 'Na mesma hora',
  };
  return time === 0 ? zero : moreThanZero;
});

export default function SelectTime() {
  const { setMinutes, isSignedIn } = useContext(MyContext);
  return (
    <Select
      classNamePrefix="select"
      onChange={ (event) => (event ? setMinutes(event.value) : setMinutes(0)) }
      defaultValue={ OPTIONS[0] }
      isDisabled={ !isSignedIn }
      isClearable
      isSearchable
      name="color"
      options={ OPTIONS }
    />
  );
}
