"use server";

import { db } from "../../../db";
import type { ReadSetting } from "../../type";

export const readSetting = async (): Promise<ReadSetting | undefined> => {
  const setting = await db
    .selectFrom("Setting")
    .select([
      "defaultInitialPoint",
      "defaultReturnPoint",
      "defaultBonusPoint",
      "defaultScoreRate",
      "defaultChipRate",
    ])
    .executeTakeFirst();

  return setting;
};
