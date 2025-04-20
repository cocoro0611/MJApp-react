"use server";

import { db } from "../db";
import type { UserData } from "./type";
import { unstable_noStore } from "next/cache";

export const readUsers = async (): Promise<UserData[]> => {
  unstable_noStore();

  const users = await db
    .selectFrom("User")
    .select(["id", "name", "createdAt"])
    .execute();

  return users;
};
