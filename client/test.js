const isArray = (v) => Array.isArray(v);

const isObject = (v) => typeof v === "object" && !isArray(v) && v !== null;

const isPrimitive = (v) => !isArray(v) && !isObject(v);

export default function squashObject(obj, res = {}, path = []) {
  if (isObject(obj)) {
    for (const prop of Object.keys(obj)) {
      const pathCopy = [...path];
      if (prop) {
        pathCopy.push(prop);
      }
      const value = obj[prop];
      if (isPrimitive(value)) {
        res[pathCopy.join(".")] = value;
      } else {
        squashObject(value, res, pathCopy);
      }
    }
  }
  if (isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      const pathCopy = [...path];
      const value = obj[i];
      pathCopy.push(String(i));
      if (isPrimitive(value)) {
        res[pathCopy.join(".")] = value;
      } else {
        squashObject(value, res, pathCopy);
      }
    }
  }

  return res;
}

console.log(
  squashObject({
    foo: {
      "": { "": 1, bar: 2 },
    },
  }),
);
