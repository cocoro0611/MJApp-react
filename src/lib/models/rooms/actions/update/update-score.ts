"use server";

import { db } from "../../../db";
import { redirect } from "next/navigation";
import { TOAST_TIME } from "@/src/constants/toastTime";
import { calculateBonusPoints } from "@/src/utils/score-result";

export const updateScore = async (data: FormData) => {
  const roomId = String(data.get("roomId"));
  const gameCount = Number(data.get("gameCount"));

  // 各プレイヤーのスコアを取得し、整数に変換
  const player0Score = Math.round(Number(data.get("score-0")));
  const player1Score = Math.round(Number(data.get("score-1")));
  const player2Score = Math.round(Number(data.get("score-2")));
  const player3Score = Math.round(Number(data.get("score-3")));

  const scores = [player0Score, player1Score, player2Score, player3Score];

  // デバッグ用ログ（本番では削除）
  console.log("Received scores:", {
    player0Score,
    player1Score,
    player2Score,
    player3Score,
    scores,
  });

  // Room設定を取得
  const room = await db
    .selectFrom("Room")
    .selectAll()
    .where("id", "=", roomId)
    .executeTakeFirst();

  if (!room) {
    throw new Error("Room not found");
  }

  // ボーナスポイントを計算
  const bonusPoints = calculateBonusPoints(
    room.initialPoint,
    room.returnPoint,
    room.bonusPoint
  );

  // RoomUserを取得
  const roomUsers = await db
    .selectFrom("RoomUser")
    .select(["userId", "position"])
    .where("roomId", "=", roomId)
    .orderBy("position", "asc")
    .execute();

  await db.transaction().execute(async (trx) => {
    for (let i = 0; i < roomUsers.length; i++) {
      const user = roomUsers[i];
      const score = scores[i];

      // scoreが整数であることを確認
      if (!Number.isInteger(score)) {
        throw new Error(`Score must be an integer, got: ${score}`);
      }

      // scoreResultを計算
      const rawScore = (score - room.returnPoint) / 1000;
      const bonus = bonusPoints[i] || 0;
      const scoreResult = Math.round(rawScore + bonus); // scoreResultも整数化

      console.log(`Player ${i}: score=${score}, scoreResult=${scoreResult}`); // デバッグ用

      await trx
        .updateTable("Score")
        .set({
          score,
          scoreResult,
          updatedAt: new Date(),
        })
        .where("roomId", "=", roomId)
        .where("userId", "=", user.userId)
        .where("gameCount", "=", gameCount)
        .execute();
    }
  });

  await new Promise((resolve) => setTimeout(resolve, TOAST_TIME));
  redirect(`/rooms/${roomId}`);
};
