"use server";

import { db } from "../../db";

export const readSetting = async () => {
  const setting = await db
    .selectFrom("Setting")
    .select([
      "defaultInitialPoint",
      "defaultReturnPoint",
      "defaultBonusPoint",
      "defaultScoreRate",
      "defaultChipRate",
      "primaryColor",
      "secondaryColor",
    ])
    .executeTakeFirst();

  return setting;
};
