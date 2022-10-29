import React from 'react'
import { AiFillGithub } from 'react-icons/ai';
import { Link } from 'react-router-dom';

import './Footer.scss'

const Footer = () => {
  return (
    <div className="app__footer">
      <p>Desenvolvido em React, com ❤️ por <a href="https://github.com/michaelcaxias/trybe-scheduler/graphs/contributors">Todos os Colaboradores</a>.</p>

      <div className="app__footer-links">
        <nav className="privacy-and-terms">
          <Link to="/privacy-policy">Políticas de Privacidade</Link>
          <Link to="/terms-and-conditions">Termos de Uso</Link>
        </nav>

        <a
          href="https://github.com/michaelcaxias/trybe-scheduler"
          target="_blank"
          rel="noreferrer"
          className="app__flex"
        >
          <AiFillGithub className="icon" />
        </a>
      </div>
    </div>
  )
}

export default Footer
