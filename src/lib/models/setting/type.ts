import type { Setting } from "../types";
import { TS } from "../kysely-utils";

// ReadData
export type ReadDefaultRoom = Partial<TS<Setting>>;

// CreateData
export type CreateDefaultRoom = Pick<
  TS<Setting>,
  | "id"
  | "cognitoUserId"
  | "defaultInitialPoint"
  | "defaultReturnPoint"
  | "defaultBonusPoint"
  | "defaultScoreRate"
  | "defaultChipRate"
>;

export type CreateColor = Pick<
  TS<Setting>,
  "id" | "cognitoUserId" | "primaryColor" | "secondaryColor"
>;

export type CreateShowPoint = Pick<
  TS<Setting>,
  "id" | "cognitoUserId" | "isShowPoint"
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

export type UpdateShowPoint = Pick<TS<Setting>, "isShowPoint" | "updatedAt">;
