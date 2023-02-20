import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { CgLogOut } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';

import { 
  Dialog,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  List,
  DialogTitle
} from '@mui/material';

import { MyContext } from '../../context/Provider';

import './Menu.scss';

const Menu = (props) => {
  const { changeSignedInState } = useContext(MyContext);
  const { open, onClose } = props;
  const navigate = useNavigate();

  const handleClose = () => {
    onClose();
  };

  const handleLogout = () => {
    googleLogout();
    changeSignedInState(false);

    onClose();
    navigate('/');
  };

  return (
    <Dialog className="app__menu" onClose={handleClose} open={open}>
      <DialogTitle sx={{ paddingBottom: '0px' }}>Menu de Configuração</DialogTitle>
      <List sx={{ pt: 0 }}>
        <ListItem autoFocus button onClick={() => handleLogout()}>
          <ListItemAvatar>
            <Avatar className="" sx={{ bgcolor: '#ef6b50' }}>
              <CgLogOut />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Sair da conta" />
        </ListItem>
      </List>
    </Dialog>
  );
};

Menu.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default Menu;
