const filterTime = (string, regex) => string.match(regex);

// Código comentado para evitar erros na build

// limpa o ctrl+v recebido na div editável
const cleanTextInput = () => {
  document.querySelectorAll('#divtexto img').forEach((img) => img.remove());
  [...text.children].forEach((element) => {
    if (element.style) { element.style = ''; }
  });
  const array = Array.from(text.children);
  array.forEach((element) => {
    if (element.className === 'c-mrkdwn__br') { element.innerText = '\n'; }
  });
};

text.addEventListener('keyup', cleanTextInput);

const separateLinksAndText = () => {
// array com todas as linhas corretamente separadas.
  const array = Array.from(text.children);
  const arrayStrings = array.map((item) => item.innerText).join(' ').split('\n');

  // array com os links do zoom.
  const links = [...document.links].map((l) => l.href);
  const linksZoom = links.filter((link) => link.includes('zoom'));

  // ** Retorna objeto com strings e links.
  return {
    string: arrayStrings,
    links: linksZoom,
  };
};

// const button = document.querySelector('button');
// button.addEventListener('click', separateLinksAndText);

// ** Precisa alterar a função para trabalhar com o objeto da função separateLinksAndText
export const filterString = (string) => {
  const regex = /(([0-1]\d|2[0-4])(h|:)([0-5]\d)?)/ig;
  return string
    .split('\n')
    .filter((str) => str.match(regex))
    .map((line) => {
      const [startTime, endTime] = filterTime(line, regex)
        .map((hour) => hour.replace(/h(\d\d)?/i, (_, min) => (min ? `:${min}` : ':00')));
      const title = line
        .replace(/-/g, '').trim();
      const optionalLine = line.includes('[*]') || line.includes('(*)');
      return {
        title,
        startTime,
        endTime: endTime || startTime,
        description: optionalLine ? 'Momento opcional' : '',
      };
    });
};

export const getCurrentDate = () => {
  const date = new Date();
  const fullYear = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${fullYear}-${month}-${day}`;
};

export const eventFormat = (
  { title, startTime, endTime, description }, date, color, minutes,
) => ({
  summary: title,
  location: 'Remoto',
  description,
  start: {
    dateTime: `${date}T${startTime}:00-03:00`,
    timeZone: 'America/Sao_Paulo',
  },
  end: {
    dateTime: `${date}T${endTime}:00-03:00`,
    timeZone: 'America/Sao_Paulo',
  },
  reminders: {
    useDefault: false,
    overrides: [
      { method: 'popup', minutes: Number(minutes) },
    ],
  },
  colorId: color,
});

export const delayLoop = (func, delay) => (param, i) => {
  setTimeout(() => {
    func(param);
  }, i * delay);
};
