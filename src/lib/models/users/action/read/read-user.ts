"use server";

import { db } from "../../../db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import type { ReadUser } from "../../type";
import { isUUID } from "@/src/utils/uuid-check";
import { notFound } from "next/navigation";

export const readUser = async (userId: string): Promise<ReadUser> => {
  const session = await getServerSession(authOptions);

  // 認証チェック
  if (!session?.user?.id) {
    throw new Error("認証が必要です");
  }

  if (!isUUID(userId)) {
    notFound();
  }

  const user = await db
    .selectFrom("User")
    .select(["id", "name", "icon", "isDefaultUser"])
    .where("cognitoUserId", "=", session.user.id)
    .where("id", "=", userId)
    .executeTakeFirst();

  if (!user) {
    throw new Error("ユーザーが見つかりません");
  }

  return user;
};
