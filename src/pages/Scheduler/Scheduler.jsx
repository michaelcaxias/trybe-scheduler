import React from 'react';

import SelectTime from '../../components/SelectTime/SelectTime';
import SelectColors from '../../components/SelectColors/SelectColors';
import TextArea from '../../components/TextArea/TextArea';
import AddEventButton from '../../components/AddEventButton/AddEventButton';
import { AppWrap, MotionWrap } from '../../wrapper';

import './Scheduler.scss';

const Scheduler = () => {
  const homePage = (
    <section className='home-page'>
      <aside className="aside-content">
        <TextArea />
      </aside>

      <main className="schedule-content">
        <div>
          <h1>Agende seus Horários</h1>

          <div className='schedule-configs'>
            <h5>Notificação:</h5>
            <section className="input-group">
              <SelectTime />
              <SelectColors />
            </section>
            <h4>Em breve mais configurações...</h4>
          </div>
        </div>

        <AddEventButton />
      </main>
    </section>
  );
  return homePage;
}

export default AppWrap(MotionWrap(Scheduler, 'app__scheduler'), 'scheduler', 'app__scheduler');