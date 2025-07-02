import type { Setting } from "../types";
import { TS } from "../kysely-utils";

// ReadData
export type ReadDefaultRoom = Pick<
  TS<Setting>,
  | "defaultInitialPoint"
  | "defaultReturnPoint"
  | "defaultBonusPoint"
  | "defaultScoreRate"
  | "defaultChipRate"
>;

export type ReadColor = Pick<TS<Setting>, "primaryColor" | "secondaryColor">;

// CreateData
export type CreateDefaultRoom = Omit<
  TS<Setting>,
  "primaryColor" | "secondaryColor" | "createdAt" | "updatedAt"
>;

// UpdateData
export type UpdateDefaultRoom = Omit<
  TS<Setting>,
  "id" | "primaryColor" | "secondaryColor" | "createdAt"
>;
