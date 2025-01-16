export const isArray = (val: unknown): val is Array<unknown> => Array.isArray(val);

export const isObject = (val: unknown): val is object => typeof val === "object" && val !== null && !isArray(val);

export const isNumber = (str: string) => {
  return !isNaN(str) && !isNaN(parseFloat(str));
};

export const isPlainObject = (value: unknown) => {
  if (Object.prototype.toString.call(value) !== "[object Object]") {
    return false;
  }

  if (Object.getPrototypeOf(value) === null) {
    return true;
  }

  let proto = value;

  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }

  return Object.getPrototypeOf(value) === proto;
};
