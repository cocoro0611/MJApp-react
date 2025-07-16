"use server";

import { db } from "../../../db";
import { requireAuth } from "../../../utils/auth-cognito";
import { isUUID } from "@/src/utils/uuid-check";
import { notFound } from "next/navigation";
import type { ReadUser } from "../../type";

export const readUser = async (userId: string): Promise<ReadUser> => {
  const cognitoUserId = await requireAuth();

  if (!isUUID(userId)) {
    notFound();
  }

  const user = await db
    .selectFrom("User")
    .select(["id", "name", "icon", "isDefaultUser"])
    .where("cognitoUserId", "=", cognitoUserId)
    .where("id", "=", userId)
    .executeTakeFirst();

  if (!user) {
    throw new Error("ユーザーが見つかりません");
  }

  return user;
};
