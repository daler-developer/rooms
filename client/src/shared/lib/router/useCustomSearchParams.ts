import { useSearchParams } from "react-router-dom";

const useCustomSearchParams = <T extends Record<string, { default: unknown; transform: (arg: unknown) => unknown }>>(object: T) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const values = () => {
    const obj: { [key: string]: T[typeof key]["default"] } = {};

    searchParams.forEach((value, key) => {
      obj[key] = value;
    });

    const result = {};

    Object.entries(object).forEach(([key, options]) => {
      let value: unknown = searchParams.get(key);

      if (options.transform) {
        value = options.transform(value);
      }

      if (!value && "default" in options) {
        value = options.default;
      }

      result[key] = value;
    });

    return result;
  };

  const setValues = (params) => {
    const result = {
      ...searchParams,
    };

    Object.entries(params).forEach(([key, value]) => {
      if (value === null || value === "" || value === undefined) {
        return;
      }

      result[key] = String(value);
    });

    setSearchParams(result);
  };

  return [values(), setValues];
};

export default useCustomSearchParams;
