import { useSearchParams } from "react-router-dom";

const useCustomSearchParam = <T>(key: string, defaultValue: T, { transform }: { transform?: (arg: string) => T } = {}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const state = () => {
    let value: any = searchParams.get(key);

    if (value) {
      if (transform) {
        value = transform(value);
      }
    } else {
      value = defaultValue;
    }

    return value as T;
  };

  const setState = (to: T) => {
    setSearchParams({
      ...Object.fromEntries(searchParams),
      [key]: to,
    });
  };

  return [state(), setState];
};

export default useCustomSearchParam;
