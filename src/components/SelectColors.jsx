import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import { MyContext } from '../context/Provider';

const colors = [
  { color: '#7986cb', name: 'Lavanda', id: '1' },
  { color: '#33b679', name: 'Sálvia', id: '2' },
  { color: '#8e24aa', name: 'Uva', id: '3' },
  { color: '#e67c73', name: 'Flamingo', id: '4' },
  { color: '#f6c026', name: 'Banana', id: '5' },
  { color: '#f5511d', name: 'Tangerina', id: '6' },
  { color: '#039be5', name: 'Pavão', id: '7' },
  { color: '#616161', name: 'Grafite', id: '8' },
  { color: '#3f51b5', name: 'Mírtilo', id: '9' },
  { color: '#0b8043', name: 'Manjericão', id: '10' },
  { color: '#d60000', name: 'Tomate', id: '11' },
];

export default function BasicMenu() {
  const { colorId, setColorId, isSignedIn } = useContext(MyContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (currentColor) => {
    setAnchorEl(null);
    setColorId(currentColor);
  };

  return (
    <div>
      <Button
        className="color-picker-button"
        aria-controls="basic-menu"
        disabled={ !isSignedIn }
        variant="outlined"
        color="secondary"
        size="large"
        aria-haspopup="true"
        aria-expanded={ open ? 'true' : undefined }
        onClick={ handleClick }
      >
        <div className="color-picker" style={ { backgroundColor: colorId.color } } />
        {open ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={ anchorEl }
        open={ open }
        onClose={ handleClose }
        MenuListProps={ {
          'aria-labelledby': 'basic-button',
        } }
      >
        { colors.map(({ name, id, color }) => (
          <MenuItem
            key={ name }
            id={ id }
            className="color-picker-menu-item"
            style={ { color } }
            onClick={ () => handleClose({ name, id, color }) }
          >
            <div className="color-picker" style={ { backgroundColor: color } } />
            {name}

          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
