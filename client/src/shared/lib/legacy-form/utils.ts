import { Field, Fields } from "./types.ts";

export const isArray = (val: unknown): val is Array<unknown> => Array.isArray(val);

export const isObject = (val: unknown): val is object => typeof val === "object" && val !== null && !isArray(val);

const isNumber = (str: string) => {
  return !isNaN(str) && !isNaN(parseFloat(str));
};

export const extractValuesFromFields = <TResult extends { [key: string]: unknown }>(fields: { [key: string]: Field<unknown> }): TResult => {
  const result: { [key: string]: any } = {};

  for (const path of Object.keys(fields)) {
    const pathParts = path.split(".");

    let cur = result;

    for (let i = 0; i < pathParts.length; i++) {
      const pathPart = pathParts[i];
      const nextPathPart = pathParts[i + 1];
      const hasNextPathPart = Boolean(nextPathPart);

      if (hasNextPathPart) {
        if (Object.keys(cur).includes(pathPart)) {
          cur = cur[pathPart];
        } else {
          if (isNumber(nextPathPart)) {
            cur[pathPart] = [];
            cur = cur[pathPart];
          } else {
            cur[pathPart] = {};
            cur = cur[pathPart];
          }
        }
        continue;
      }

      if (!hasNextPathPart) {
        cur[pathPart] = fields[path].value;
        continue;
      }
    }
  }

  return result as TResult;
};

// const schema = joi.object({
//   name: joi.string().required(),
//   ids: joi.array().items(joi.string().min(10)),
// });
//
// const { value, error } = schema.validate({ name: "Daler", ids: ["first", "second"] }, { abortEarly: false });
//
// console.log("value", value);
// console.log("error", error.details);

// console.log(
//   extractValuesFromFields({
//     "foo.users.2.city": {
//       value: "bukhara",
//     },
//     "foo.users.2.street": {
//       value: "hello street",
//     },
//     "foo.users.0": {
//       value: "daler",
//     },
//     "foo.users.3": {
//       value: "test user",
//     },
//     "foo.users.1": {
//       value: "aziz",
//     },
//     "foo.bar": {
//       value: 234,
//     },
//   }),
// );

export const initFieldsFromInitialValues = <TInitialValues extends { [key: string]: any }>(
  initialValues: TInitialValues,
  result: Fields = {},
  path?: string,
): Fields => {
  for (const key of Object.keys(initialValues)) {
    const value = initialValues[key];

    if (isObject(value) || isArray(value)) {
      // if (isArray(value)) {
      //   result[path + "." + key + "." + "-1"] = {
      //     value: null,
      //     validationErrors: [],
      //     additionalErrors: [],
      //     isTouched: false,
      //   };
      // }
      if (path) {
        initFieldsFromInitialValues(value, result, path + "." + key);
      } else {
        initFieldsFromInitialValues(value, result, key);
      }
    } else {
      if (path) {
        result[path + "." + key] = {
          value,
          validationErrors: [],
          additionalErrors: [],
          isTouched: false,
        };
      } else {
        result[key] = {
          value,
          validationErrors: [],
          additionalErrors: [],
          isTouched: false,
        };
      }
    }
  }

  return result;
};

export const initFields = (values, result = {}) => {
  // is primitive
  if (!isArray(values) && !isObject(values)) {
    return {
      value: values,
      validationErrors: [],
      additionalErrors: [],
      isTouched: false,
    };
  }

  for (const key of Object.keys(values)) {
    const value = values[key];

    if (isObject(value)) {
      result[key] = {};
      initFields(value, result[key]);
    } else if (isArray(value)) {
      result[key] = [];

      for (let i = 0; i < value.length; i++) {
        const el = value[i];

        if (isObject(el)) {
          result[key][i] = {};
          initFields(el, result[key][i]);
        } else if (isArray(el)) {
          result[key][i] = [];
          initFields(el, result[key][i]);
        } else {
          result[key].push({
            value: el,
            validationErrors: [],
            additionalErrors: [],
            isTouched: false,
          });
        }
      }
    } else {
      result[key] = {
        value,
        validationErrors: [],
        additionalErrors: [],
        isTouched: false,
      };
    }
  }

  return result;
};

export const extractValues = (fields, result) => {
  if (result === undefined) {
    if (isArray(fields)) {
      result = [];
    } else {
      result = {};
    }
  }

  if ("value" in fields) {
    return fields.value;
  }

  for (let key of Object.keys(fields)) {
    const value = fields[key];

    if (isArray(value)) {
      result[key] = [];

      for (let i = 0; i < value.length; i++) {
        const el = value[i];

        if ("value" in el) {
          result[key].push(el.value);
        } else {
          result[key][i] = {};
          extractValues(el, result[key][i]);
        }
      }
    } else if ("value" in value) {
      result[key] = value.value;
    } else {
      result[key] = {};
      extractValues(value, result[key]);
    }
  }

  return result;
};

