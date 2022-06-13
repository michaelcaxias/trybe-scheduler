import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function NavMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
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
      id="fade-button"
      className="mui-menu"
      aria-controls={ open ? 'basic-menu' : undefined }
      aria-haspopup="true"
      aria-expanded={ open ? 'true' : undefined }
      onClick={ handleClick }
    >
      {generateSquares()}
      <Menu
        id="basic-menu"
        anchorEl={ anchorEl }
        open={ open }
        onClose={ handleClose }
        MenuListProps={ {
          'aria-labelledby': 'basic-button',
        } }
      >
        <MenuItem onClick={ handleClose }>Profile</MenuItem>
        <MenuItem onClick={ handleClose }>My account</MenuItem>
        <MenuItem onClick={ handleClose }>Logout</MenuItem>
      </Menu>
    </Button>
  );
}
