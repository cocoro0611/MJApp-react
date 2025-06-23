"use server";

import { db } from "../../../db";
import { redirect } from "next/navigation";
import { TOAST_TIME } from "@/src/constants/toastTime";
import { calculateBonusPoints } from "@/src/utils/score-result";

export const updateScore = async (data: FormData) => {
  const roomId = String(data.get("roomId"));
  const gameCount = Number(data.get("gameCount"));

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
    .select(["userId", "position"])
    .where("roomId", "=", roomId)
    .orderBy("position", "asc")
    .execute();

  await db.transaction().execute(async (trx) => {
    // 1. スコアを更新
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

    // 2. スコアを取得してorder設定
    const gameScores = await trx
      .selectFrom("Score")
      .select(["userId", "score"])
      .where("roomId", "=", roomId)
      .where("gameCount", "=", gameCount)
      .orderBy("score", "desc") // スコア高い順
      .execute();

    // 3. order（順位）を設定
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

    // 4. ボーナスポイントを計算
    const bonusPoints = calculateBonusPoints(
      room.initialPoint,
      room.returnPoint,
      room.bonusPoint
    );

    // 5. scoreResultを計算して更新
    const updatedScores = await trx
      .selectFrom("Score")
      .select(["userId", "score", "order"])
      .where("roomId", "=", roomId)
      .where("gameCount", "=", gameCount)
      .execute();

    for (const scoreData of updatedScores) {
      const rawScore = (scoreData.score - room.returnPoint) / 1000;
      const bonus = bonusPoints[scoreData.order - 1] || 0; // order 1 → index 0
      const scoreResult = Math.round(rawScore + bonus);

      await trx
        .updateTable("Score")
        .set({ scoreResult })
        .where("roomId", "=", roomId)
        .where("userId", "=", scoreData.userId)
        .where("gameCount", "=", gameCount)
        .execute();
    }
  });

  await new Promise((resolve) => setTimeout(resolve, TOAST_TIME));
  redirect(`/rooms/${roomId}`);
};
