import PropTypes from 'prop-types';
import React, { useContext } from 'react';

import MenuItem from '@mui/material/MenuItem';
import { MyContext } from '../../context/Provider';

export default function MenuAPIItem({ step }) {
  const { setServiceId } = useContext(MyContext);

  const handleClick = () => {
    setServiceId(step);
    window.location.reload();
  };

  return (
    <MenuItem onClick={ handleClick } className="api__selector">
      {`Google API ${step}`}
    </MenuItem>
  );
}

MenuAPIItem.propTypes = {
  step: PropTypes.number.isRequired,
};
