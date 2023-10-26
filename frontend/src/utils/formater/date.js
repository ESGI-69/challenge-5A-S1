/**
 * Format a date to a string with the format: dd/mm/yyyy
 * @param {String} date The date to be formatted
 * @returns {String}
 */
export const dayMonthYearNumber = (date) => {
  const newDate = new Date(date);
  return `${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()}`;
};
