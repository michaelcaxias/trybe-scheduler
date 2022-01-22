import PropTypes from 'prop-types';
import React from 'react';
import '../styles/TextField.scss';

export default function TextField({ placeholder, refElement, label, disabled }) {
  return (
    <div className="text-field">
      <div className="label-text">Agenda do Dia</div>
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
