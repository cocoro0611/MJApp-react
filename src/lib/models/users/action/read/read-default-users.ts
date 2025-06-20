"use server";

import { db } from "../../../db";
import type { ReadUser } from "../../type";

export const readDefaultUsers = async (): Promise<ReadUser[]> => {
  const defaultUsers = await db
    .selectFrom("User")
    .select(["id", "name", "icon", "isDefaultUser"])
    .where("isDefaultUser", "=", true)
    .orderBy("createdAt", "asc")
    .execute();

  return defaultUsers;
};
