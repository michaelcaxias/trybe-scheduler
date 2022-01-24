import PropTypes from 'prop-types';
import React from 'react';
import '../styles/TextField.scss';

export default function TextField({
  placeholder,
  refElement,
  label,
  disabled,
  handleTextAreaValue,
  handleLinks,
  value,
}) {
  const getElementValue = () => {
    const refText = refElement ? refElement.current.innerText : '';
    handleTextAreaValue(refText.trim());
    const getLinks = Array(...document.links).map((link) => link.href);
    handleLinks(getLinks);
    document.querySelectorAll('[contenteditable] .c-emoji')
      .forEach((emoji) => emoji.remove());
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
  handleTextAreaValue: PropTypes.func.isRequired,
  handleLinks: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
