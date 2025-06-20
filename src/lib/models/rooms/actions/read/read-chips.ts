"use server";

import { db } from "../../../db";
import type { ReadChip } from "../../type";

export const readChips = async (roomId: string): Promise<ReadChip[]> => {
  const chips: ReadChip[] = [];

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

    chips.push({
      gameCount: game.gameCount,
      chips: gameChips,
    });
  }

  return chips;
};
