/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { Avatar } from '@mui/material';
import SelectTime from '../components/SelectTime';
import SelectColors from '../components/SelectColors';
import TextArea from '../components/TextArea';
import LoginButton from '../components/LoginButton';
import AddEventButton from '../components/AddEventButton';
import '../styles/Home.scss';
import logo from '../images/logo.svg';
import wavy from '../images/wavy.svg';
import { MyContext } from '../context/Provider';
import Loading from '../components/Loading';

export default function Home() {
  const { userImage, loading } = useContext(MyContext);
  const homePage = (
    <section className="home-page">
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
          <img
            draggable={ false }
            src={ logo }
            className="logo"
            alt="logo"
          />
        </section>
      </aside>
      <main className="main-content">
        <Avatar className="user-profile" alt="User Profile" src={ userImage } />
        <section className="schedule-content">
          <img
            draggable={ false }
            className="wavy"
            src={ wavy }
            alt="wavy"
          />
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
      </main>
    </section>
  );
  return loading ? <Loading /> : homePage;
}
