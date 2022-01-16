import React from 'react';
import SelectTime from '../components/SelectTime';
import SelectColors from '../components/SelectColors';
import TextArea from '../components/TextArea';
import LoginButton from '../components/LoginButton';
import AddEventButton from '../components/AddEventButton';
import '../styles/Home.scss';

export default function Home() {
  return (
    <main className="main-content">
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
    </main>
  );
}
