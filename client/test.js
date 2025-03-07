const isArray = (v) => Array.isArray(v);
const isObject = (v) => typeof v === "object" && !isArray(v) && v !== null;
const isPrimitive = (v) => !isArray(v) && !isObject(v);

/**
 * @param {Object|Array} valA
 * @param {Object|Array} valB
 * @returns Object|Array
 */
export default function deepMerge(valA, valB) {
  if (isArray(valA) && isArray(valB)) {
    const res = [];
    for (const item of valA) {
      res.push(item);
    }
    for (const item of valB) {
      res.push(item);
    }
    return res;
  }
  if (isObject(valA) && isObject(valB)) {
    const res = {};
    const allKeys = [...new Set([...Object.keys(valA), ...Object.keys(valB)])];
    for (const key of allKeys) {
      if (Object.hasOwn(valA, key) && !Object.hasOwn(valB, key)) {
        res[key] = valA[key];
      }
      if (!Object.hasOwn(valA, key) && Object.hasOwn(valB, key)) {
        res[key] = valB[key];
      }
      if (Object.hasOwn(valA, key) && Object.hasOwn(valB, key)) {
        res[key] = deepMerge(valA[key], valB[key]);
      }
    }
    return res;
  }
  return valB;
}

const res = deepMerge({ foo: 2, bar: 3 }, { qux: 4 });

console.log(res);
