"use server";

import { db } from "../../../db";
import type { ReadRoomData } from "../../type";

export const readRoom = async (
  roomId: string
): Promise<ReadRoomData | null> => {
  const room = await db
    .selectFrom("Room")
    .select([
      "id",
      "name",
      "initialPoint",
      "returnPoint",
      "bonusPoint",
      "scoreRate",
      "chipRate",
      "gameAmount",
    ])
    .where("id", "=", roomId)
    .executeTakeFirst();

  return room || null;
};
