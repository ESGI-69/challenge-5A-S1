/**
 * Format a value to a note
 * @param {Number} value Value to be formatted
 * @param {Number} [digitQuantity=1] The number of digits after the comma
 * @returns {String} Formatted value
 */
export const addDigit = (value, digitQuantity = 1) => Number(value).toFixed(digitQuantity).toString().replace('.', ',');
