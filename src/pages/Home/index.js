const regex = /([0-2][0-9]h[0-5][0-9])/;

export const filterString = (string) => string
  .split('\n')
  .filter((str) => str.match(regex))
  .map((line) => {
    const optionalLine = line.split('[*]');
    return optionalLine[1] ? `${optionalLine[1].trim()} (Opcional)` : optionalLine[0];
  })
  .map((line) => {
    const filterArray = line.split('às');
    const startTime = filterArray[0].replace('h', ':').trim();
    const endTime = filterArray[1].replace('h', ':').trim().split(' ')[0];
    const title = filterArray[1].replace('h', ':').replace(endTime, ' ')
      .replace(/-/g, '').trim();
    const optionalLine = line.includes('(Opcional)');
    return {
      title,
      startTime,
      endTime,
      description: optionalLine ? 'Momento Opcional' : '',
    };
  });

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
