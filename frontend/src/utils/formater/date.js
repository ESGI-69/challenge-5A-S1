/**
 * Format a date to a string with the format: dd/mm/yyyy
 * @param {String} date The date to be formatted
 * @returns {String}
 */
export const dayMonthYearNumber = (date) => {
  const newDate = new Date(date);
  const day = String(newDate.getDate()).padStart(2, '0');
  const month = String(newDate.getMonth() + 1).padStart(2, '0');
  const year = newDate.getFullYear();
  return `${day}/${month}/${year}`;
};

export const time = (date) => {
  const newDate = new Date(date);
  return `${newDate.getHours()}:${newDate.getMinutes()}`;
};

export const dateTime = (date) => `${dayMonthYearNumber(date)} ${time(date)}`;

export const dateTimeFull = (date) => {
  const newDate = new Date(date);
  const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    hour: 'numeric',
    minute: 'numeric',
  };

  return newDate.toLocaleString('fr-FR', options).replace(',', '');
};
