"use server";

import { db } from "../db";
import type { UserData } from "./type";

export const readUsers = async (): Promise<UserData[]> => {
  const users = await db
    .selectFrom("User")
    .select(["id", "name", "createdAt"])
    .execute();

  return users;
};
