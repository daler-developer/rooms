export const getRandomNumber = (from: number, to: number) => {
  if (from > to) {
    throw new Error('"from" parameter should be less than or equal to "to" parameter');
  }
  return Math.floor(Math.random() * (to - from + 1)) + from;
};

export const arrayGetRandomElement = <T>(array: Array<T>): T => {
  const from = 0;
  const to = array.length - 1;

  return array[getRandomNumber(from, to)];
};
