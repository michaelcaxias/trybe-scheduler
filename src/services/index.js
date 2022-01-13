const filterTime = (string, regex) => string.match(regex);

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
