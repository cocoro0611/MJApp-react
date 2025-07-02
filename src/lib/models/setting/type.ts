import type { Setting } from "../types";
import { TS } from "../kysely-utils";

// CreateData
export type CreateDefaultRoom = Omit<
  TS<Setting>,
  "primaryColor" | "secondaryColor" | "createdAt" | "updatedAt"
>;

export type CreateColor = Omit<
  TS<Setting>,
  | "defaultInitialPoint"
  | "defaultReturnPoint"
  | "defaultBonusPoint"
  | "defaultScoreRate"
  | "defaultChipRate"
  | "createdAt"
  | "updatedAt"
>;

// UpdateData
export type UpdateDefaultRoom = Omit<
  TS<Setting>,
  "id" | "primaryColor" | "secondaryColor" | "createdAt"
>;

export type UpdateColor = Omit<
  TS<Setting>,
  | "id"
  | "defaultInitialPoint"
  | "defaultReturnPoint"
  | "defaultBonusPoint"
  | "defaultScoreRate"
  | "defaultChipRate"
  | "createdAt"
>;
