export const getRandom = (min: number, max: number) => {
  const random = Math.floor(Math.random() * (max - min)) + min;

  return random;
};
