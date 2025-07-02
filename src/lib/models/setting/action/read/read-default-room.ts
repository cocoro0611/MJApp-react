"use server";

import { db } from "../../../db";
import type { ReadDefaultRoom } from "../../type";

export const readDefaultRoom = async (): Promise<
  ReadDefaultRoom | undefined
> => {
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
