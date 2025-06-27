"use server";

import { db } from "../../../db";
import { updateScoreResults } from "./utils/update-score-results";

export const updateScoreOrder = async (data: FormData) => {
  const roomId = String(data.get("roomId"));
  const gameCount = Number(data.get("gameCount"));

  try {
    const room = await db
      .selectFrom("Room")
      .selectAll()
      .where("id", "=", roomId)
      .executeTakeFirst();

    if (!room) {
      throw new Error("Room not found");
    }

    await db.transaction().execute(async (trx) => {
      // フォームデータから順位情報を取得
      const formEntries = Array.from(data.entries());
      const orderEntries = formEntries.filter(([key]) =>
        key.startsWith("order-")
      );

      for (const [key, value] of orderEntries) {
        const userId = key.replace("order-", "");
        const order = Number(value);

        await trx
          .updateTable("Score")
          .set({ order })
          .where("roomId", "=", roomId)
          .where("userId", "=", userId)
          .where("gameCount", "=", gameCount)
          .execute();
      }

      // scoreResultを計算して更新
      await updateScoreResults(
        trx,
        roomId,
        room.initialPoint,
        room.returnPoint,
        room.bonusPoint,
        { gameCount }
      );
    });

    return {
      success: true,
      message: "スコアが更新されました",
      redirect: `/rooms/${roomId}`,
    };
  } catch (error) {
    return {
      success: false,
      message: "スコアの更新に失敗しました",
      redirect: `/rooms/${roomId}`,
    };
  }
};
