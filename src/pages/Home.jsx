import React, { useContext } from 'react';
import { Avatar } from '@mui/material';
import { AiFillGithub } from 'react-icons/ai';
import { Link } from 'react-router-dom';

import SelectTime from '../components/SelectTime';
import SelectColors from '../components/SelectColors';
import TextArea from '../components/TextArea';
import LoginButton from '../components/LoginButton';
import AddEventButton from '../components/AddEventButton';
import { MyContext } from '../context/Provider';
import Loading from '../components/Loading';

import logo from '../images/logo.svg';
import wavy from '../images/wavy.svg';
import Menu from '../components/Menu';

export default function Home() {
  const { userImage, loading } = useContext(MyContext);
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
          <img draggable={ false } src={ logo } className="logo" alt="logo" />
        </section>
      </aside>
      <main className="main-content">
        <div className="nav-menu">
          <Menu />
          <Avatar className="user-profile" alt="User Profile" src={ userImage } />
        </div>
        <section className="schedule-content">
          <img draggable={ false } className="wavy" src={ wavy } alt="wavy" />
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
  return loading ? <Loading /> : homePage;
}
