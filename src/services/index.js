const filterTime = (string, regex) => string.match(regex);

const createDescription = (line, links) => {
  const linksSlido = links.filter((link) => link.includes('sli.do'));
  const linksForms = links.filter((link) => link.includes('typeform'));
  const catchSeparatorRegex = /(Desc\.:|\s*\/\/\/\s*)/i;
  const optionalLine = /[[,(]\*[),\]]/.test(line) // regex para capturar (*) ou [*]
    ? '<b>Momento opcional.</b>\n'
    : '';
  const slido = /slido/i.test(line)
    ? `<a href=${linksSlido.shift()}>Link Slido</a>\n`
    : '';
  const forms = /forms?|feedback|formulário/i.test(line)
    ? `<a href=${linksForms.shift()}>Link Forms</a>\n`
    : '';
  let moreInfo = catchSeparatorRegex.test(line)
    ? line.split(catchSeparatorRegex)
      .filter((str, i) => i > 0 && !catchSeparatorRegex.test(str))
      .join('\n')
    : '';
  if (moreInfo) {
    moreInfo = `<b>Informações:</b>\n${moreInfo.replace(/\s{2,}/, ' ').trim()}`;
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
