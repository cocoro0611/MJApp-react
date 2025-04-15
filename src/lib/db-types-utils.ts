import type { Generated, Timestamp } from "./types";

type Cast<Type> = Type extends Generated<Timestamp> ? Date : Type;

export type TS<KyselyType extends Record<string, unknown>> = {
  [Key in keyof KyselyType]: Cast<KyselyType[Key]>;
};
