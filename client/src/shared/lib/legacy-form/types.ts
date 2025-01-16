export type Field<TValue> = {
  value: TValue;
  validationErrors: string[];
  additionalErrors: string[];
  isTouched: boolean;
};

export type Fields = {
  [key: string]: Field<unknown>;
};
