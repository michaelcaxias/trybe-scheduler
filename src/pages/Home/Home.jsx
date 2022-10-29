import React from 'react';
import { Button } from '@mui/material';
import { FiLogIn } from 'react-icons/fi';
import { motion } from 'framer-motion';

import { useNavigate } from 'react-router-dom';
import { AppWrap, MotionWrap } from '../../wrapper';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Images from '../../constants/images'

import './Home.scss'

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="app__home">
      <motion.div 
        whileInView={{ y: [100,50,0], opacity: [0,0,1] }}
        transition={{ duration: 0.5 }}
        className="app__flex app__home-intro"
      >
        <h1>Da sua agenda do Slack para o Google Calendar em um único clique!</h1>
        <h2>Trybe Scheduler é o que você precisa para não perder seus momentos sincronos.</h2>
        <Button endIcon={<FiLogIn className="icon" />} variant="contained" onClick={() => navigate('/login')}>Experimente Agora</Button>
      </motion.div>

      <div className="app__flex app__home-laptop">
        <motion.img 
        whileInView={{ opacity: [0,0,1] }}
        transition={{ duration: 0.5, delay: 0.5 }}
        src={Images.glow} alt="Glow" className="app__home-laptop-glow" />
        <motion.img 
          whileInView={{ y: [100,50,0], opacity: [0,0,1] }}
          transition={{ duration: 0.5 }}
          src={Images.laptop} alt="laptop" className='app__home-laptop-mockup' />
      </div>

      <motion.div
        whileInView={{ y: [100,50,0], opacity: [0,0,1] }}
        transition={{ duration: 0.5 }}
        className="app__flex app__home-feature-1"
      >
        <motion.div 
          whileInView={{ x: [-100,-50,0], opacity: [0,0,1] }}
          transition={{ duration: 0.5 }}
          className="feature-left"
        >
          <h3>Com a facilidade de um único copia e cola 😻 </h3>
          <p>
            Após colar a sua agenda do dia disponibilizada pelo Slack, o nosso sistema
            vai automáticamente detectar os horários e os links do Zoom e vai adicionar
            um por um no seu Google Calendar, na conta Google que você estiver logado.
          </p>
        </motion.div>
        <motion.div
          whileInView={{ x: [100,50,0], opacity: [0,0,1] }}
          transition={{ duration: 0.5 }}
          className="feature-right"
         >
          <img src={Images.f1} alt="feature1" className="feature-image-1" />
          <img src={Images.f2} alt="feature2" className="feature-image-2" />
        </motion.div>
      </motion.div>

      <motion.div
        whileInView={{ y: [100,50,0], opacity: [0,0,1] }}
        transition={{ duration: 0.5 }}
        className="app__flex app__home-feature-2"
      >
        <motion.div
          whileInView={{ x: [-100,-50,0], opacity: [0,0,1] }}
          transition={{ duration: 0.5 }}
          className="feature-left"
        >
          <h3>Precisamos de acesso ao Google Agenda 🤔</h3>
          <p>
            Por padrão, acessar o Google Agenda é algo sensível, já que é uma informação
            privada de cada usuário, mas não se preocupe, nossa aplicação de código aberto
            somente faz a escrita de novos eventos, não capturamos nem salvamos nada.
          </p>
        </motion.div>
        <motion.div 
          whileInView={{ x: [100,50,0], opacity: [0,0,1] }}
          transition={{ duration: 0.5 }}
          className="feature-right"
        >
          <img src={Images.cpu} alt="feature3" className="feature-image-3" />
        </motion.div>
      </motion.div>

      <motion.div
        whileInView={{ y: [100,50,0], opacity: [0,0,1] }}
        transition={{ duration: 0.5 }}
        className="app__flex background-button"
      >
        <Button endIcon={<FiLogIn className="icon" />} variant="contained" onClick={() => navigate('/login')}>Experimente Agora</Button>
      </motion.div>
    </div>
  );
};

export default AppWrap(MotionWrap(Home, ''), Header, Footer, 'Home', 'home__wrapper home__flex');