export const fieldsUpdateValues = (fields, values) => {
  // is primitive
  if (!isObject(values) && !isArray(values)) {
    fields.value = values;

    return;
  }

  const keys = Object.keys(values);

  // remove all other fields
  if (isArray(values)) {
    for (let i = 0; i < fields.length - values.length; i++) {
      fields.pop();
    }
  }

  if (isObject(values)) {
    for (let fieldsProp of Object.keys(fields)) {
      if (!(fieldsProp in values)) {
        delete fields[fieldsProp];
      }
    }
  }

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const value = values[key];

    if (isObject(value)) {
      if (!(key in fields)) {
        fields[key] = {};
      }

      fieldsUpdateValues(fields[key], value);
    } else if (isArray(value)) {
    } else {
      if (key in fields) {
        fields[key].value = value;
      } else {
        fields[key] = {
          value,
          validationErrors: [],
          additionalErrors: [],
          isTouched: false,
        };
      }
    }
  }
};

export const fieldsClearErrors = (fields, { clearValidationErrors = true, clearAdditionalErrors = true } = {}) => {
  if ("value" in fields) {
    if (clearValidationErrors) {
      fields.validationErrors = [];
    }
    if (clearAdditionalErrors) {
      fields.additionalErrors = [];
    }

    return;
  }

  for (const value of Object.values(fields)) {
    fieldsClearErrors(value, { clearValidationErrors, clearAdditionalErrors });
  }
};

export const convertYupErrorPath = (path: string) => {
  return path
    .split(".")
    .reduce((accum, part) => {
      if (part.at(-1) === "]" && part.at(-2) === '"') {
        return [...accum, part.slice(0, -5), part.at(-3)];
      } else if (part.at(-1) === "]") {
        return [...accum, part.slice(0, -3), part.at(-2)];
      } else {
        return [...accum, part];
      }
    }, [])
    .join(".");
};

export const fieldsHasValidationErrors = (fields) => {
  if ("value" in fields) {
    return fields.validationErrors.length >= 1;
  }

  for (const value of Object.values(fields)) {
    if (fieldsHasValidationErrors(value)) {
      return true;
    }
  }

  return false;
};

// console.log(
//   fieldsHasValidationErrors({
//     name: {
//       value: "Daler",
//       validationErrors: ["first", "second"],
//     },
//   }),
// );

const fields = [
  {
    value: "first",
    validationErrors: ["some error"],
    additionalErrors: ["another error"],
    isTouched: true,
  },
  {
    value: "second",
    validationErrors: [],
    additionalErrors: [],
    isTouched: false,
  },
  {
    inner: {
      value: "third",
      validationErrors: ["foo", "bar"],
      additionalErrors: ["what"],
      isTouched: false,
    },
  },
];

// fieldsUpdateValues(fields, ["_first", "_second", { foo: "bar" }]);
//
// console.log("fields", fields);

// console.log(
//   extractValues({
//     foo: {
//       value: "Daler",
//       validationErrors: [],
//       additionalErrors: [],
//       isTouched: false,
//     },
//     hello: {
//       world: {
//         age: {
//           value: 20,
//           validationErrors: [],
//           additionalErrors: [],
//           isTouched: false,
//         },
//       },
//     },
//     items: [
//       {
//         address: {
//           city: {
//             value: "Nazir",
//             validationErrors: [],
//             additionalErrors: [],
//             isTouched: false,
//           },
//           viloyat: {
//             value: "Bar",
//             validationErrors: [],
//             additionalErrors: [],
//             isTouched: false,
//           },
//         },
//       },
//       {
//         value: "Zarina",
//         validationErrors: [],
//         additionalErrors: [],
//         isTouched: false,
//       },
//     ],
//   }),
// );

// console.log(
//   "init",
//   init({
//     name: "daler",
//     invitedUsers: 23,
//     address: {
//       city: "Bukhara",
//       age: 112,
//     },
//     items: [
//       "first",
//       {
//         foo: "bar",
//         bar: 20,
//       },
//       "third",
//     ],
//   }),
// );

// console.log(
//   initFieldsFromInitialValues({
//     foo: {
//       bar: ["daler", "aziz", "zarina"],
//     },
//   }),
// );
