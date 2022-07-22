export const getRandomColor = () => {
  const num = Math.round(0xffffff * Math.random());

  const color = num.toString(16).padStart(6, '0');

  return `#${color}`;
};
