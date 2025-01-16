export const isArray = (val: unknown): val is Array<unknown> => Array.isArray(val);

export const isObject = (val: unknown): val is object => typeof val === "object" && val !== null && !isArray(val);

export const isNumber = (str: string) => {
  return !isNaN(str) && !isNaN(parseFloat(str));
};
