/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import '../styles/TextField.scss';

export default function TextField({ placeholder, refElement, label, disabled }) {
  return (
    <div className="text-field">
      <div
        ref={ refElement }
        contentEditable
        data-text={ placeholder }
        disabled={ disabled }
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
