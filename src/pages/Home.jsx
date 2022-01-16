import React from 'react';
import SelectTime from '../components/SelectTime';
import SelectColors from '../components/SelectColors';
import TextArea from '../components/TextArea';
import LoginButton from '../components/LoginButton';
import AddEventButton from '../components/AddEventButton';
import '../styles/Home.scss';
import logo from '../images/logo.svg';
import wavy from '../images/wavy.svg';

export default function Home() {
  return (
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
          <img
            draggable={ false }
            className="wavy"
            src={ wavy }
            alt="wavy"
          />
        </section>
      </aside>
      <main className="main-content">
        <section className="schedule-content">
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
}
