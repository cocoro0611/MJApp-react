"use server";

import { db } from "../../../db";
import type { ReadUser } from "../../type";

export const readUsers = async (): Promise<ReadUser[]> => {
  const users = await db
    .selectFrom("User")
    .select(["id", "name", "icon", "isDefaultUser"])
    .orderBy("createdAt", "asc")
    .execute();

  return users;
};
