import type { User } from "../types";
import { TS } from "../kysely-utils";

// ReadData
export type ReadUser = Pick<TS<User>, "id" | "name" | "icon" | "isDefaultUser">;

// CreateData
export type CreateUser = Pick<
  TS<User>,
  "id" | "cognitoUserId" | "name" | "icon" | "isDefaultUser"
>;

// UpdateData
export type UpdateUser = Pick<TS<User>, "name" | "icon" | "updatedAt">;
