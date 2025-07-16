"use server";

import { db } from "../../db";
import { requireAuth } from "../../utils/auth-cognito";
import type { ReadDefaultRoom } from "../type";

export const readSetting = async (): Promise<ReadDefaultRoom> => {
  const cognitoUserId = await requireAuth();

  const setting = await db
    .selectFrom("Setting")
    .selectAll()
    .where("cognitoUserId", "=", cognitoUserId)
    .executeTakeFirst();

  // デフォルト値
  if (!setting) {
    return {
      defaultInitialPoint: 25000,
      defaultReturnPoint: 30000,
      defaultBonusPoint: "10-30",
      defaultScoreRate: 50,
      defaultChipRate: 200,
      primaryColor: "blue",
      secondaryColor: "orange",
      isShowPoint: true,
    };
  }

  return setting;
};
