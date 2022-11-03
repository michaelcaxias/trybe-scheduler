import React from 'react';
import { motion } from 'framer-motion';

/**
 * 
 * @param {React.Component} Componente [Obrigatório] - O componente que será envolvido
 * @param {string} ClassNames [Opcional] - Classes CSS que serão adicionadas ao componente, por padrão será 'app__flex'
 */
const MotionWrap = (Component, classNames) => function HOC() {
  return (
    <motion.div
      whileInView={{ y: [100,50,0], opacity: [0,0,1] }}
      transition={{ duration: 0.5 }}
      className={`${classNames} app__flex`}
    >
      <Component />
    </motion.div>
  );
};

export default MotionWrap;
