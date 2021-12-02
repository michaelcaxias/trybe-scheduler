import React from 'react';
import SelectTime from '../components/SelectTime';
import SelectColors from '../components/SelectColors';
import TextArea from '../components/TextArea';
import LoginButton from '../components/LoginButton';
import AddEventButton from '../components/AddEventButton';
import '../styles/home.css';

export default function Home() {
  return (
    <main>
      <LoginButton />
      <TextArea />
      <section className="input-group">
        <SelectTime />
        <SelectColors />
      </section>
      <AddEventButton />
    </main>
  );
}
