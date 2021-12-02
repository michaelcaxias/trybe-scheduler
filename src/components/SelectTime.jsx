/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Select from 'react-select';

const options = [
  { value: 1, label: '1 Minuto' },
  { value: 2, label: '2 Minutos' },
  { value: 3, label: '3 Minutos' },
];

export default function SelectTime() {
  const [minutes, setMinutes] = useState(options[0].value);
  return (
    <Select
      classNamePrefix="select"
      onChange={ ({ value }) => setMinutes(value) }
      defaultValue={ options[0] }
      isDisabled={ false }
      isClearable
      isSearchable
      name="color"
      options={ options }
    />
  );
}
