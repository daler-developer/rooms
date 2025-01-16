export type IsPlainObject<T> = T extends object ? (T extends Date | File | Blob | RegExp ? false : true) : false;

export type NestedPaths<T> = T extends (infer U)[]
  ? `${number}` | `${number}.${NestedPaths<U>}`
  : T extends object
  ? {
      [K in keyof T & (string | number)]: IsPlainObject<T[K]> extends true ? `${K}` | `${K}.${NestedPaths<T[K]>}` : `${K}`;
    }[keyof T & (string | number)]
  : "";

export type PathValue<T, P extends string> = P extends `${infer K}.${infer Rest}`
  ? K extends `${number}`
    ? T extends Array<infer U>
      ? PathValue<U, Rest>
      : never
    : K extends keyof T
    ? PathValue<T[K], Rest>
    : never
  : P extends `${number}`
  ? T extends Array<infer U>
    ? U
    : never
  : P extends keyof T
  ? T[P]
  : never;
