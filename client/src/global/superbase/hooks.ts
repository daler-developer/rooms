import { useState } from "react";
import SupabaseError from "./SupabaseError";

export const useSupabaseOperation = <T extends (...args: any[]) => any>(fn: T) => {
  const [error, setError] = useState<SupabaseError | null>();
  const [data, setData] = useState<ReturnType<T> | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  return {
    async run(...args: Parameters<T>): Promise<ReturnType<T>> {
      try {
        setError(null);
        setIsLoading(true);
        const data = await fn(...args);
        setIsLoading(false);
        setData(data);
        return data;
      } catch (e) {
        if (e instanceof SupabaseError) {
          setError(e);
        } else {
          setError(new SupabaseError("Unknown error"));
        }
        throw e;
      }
    },
    data,
    error,
    isLoading,
    isError: Boolean(error),
    reset() {
      setError(null);
      setIsLoading(false);
    },
  };
};
