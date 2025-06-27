"use server";

import { db } from "../../../db";

export const deleteScore = async (data: FormData) => {
  const roomId = String(data.get("roomId"));
  const gameCount = Number(data.get("gameCount"));

  try {
    await db.transaction().execute(async (trx) => {
      // 1. 指定されたgameCountのスコアを削除
      await trx
        .deleteFrom("Score")
        .where("roomId", "=", roomId)
        .where("gameCount", "=", gameCount)
        .execute();

      // 2. 削除されたgameCountより大きいものを取得
      const scoresToUpdate = await trx
        .selectFrom("Score")
        .select(["userId", "gameCount"])
        .where("roomId", "=", roomId)
        .where("gameCount", ">", gameCount)
        .orderBy("gameCount", "asc")
        .execute();

      // 3. gameCountを1つずつ減らして更新
      for (const score of scoresToUpdate) {
        await trx
          .updateTable("Score")
          .set({ gameCount: score.gameCount - 1 })
          .where("roomId", "=", roomId)
          .where("userId", "=", score.userId)
          .where("gameCount", "=", score.gameCount)
          .execute();
      }
    });

    return {
      success: true,
      message: "スコアが削除されました",
      redirect: `/rooms/${roomId}`,
    };
  } catch (error) {
    return {
      success: false,
      message: "スコアの削除に失敗しました",
      redirect: `/rooms/${roomId}`,
    };
  }
};
