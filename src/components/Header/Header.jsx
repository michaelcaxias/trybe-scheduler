import React, { useContext } from 'react'
import { Avatar } from '@mui/material';

import { MyContext } from '../../context/Provider';
import Menu from '../Menu/Menu';
import { images } from '../../constants'

import './Header.scss'

const Header = () => {
  const { userImage, userName, userEmail } = useContext(MyContext);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div id="topo" className="app__header">
      <div className="app__flex login__logo-header">
        <img src={images.logo}/>
        <h1>Trybe Schedule</h1>
      </div>

      <div className="app__flex login__user-info">
        <div className="app__flex login__user-info-google" onClick={handleClickOpen}>
          <h4>{userName}</h4>
          <h5>{userEmail}</h5>
        </div>

        <Menu 
          open={open}
          onClose={handleClose}
        />

        <Avatar alt="User Image" src={userImage} onClick={handleClickOpen}/>
      </div>
    </div>
  )
}

export default Header;