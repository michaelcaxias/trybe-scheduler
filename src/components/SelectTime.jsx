/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Select from 'react-select';

const ONE_HOUR = 60;
const MAX_TIME = [...Array(ONE_HOUR + 1).keys()];
const TEN = 10;

console.log(MAX_TIME);

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
  const [minutes, setMinutes] = useState(OPTIONS[0].value);
  return (
    <Select
      classNamePrefix="select"
      onChange={ ({ value }) => setMinutes(value) }
      defaultValue={ OPTIONS[0] }
      isDisabled={ false }
      isClearable
      isSearchable
      name="color"
      options={ OPTIONS }
    />
  );
}
