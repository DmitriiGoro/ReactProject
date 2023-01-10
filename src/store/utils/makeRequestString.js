export const makeRequestString = (obj) => {
  return Object.entries(obj)
    .map(([query, value], index) => {
      return index === 0 ? `${query}=${value}` : `&${query}=${value}`;
    })
    .join("");
};
