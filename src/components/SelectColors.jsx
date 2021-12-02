import React from 'react';
import '../styles/selectColors.css';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (id) => {
    setAnchorEl(null);
    console.log(id);
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
        <div className="color-picker" />
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
        <MenuItem
          id="1"
          onClick={ ({ target: { id } }) => handleClose(id) }
        >
          Profile

        </MenuItem>
        <MenuItem onClick={ handleClose }>My account</MenuItem>
        <MenuItem onClick={ handleClose }>Logout</MenuItem>
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
