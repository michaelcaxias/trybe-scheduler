/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import '../styles/TextField.scss';

export default function TextField({
  placeholder, refElement, label, disabled, onChange, value }) {
  const getElementValue = () => {
    const refText = refElement ? refElement.current.innerText : '';
    onChange(refText);
  };

  return (
    <div className="text-field">
      <div
        className={ value.length ? 'label-text focus' : 'label-text' }
      >
        Agenda do Dia

      </div>
      <div
        ref={ refElement }
        contentEditable
        data-text={ placeholder }
        disabled={ disabled }
        onKeyUp={ getElementValue }
        role="textbox"
        tabIndex="0"
        aria-label={ label }
      />
    </div>
  );
}

TextField.propTypes = {
  placeholder: PropTypes.string.isRequired,
  refElement: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
