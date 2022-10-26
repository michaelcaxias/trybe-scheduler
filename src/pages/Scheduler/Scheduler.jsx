import React, { useContext } from 'react';
import { Avatar } from '@mui/material';
import { AiFillGithub } from 'react-icons/ai';
import { Link } from 'react-router-dom';

import SelectTime from '../../components/SelectTime/SelectTime';
import SelectColors from '../../components/SelectColors/SelectColors';
import TextArea from '../../components/TextArea/TextArea';
import LoginButton from '../../components/LoginButton/LoginButton';
import AddEventButton from '../../components/AddEventButton/AddEventButton';
import { MyContext } from '../../context/Provider';
import { AppWrap, MotionWrap } from '../../wrapper';

import { images } from '../../constants'
import NavMenu from '../../components/NavMenu/NavMenu';

import './Scheduler.scss';

const Scheduler = () => {
  const { userImage, serviceId } = useContext(MyContext);
  const homePage = (
    <section className="home-page">
      <a
        href="https://github.com/michaelcaxias/trybe-schedule"
        target="_blank"
        rel="noreferrer"
      >
        <AiFillGithub className="github-icon" />
      </a>
      <aside className="aside-content">
        <section>
          <h1>
            Precisando receber lembretes
            <br />
            dos horários do
            <br />
            dia?
            <br />
            <span>Trybe Schedule</span>
            <br />
            é a solução!
          </h1>
          <img draggable={ false } src={ images.logo } className="logo" alt="logo" />
        </section>
      </aside>
      <main className="main-content">
        <div className="nav-menu">
          <p>{`API ${serviceId}`}</p>
          <NavMenu />
          <Avatar className="user-profile" alt="User Profile" src={ userImage } />
        </div>
        <section className="schedule-content">
          <img draggable={ false } className="wavy" src={ images.wavy } alt="wavy" />
          <h1>Agende seus Horários</h1>
          <LoginButton />
          <section className="textarea-container">
            <TextArea />
          </section>
          <section className="input-group">
            <SelectTime />
            <SelectColors />
          </section>
          <AddEventButton />
        </section>
        <nav className="privacy-and-terms">
          <Link to="/privacy-policy">Políticas de Privacidade</Link>
          <Link to="/terms-and-conditions">Termos de Uso</Link>
        </nav>
      </main>
    </section>
  );
  return homePage;
}

export default AppWrap(MotionWrap(Scheduler, 'app__scheduler'), 'scheduler', '');