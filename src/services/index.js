const filterTime = (string) => string.split(' ').filter((str) => (
  str.match(/([0-2][0-9]h[0-5][0-9])/) || str.match(/([0-2][0-9]h)/)))
  .map((str) => {
    if (str.match(/([0-2][0-9]h[0-5][0-9])/)) {
      return str;
    }
    return `${str}00`;
  });

export const filterString = (string) => {
  const regex = /([0-2][0-9]h[0-5][0-9])/;
  return string
    .split('\n')
    .filter((str) => str.match(regex))
    .map((line) => {
      const startTime = filterTime(line)[0].replace('h', ':').trim();
      const endTime = filterTime(line)[1].replace('h', ':').trim();
      const title = line
        .replace(/-/g, '').trim();
      const optionalLine = line.includes('[*]') || line.includes('(*)');
      return {
        title,
        startTime,
        endTime,
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
