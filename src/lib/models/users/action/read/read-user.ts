"use server";

import { db } from "../../../db";
import type { ReadUser } from "../../type";

export const readUser = async (userId: string): Promise<ReadUser | null> => {
  const user = await db
    .selectFrom("User")
    .select(["id", "name", "icon", "isDefaultUser"])
    .where("id", "=", userId)
    .executeTakeFirst();

  return user || null;
};
