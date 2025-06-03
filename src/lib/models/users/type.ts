import type { User } from "../types";
import { TS } from "../types-utils";

export type UserData = Pick<
  TS<User>,
  "id" | "name" | "icon" | "isDefaultUser" | "createdAt" | "updatedAt"
>;

export type ReadUserData = Pick<
  UserData,
  "id" | "name" | "icon" | "isDefaultUser"
>;
