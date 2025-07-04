import type { Setting } from "../types";
import { TS } from "../kysely-utils";

// CreateData
export type CreateDefaultRoom = Pick<
  TS<Setting>,
  | "id"
  | "defaultInitialPoint"
  | "defaultReturnPoint"
  | "defaultBonusPoint"
  | "defaultScoreRate"
  | "defaultChipRate"
>;

export type CreateColor = Pick<
  TS<Setting>,
  "id" | "primaryColor" | "secondaryColor"
>;

// UpdateData
export type UpdateDefaultRoom = Pick<
  TS<Setting>,
  | "defaultInitialPoint"
  | "defaultReturnPoint"
  | "defaultBonusPoint"
  | "defaultScoreRate"
  | "defaultChipRate"
  | "updatedAt"
>;

export type UpdateColor = Pick<
  TS<Setting>,
  "primaryColor" | "secondaryColor" | "updatedAt"
>;
