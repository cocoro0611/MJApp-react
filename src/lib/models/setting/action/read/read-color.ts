"use server";

import { db } from "../../../db";
import type { ReadColor } from "../../type";

export const readColor = async (): Promise<ReadColor | undefined> => {
  const color = await db
    .selectFrom("Setting")
    .select(["primaryColor", "secondaryColor"])
    .executeTakeFirst();

  return color;
};
