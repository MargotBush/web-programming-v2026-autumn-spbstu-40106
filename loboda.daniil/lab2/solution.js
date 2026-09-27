function getWordForm(value, forms) {
  const lastTwoDigits = value % 100;
  const lastDigit = value % 10;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return forms[2];
  }

  if (lastDigit === 1) {
    return forms[0];
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return forms[1];
  }

  return forms[2];
}

export function timeAgo(date) {
  const difference = Date.now() - date.getTime();
  const minutes = Math.floor(difference / 60000);

  if (minutes < 60) {
    const word = getWordForm(minutes, ['минута', 'минуты', 'минут']);
    return `${minutes} ${word} назад`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    const word = getWordForm(hours, ['час', 'часа', 'часов']);
    return `${hours} ${word} назад`;
  }

  const days = Math.floor(hours / 24);
  const word = getWordForm(days, ['день', 'дня', 'дней']);

  return `${days} ${word} назад`;
}
