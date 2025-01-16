const isString = (val: unknown): val is string => typeof val === "string";

const isArray = (val: unknown): val is Array<unknown> => Array.isArray(val);

const isObject = (val: unknown): val is object => typeof val === "object" && !isArray(val) && val !== null;

const getArrayResult = (...args: unknown[]) => {
  const result: string[] = [];

  for (const el of args) {
    if (isString(el)) {
      result.push(el);
    }
    if (isArray(el)) {
      result.push(...getArrayResult(...el));
    }
    if (isObject(el)) {
      Object.entries(el).forEach(([key, value]) => {
        if (value) {
          result.push(key);
        }
      });
    }
  }

  return result;
};

const classnames = (...args: unknown[]): string => {
  return getArrayResult(...args).join(" ");
};

export default classnames;
