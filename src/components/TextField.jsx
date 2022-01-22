/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import '../styles/TextField.scss';

export default function TextField({ placeholder, refElement, label, disabled }) {
  const [textAreaLength, changeTextAreaLength] = useState(0);

  const getElementLength = () => {
    const refLength = refElement ? refElement.current.innerText.length : 0;
    changeTextAreaLength(refLength);
  };
  return (
    <div className="text-field">
      <div
        className={ textAreaLength ? 'label-text focus' : 'label-text' }
      >
        Agenda do Dia

      </div>
      <div
        ref={ refElement }
        contentEditable
        data-text={ placeholder }
        disabled={ disabled }
        onKeyUp={ getElementLength }
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
};
