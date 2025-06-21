"use server";

import { db } from "../../../db";
import type { ReadChip } from "../../type";

export const readChips = async (roomId: string): Promise<ReadChip[]> => {
  const allChips = await db
    .selectFrom("Chip")
    .innerJoin("RoomUser", (join) =>
      join
        .onRef("Chip.userId", "=", "RoomUser.userId")
        .onRef("Chip.roomId", "=", "RoomUser.roomId"),
    )
    .select(["Chip.gameCount", "Chip.chip"])
    .where("Chip.roomId", "=", roomId)
    .orderBy("Chip.gameCount", "asc")
    .orderBy("RoomUser.position", "asc")
    .execute();

  const chips: ReadChip[] = [];

  for (const chipData of allChips) {
    // そのゲーム回数が既にあるか探す
    let gameChip = chips.find((c) => c.gameCount === chipData.gameCount);

    // なければ新しく作る
    if (!gameChip) {
      gameChip = {
        gameCount: chipData.gameCount,
        chips: [],
      };
      chips.push(gameChip);
    }

    // チップを追加
    gameChip.chips.push({
      chip: chipData.chip,
    });
  }

  return chips;
};
