import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuAPIItem from '../MenuAPIItem/MenuAPIItem';
import { TbApi } from 'react-icons/tb'

import './APISelector.scss';

export default function APISelector() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    if (!event.target.className.includes('invisible')) {
      setAnchorEl(event.currentTarget);
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const generateSquares = () => {
    const squares = [];
    const min = 1;
    const max = 9;
    for (let index = min; index <= max; index += min) {
      squares.push(<div key={ index } className="square" />);
    }
    return squares;
  };

  return (
    <Button
      className="mui-menu"
      aria-controls={ open ? 'basic-menu' : undefined }
      aria-haspopup="true"
      aria-expanded={ open ? 'true' : undefined }
      onClick={ handleClick }
    >
      <TbApi size={30} pointerEvents={'none'} />
      <Menu
        anchorEl={ anchorEl }
        open={ open }
        onClose={ handleClose }
        anchorOrigin={ {
          vertical: 'bottom',
          horizontal: 'left',
        } }
        transformOrigin={ {
          vertical: 'bottom',
          horizontal: 'left',
        } }
        MenuListProps={ {
          'aria-labelledby': 'basic-button',
        } }
      >
        <MenuAPIItem step={ 1 } />
        <MenuAPIItem step={ 2 } />
      </Menu>
    </Button>
  );
}
