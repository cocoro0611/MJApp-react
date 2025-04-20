"use server";

import { db } from "../db";
import type { UserData } from "./type";
import { unstable_noStore } from "next/cache";

export const readUser = async (userId: string): Promise<UserData | null> => {
  try {
    const user = await db
      .selectFrom("User")
      .selectAll()
      .where("id", "=", userId)
      .executeTakeFirst();

    return user || null;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};

export const readUsers = async (): Promise<UserData[]> => {
  unstable_noStore();

  const users = await db
    .selectFrom("User")
    .select(["id", "name", "createdAt"])
    .execute();

  return users;
};
