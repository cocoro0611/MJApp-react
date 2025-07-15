"use server";

import { db } from "../../../db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import type { ReadUser } from "../../type";

export const readDefaultUsers = async (): Promise<ReadUser[]> => {
  const session = await getServerSession(authOptions);

  // 認証チェック
  if (!session?.user?.id) {
    throw new Error("認証が必要です");
  }

  const defaultUsers = await db
    .selectFrom("User")
    .select(["id", "name", "icon", "isDefaultUser"])
    .where("cognitoUserId", "=", session.user.id)
    .where("isDefaultUser", "=", true)
    .orderBy("createdAt", "asc")
    .execute();

  return defaultUsers;
};
