"use server";

import { db } from "../../db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import type { ReadDefaultRoom } from "../type";

export const readSetting = async (): Promise<ReadDefaultRoom> => {
  const session = await getServerSession(authOptions);

  // 認証チェック
  if (!session?.user?.id) {
    throw new Error("認証が必要です");
  }

  const setting = await db
    .selectFrom("Setting")
    .select([
      "id",
      "defaultInitialPoint",
      "defaultReturnPoint",
      "defaultBonusPoint",
      "defaultScoreRate",
      "defaultChipRate",
      "primaryColor",
      "secondaryColor",
      "isShowPoint",
    ])
    .where("cognitoUserId", "=", session.user.id)
    .executeTakeFirst();

  // Settingが存在しない場合の最小限のオブジェクト
  if (!setting) {
    return { id: "" };
  }

  return setting;
};
