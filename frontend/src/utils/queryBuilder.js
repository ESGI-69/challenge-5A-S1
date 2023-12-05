/**
 * @param {object} queries
 */
export default (queries) => Object.keys(queries).reduce((acc, queryKey, index) => {
  const queryValue = queries[queryKey];
  const isLastQuery = index === Object.keys(queries).length - 1;
  return `${acc}${queryKey}=${queryValue}${isLastQuery ? '' : '&'}`;
}, '?');
