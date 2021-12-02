/* eslint-disable no-unused-vars */
import React, { useState, useContext } from 'react';
import '../styles/selectColors.css';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { MyContext } from '../context/Provider';

const colors = [
  { color: '#7986cb', name: 'Lavender', id: 1 },
  { color: '#33b679', name: 'Sage', id: 2 },
  { color: '#8e24aa', name: 'Grape', id: 3 },
  { color: '#e67c73', name: 'Flamingo', id: 4 },
  { color: '#f6c026', name: 'Banana', id: 5 },
  { color: '#f5511d', name: 'Tangerine', id: 6 },
  { color: '#039be5', name: 'Peacock', id: 7 },
  { color: '#616161', name: 'Graphite', id: 8 },
  { color: '#3f51b5', name: 'Blueberry', id: 9 },
  { color: '#0b8043', name: 'Basil', id: 10 },
  { color: '#d60000', name: 'Tomato', id: 11 },
];

export default function BasicMenu() {
  const { colorId, setColorId } = useContext(MyContext);
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
        aria-haspopup="true"
        aria-expanded={ open ? 'true' : undefined }
        onClick={ handleClick }
      >
        <div className="color-picker" style={ { backgroundColor: colorId.color } } />
        Cor do Evento
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

// export default function SelectColors() {
//   return (
//     <section>
//       <Button type="button" className="color-picker-container">
//         <div className="color-picker" />
//       </Button>
//     </section>
//   );
// }
