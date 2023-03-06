import React, { useContext } from 'react';
import { Avatar } from '@mui/material';
import { FiLogIn } from 'react-icons/fi';

import { MyContext } from '../../context/Provider';
import Menu from '../Menu/Menu';
import { images } from '../../constants';

import { useNavigate } from 'react-router';

import './Header.scss';

const Header = () => {
  const { userInfo, isSignedIn } = useContext(MyContext);
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div id="topo" className="app__header">
      <div
        className="app__flex login__logo-header"
        onClick={() => navigate('/')}
        tabIndex={0}
        role="link"
        aria-label="Voltar para página inicial"
      >
        <img src={images.logo} draggable={false} />
        <h1>Trybe Scheduler</h1>
      </div>

      <div className="app__flex login__user-info" tabIndex={0} role="button">
        {isSignedIn ? (
          <>
            <div className="app__flex login__user-logged" onClick={handleClickOpen}>
              <div className="app__flex login__user-info-google">
                <h4>{userInfo.name}</h4>
                <h5>{userInfo.email}</h5>
              </div>

              <Avatar
                alt="Usuário Google"
                src={userInfo.picture}
                style={{ pointerEvents: 'none' }}
              />
            </div>
          </>
        ) : (
          <div
            className="app__flex login__user-logout"
            onClick={() => navigate('/login')}
          >
            <h4>Entrar</h4>
            <FiLogIn className="icon" />
          </div>
        )}

        <Menu open={open} onClose={handleClose} />
      </div>
    </div>
  );
};

export default Header;
