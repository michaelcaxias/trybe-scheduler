/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Select from 'react-select';

const ONE_HOUR = 60;
const MAX_TIME = [...Array(ONE_HOUR + 1).keys()].slice(1);
const TEN = 10;

const OPTIONS = MAX_TIME.map((time) => ({
  value: time,
  label: `${time < TEN ? `${time} minuto` : `${time} minutos`}`,
}));

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
