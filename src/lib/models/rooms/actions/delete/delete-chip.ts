"use server";

import { revalidateAll } from "../../../revalidate-wrapper";
import { db } from "../../../db";

export const deleteChip = async (data: FormData) => {
  const roomId = String(data.get("roomId"));
  const gameCount = Number(data.get("gameCount"));

  try {
    await db.transaction().execute(async (trx) => {
      // 1. 指定されたgameCountのチップを削除
      await trx
        .deleteFrom("Chip")
        .where("roomId", "=", roomId)
        .where("gameCount", "=", gameCount)
        .execute();

      // 2. 削除されたgameCountより大きいものを取得
      const chipsToUpdate = await trx
        .selectFrom("Chip")
        .select(["userId", "gameCount"])
        .where("roomId", "=", roomId)
        .where("gameCount", ">", gameCount)
        .orderBy("gameCount", "asc")
        .execute();

      // 3. gameCountを1つずつ減らして更新
      for (const chip of chipsToUpdate) {
        await trx
          .updateTable("Chip")
          .set({ gameCount: chip.gameCount - 1 })
          .where("roomId", "=", roomId)
          .where("userId", "=", chip.userId)
          .where("gameCount", "=", chip.gameCount)
          .execute();
      }
    });

    await revalidateAll();

    return {
      success: true,
      message: "チップが削除されました",
      redirect: `/rooms/${roomId}`,
    };
  } catch (_error) {
    return {
      success: false,
      message: "チップの削除に失敗しました",
      redirect: `/rooms/${roomId}`,
    };
  }
};
