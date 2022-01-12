import React from 'react';
import SelectTime from '../components/SelectTime';
import SelectColors from '../components/SelectColors';
import TextArea from '../components/TextArea';
import LoginButton from '../components/LoginButton';
import AddEventButton from '../components/AddEventButton';
import '../styles/home.scss';

export default function Home() {
  return (
    <main className="main-content">
      <LoginButton />
      <section className="textarea-container">
        <h1>Cole a agenda do dia abaixo</h1>
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
