import React from 'react';

/**
 * 
 * Envelopa o componente passado para ter classes padrões e um header e um footer
 * @param {React.Component} Componente [Obrigatório] - O componente que será envolvido
 * @param {React.Component} Header [Opcional] - O componente que será usado como header
 * @param {React.Component} Footer [Opcional] - O componente que será usado como footer
 * @param {string} title [Opcional] - O título da seção ou página que será colocado como ID CSS
 * @param {string} ClassNames [Opcional] - Classes CSS que serão adicionadas ao componente, por padrão serão 'app__wrapper app__flex'
 */
const AppWrap = (Component, Header, Footer, idName, classNames) => function HOC() {
  return (
    <>
      {Header && <Header />}
      
      <div id={idName} className="app__container">
        <div className={classNames ? classNames : 'app__wrapper app__flex'}>
          <Component />
        </div>
      </div>

      {Footer && <Footer />}
    </>
  );
};

export default AppWrap;
