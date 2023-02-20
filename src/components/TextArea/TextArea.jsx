import React, { useContext } from 'react';
import { MyContext } from '../../context/Provider';

import './TextArea.scss';

const placeholder = `
[*] 13h00 às 13h50 - Mentoria
14h00 às 14h45 - Abertura
14h45 às 16h20 - Conteúdo
16h20 às 18h00 - Aula ao Vivo 
[*] 18h40 às 19h30 - Mentorias técnicas
19h30 às 19h40 - Feedback
19h40 às 20h00 - Fechamento
`;

export default function TextArea() {
  const {
    isSignedIn,
    scheduleElementRef,
    changeScheduleValue,
    scheduleValue,
    setLinks,
  } = useContext(MyContext);

  const getElementValue = () => {
    try {
      const refText = scheduleElementRef ? scheduleElementRef.current.children : '';
      const hasNodeAsChild = refText.length > 0;

      if (hasNodeAsChild) {
        scheduleValueWhenIsNodeElement(refText);
      } else {
        const pureText = scheduleElementRef.current.innerText;
        scheduleValueWhenIsString(pureText);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const scheduleValueWhenIsNodeElement = (value) => {
    const array = Array.from(value);
    array.forEach((elem) => {
      if (elem.nodeName === 'BR' && elem.previousSibling.className === 'c-link') {
        elem.outerHTML = '<p>Desc.:</p>';
      }
    });
    array.forEach((elem) => {
      if (elem.nodeName === 'BR' && elem.parentNode) {
        elem.outerHTML = '<span> /// </span>';
      }
    });
    array.forEach((element) => {
      if (element.className === 'c-mrkdwn__br') { element.innerText = '\n'; }
    });
    const arrayStrings = array.map((item) => item.innerText).join(' ').trim();
    changeScheduleValue(arrayStrings);
    const getLinks = Array(...document.links).map((link) => link.href);
    setLinks(getLinks);
  };

  const scheduleValueWhenIsString = (value) => {
    changeScheduleValue(value);
  };

  return (
    <div className="text-field">
      <div
        className={ scheduleValue.length ? 'label-text focus' : 'label-text' }
      >
        Agenda do Dia

      </div>
      <div
        ref={ scheduleElementRef }
        contentEditable
        data-text={ placeholder }
        disabled={ !isSignedIn }
        onKeyUp={ getElementValue }
        role="textbox"
        tabIndex="0"
        aria-label="Agenda do Dia"
      />
    </div>
  );
}
