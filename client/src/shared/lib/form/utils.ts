import { NestedPaths } from "./types";

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

export const pathIsEmpty = (path: NestedPaths<any>): boolean => {
  return path === "";
};

export const pathSlice = <TValues extends { [key: string | number]: any }>(path: NestedPaths<TValues>, index: number) => {
  const list = path.split(".");

  return [list.slice(0, index).join("."), list.slice(index).join(".")];
};

export const convertYupPath = (yupPath: string) => {
  const parts = [];

  for (const part of yupPath.split(".")) {
    const isIndexEl = part.includes("[") && part.includes("]");

    if (isIndexEl) {
      parts.push(part.slice(0, part.indexOf("[")));
      parts.push(part.slice(part.indexOf("[") + 1, part.indexOf("]")));
    } else {
      parts.push(part);
    }
  }

  return parts.join(".");
};
