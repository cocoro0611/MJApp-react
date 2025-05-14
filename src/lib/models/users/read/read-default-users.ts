"use server";

import { db } from "../../db";
import type { ReadUserData } from "../type";

export const readDefaultUsers = async (): Promise<ReadUserData[]> => {
  const defaultUsers = await db
    .selectFrom("User")
    .select(["id", "name", "icon"])
    .where("defaultSelected", "=", true)
    .orderBy("createdAt", "asc")
    .execute();

  return defaultUsers;
};
