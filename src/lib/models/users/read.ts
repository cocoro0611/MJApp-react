"use server";

import { db } from "../db";
import type { UserData } from "./type";
// FIXME:ビルド画面のリード反映にはなぜかこのキャッシュのクリアが必要なので実装
import { unstable_noStore } from "next/cache";

export const readUser = async (userId: string): Promise<UserData | null> => {
  unstable_noStore();

  const user = await db
    .selectFrom("User")
    .selectAll()
    .where("id", "=", userId)
    .executeTakeFirst();

  return user || null;
};

export const readUsers = async (): Promise<UserData[]> => {
  unstable_noStore();

  const users = await db
    .selectFrom("User")
    .select(["id", "name", "icon", "defaultSelected", "createdAt", "updatedAt"])
    .orderBy("createdAt", "asc")
    .execute();

  return users;
};
