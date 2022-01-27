/* eslint-disable no-restricted-globals */
const filterTime = (string, regex) => string.match(regex);

const createDescription = (line, links) => {
  const linksSlido = links.filter((link) => link.includes('sli.do'));
  const linksForms = links.filter((link) => link.includes('typeform'));
  const optionalLine = /[[,(]\*[),\]]/.test(line) // regex para capturar (*) ou [*]
    ? '<b>Momento opcional.</b>\n'
    : '';
  const slido = /slido/i.test(line)
    ? `<b>Slido:</b> ${linksSlido.shift()}\n`
    : '';
  const forms = /forms/i.test(line)
    || /feedback/i.test(line)
    || /formulário/i.test(line)
    || /form/i.test(line)
    ? `<b>Forms:</b> ${linksForms.shift()}\n`
    : '';
  let moreInfo = line.includes('Desc.:')
    ? line.split('Desc.:')[1]
    : '';
  if (moreInfo !== '' && !moreInfo.includes('///')) {
    moreInfo = `<b>Informação:</b> ${moreInfo.replace(/\s\s+/g, ' ').trim()}`;
  }
  if (moreInfo.includes('///')) {
    moreInfo = `<b>Informações:</b>\n${moreInfo.split('///')
      .map((elem) => elem.replace(/\s\s+/g, ' ')
        .trim()).join('\n')}`;
  }

  return {
    optionalLine,
    slido,
    forms,
    moreInfo,
  };
};

export const filterString = (string, links) => {
  const regex = /(([0-1]\d|2[0-4])(h|:)([0-5]\d)?)/ig;
  const linksZoom = links.filter((link) => link.includes('zoom'));
  return string
    .split('\n')
    .filter((str) => str.match(regex))
    .map((line) => {
      const [startTime, endTime] = filterTime(line, regex)
        .map((hour) => hour.replace(/h(\d\d)?/i, (_, min) => (min ? `:${min}` : ':00')));
      let title = line.includes('Desc.:')
        ? line.split('Desc.:')[0]
        : line.replace(/-/g, '').trim();
      title = title.includes('///')
        ? title.split('///')[0]
        : title.replace(/\s\s+/g, ' ').trim();
      const location = /zoom/i.test(line)
        ? linksZoom.shift()
        : 'Remote';
      const {
        optionalLine,
        slido,
        forms,
        moreInfo } = createDescription(line, links);

      return {
        title,
        startTime,
        location,
        endTime: endTime || startTime,
        description: `${optionalLine}${slido}${forms}${moreInfo}`,
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
  { title, startTime, location, endTime, description }, date, color, minutes,
) => ({
  summary: title,
  location,
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
