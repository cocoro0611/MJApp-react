"use server";

import { db } from "../../../db";

export const updateChip = async (data: FormData) => {
  const roomId = String(data.get("roomId"));
  const gameCount = Number(data.get("gameCount"));

  try {
    const player0Chip = Number(data.get("chip-0"));
    const player1Chip = Number(data.get("chip-1"));
    const player2Chip = Number(data.get("chip-2"));
    const player3Chip = Number(data.get("chip-3"));

    const chips = [player0Chip, player1Chip, player2Chip, player3Chip];

    const room = await db
      .selectFrom("Room")
      .selectAll()
      .where("id", "=", roomId)
      .executeTakeFirst();

    if (!room) {
      throw new Error("Room not found");
    }

    const roomUsers = await db
      .selectFrom("RoomUser")
      .select(["userId"])
      .where("roomId", "=", roomId)
      .orderBy("position", "asc")
      .execute();

    await db.transaction().execute(async (trx) => {
      // 1. chipを更新
      for (let i = 0; i < roomUsers.length; i++) {
        const user = roomUsers[i];
        const chip = chips[i];

        await trx
          .updateTable("Chip")
          .set({ chip, updatedAt: new Date() })
          .where("roomId", "=", roomId)
          .where("userId", "=", user.userId)
          .where("gameCount", "=", gameCount)
          .execute();
      }
    });

    return {
      success: true,
      message: "チップが更新されました",
      redirect: `/rooms/${roomId}`,
    };
  } catch (_error) {
    return {
      success: false,
      message: "チップの更新に失敗しました",
      redirect: `/rooms/${roomId}`,
    };
  }
};
