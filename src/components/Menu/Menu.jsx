import React, { useContext } from 'react'
import PropTypes from 'prop-types';
import { gapi } from 'gapi-script';
import { CgLogOut } from 'react-icons/cg';
import { useNavigate } from "react-router-dom";

import { 
  Dialog,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  List,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from '@mui/material'

import { MyContext } from '../../context/Provider';

import './Menu.scss';

const Menu = (props) => {
  const { changeSignedInState, serviceId } = useContext(MyContext);
  const { open, onClose } = props;
  const navigate = useNavigate();

  const handleClose = () => {
    onClose();
  }

  const handleLogout = () => {
    gapi.auth2.getAuthInstance().signOut();
    changeSignedInState(false);

    onClose();
    navigate('/');
  };

  return (
    <Dialog className="app__menu" onClose={handleClose} open={open}>
      <DialogTitle sx={{ paddingBottom: "0px" }}>Menu de Configuração</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ color: "#e4e4e4", fontSize: "14px" }}>
          Usando a API {serviceId} do Google.
        </DialogContentText>
      </DialogContent>
      <List sx={{ pt: 0 }}>
        <ListItem autoFocus button onClick={() => handleLogout()}>
          <ListItemAvatar>
            <Avatar className='' sx={{ bgcolor: "#ef6b50" }}>
              <CgLogOut />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Sair da conta" />
        </ListItem>
      </List>
    </Dialog>
  );
}

Menu.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default Menu;