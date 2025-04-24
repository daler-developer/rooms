import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";

const useCustomSearchParam = <TValue, TDefault = undefined>(key: string, transformer: (value: string) => TValue, defaultValue?: TDefault) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const value = useMemo(() => {
    if (!searchParams.has(key)) {
      return defaultValue;
    }
    return transformer(searchParams.get(key)!);
  }, [key, searchParams, transformer, defaultValue]);

  const set = (val: TValue) => {
    searchParams.set(key, String(val));
    setSearchParams(searchParams);
  };

  const remove = () => {
    searchParams.delete(key);
    setSearchParams(searchParams);
  };

  return {
    value,
    set,
    remove,
  };
};

export default useCustomSearchParam;
