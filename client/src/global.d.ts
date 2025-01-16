type Flatten<T> = T extends (infer U)[] ? Flatten<U> : T;

type ItemType<T> = T extends (infer U)[] ? U : never;
