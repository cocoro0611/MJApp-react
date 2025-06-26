"use server";

import { db } from "../../../db";
import type { ReadUser } from "../../type";
import { isUUID } from "@/src/utils/uuid-check";
import { notFound } from "next/navigation";

export const readUser = async (userId: string): Promise<ReadUser> => {
  if (!isUUID(userId)) {
    notFound();
  }

  const user = await db
    .selectFrom("User")
    .select(["id", "name", "icon", "isDefaultUser"])
    .where("id", "=", userId)
    .executeTakeFirst();

  if (!user) {
    throw new Error("ユーザーが見つかりません");
  }

  return user;
};
