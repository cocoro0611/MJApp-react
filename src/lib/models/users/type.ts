import type { User } from "../types";
import { TS } from "../kysely-utils";

// ReadData
export type ReadUser = Pick<TS<User>, "id" | "name" | "icon" | "isDefaultUser">;

// CreateData
export type CreateUser = Omit<TS<User>, "createdAt" | "updatedAt">;

// UpdateData
export type UpdateUser = Omit<TS<User>, "id" | "isDefaultUser" | "createdAt">;
