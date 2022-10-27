import React from 'react'

import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const AppWrap = (Component, idName, classNames) => function HOC() {
  return (
    <>
      {idName === 'Login' ? null : <Header />}
      
      <div id={idName} className={`app__container ${classNames}`}>
        <div className="app__wrapper app__flex">
          <Component />
        </div>
      </div>

      <Footer />
    </>
  )
}

export default AppWrap;