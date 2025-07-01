import type { Setting } from "../types";
import { TS } from "../kysely-utils";

// ReadData
export type ReadSetting = Omit<TS<Setting>, "id" | "createdAt" | "updatedAt">;

// CreateData
export type CreateSetting = Omit<TS<Setting>, "createdAt" | "updatedAt">;

// UpdateData
export type UpdateSetting = Omit<TS<Setting>, "id" | "createdAt">;
