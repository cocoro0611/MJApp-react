import type { User } from "../../types";
import { TS } from "../../db-types-utils";

export type UserData = Pick<TS<User>, "id" | "name" | "createdAt">;
