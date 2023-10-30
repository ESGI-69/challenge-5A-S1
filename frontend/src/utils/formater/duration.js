/**
 * Convert a number to a duration string
 * @param {Number} number the duration in minutes to be formatted
 * @returns {String}
 */
export const numberToDuration = (number) => {
  const hours = Math.floor(number / 60);
  const minutes = number % 60;
  return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
};
