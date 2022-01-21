import PropTypes from 'prop-types';
import React from 'react';
import '../styles/TextField.scss';

export default function TextField({ placeholder }) {
  return (
    <div className="text-field">
      <div contentEditable data-text={ placeholder } />
    </div>
  );
}

TextField.propTypes = {
  placeholder: PropTypes.string.isRequired,
};
