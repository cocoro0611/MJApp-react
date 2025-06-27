"use server";

import { revalidateAll } from "../../../revalidate-wrapper";
import { db } from "../../../db";
import { updateScoreResults } from "./utils/update-score-results";

export const updateScore = async (data: FormData) => {
  const roomId = String(data.get("roomId"));
  const gameCount = Number(data.get("gameCount"));

  try {
    const player0Score = Number(data.get("score-0")) * 100;
    const player1Score = Number(data.get("score-1")) * 100;
    const player2Score = Number(data.get("score-2")) * 100;
    const player3Score = Number(data.get("score-3")) * 100;

    const scores = [player0Score, player1Score, player2Score, player3Score];

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

    let hasTiedScores = false;

    await db.transaction().execute(async (trx) => {
      // 1. scoreのみを更新
      for (let i = 0; i < roomUsers.length; i++) {
        const user = roomUsers[i];
        const score = scores[i];

        await trx
          .updateTable("Score")
          .set({ score, updatedAt: new Date() })
          .where("roomId", "=", roomId)
          .where("userId", "=", user.userId)
          .where("gameCount", "=", gameCount)
          .execute();
      }

      // 同点チェック
      const uniqueScores = [...new Set(scores)];
      hasTiedScores = uniqueScores.length < scores.length;

      if (!hasTiedScores) {
        // 同点がない場合は通常の処理
        const gameScores = await trx
          .selectFrom("Score")
          .select(["userId"])
          .where("roomId", "=", roomId)
          .where("gameCount", "=", gameCount)
          .orderBy("score", "desc")
          .execute();

        for (let i = 0; i < gameScores.length; i++) {
          const scoreData = gameScores[i];
          const order = i + 1;

          await trx
            .updateTable("Score")
            .set({ order })
            .where("roomId", "=", roomId)
            .where("userId", "=", scoreData.userId)
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
      }
    });
    await revalidateAll();

    // タイの有無によるリダイレクト
    if (hasTiedScores) {
      return {
        success: true,
        message: "ユーザーの順位を選択してください",
        redirect: `/rooms/${roomId}/order-edit?gameCount=${gameCount}`,
      };
    } else {
      return {
        success: true,
        message: "スコアが更新されました",
        redirect: `/rooms/${roomId}`,
      };
    }
  } catch (_error) {
    return {
      success: false,
      message: "スコアの更新に失敗しました",
      redirect: `/rooms/${roomId}`,
    };
  }
};
