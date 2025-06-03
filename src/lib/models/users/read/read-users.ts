"use server";

import { db } from "../../db";
import type { ReadUserData } from "../type";

export const readUsers = async (): Promise<ReadUserData[]> => {
  const users = await db
    .selectFrom("User")
    .select(["id", "name", "icon", "isDefaultUser"])
    .orderBy("createdAt", "asc")
    .execute();

  return users;
};
