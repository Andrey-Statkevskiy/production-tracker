export const getColor = (value) => {
  const r = Math.round(255 * (1 - value / 100));
  const g = Math.round(255 * (value / 100));
  return `rgb(${r}, ${g}, 0)`;
};