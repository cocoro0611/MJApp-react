"use server";

import { db } from "../../db";
import type { ReadChipData } from "../type";

export const readChips = async (roomId: string): Promise<ReadChipData[]> => {
  const chipsData: ReadChipData[] = [];

  const gameCounts = await db
    .selectFrom("Chip")
    .select("gameCount")
    .where("roomId", "=", roomId)
    .groupBy("gameCount")
    .orderBy("gameCount", "asc")
    .execute();

  for (const game of gameCounts) {
    const gameChips = await db
      .selectFrom("Chip")
      .innerJoin("RoomUser", (join) =>
        join
          .onRef("Chip.userId", "=", "RoomUser.userId")
          .onRef("Chip.roomId", "=", "RoomUser.roomId")
      )
      .select(["RoomUser.position", "Chip.chip"])
      .where("Chip.roomId", "=", roomId)
      .where("Chip.gameCount", "=", game.gameCount)
      .orderBy("RoomUser.position", "asc")
      .execute();

    chipsData.push({
      gameCount: game.gameCount,
      chips: gameChips,
    });
  }

  return chipsData;
};
