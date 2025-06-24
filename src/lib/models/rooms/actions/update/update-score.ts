"use server";

import { db } from "../../../db";
import { redirect } from "next/navigation";
import { TOAST_TIME } from "@/src/constants/toastTime";
import { updateScoreResults } from "./update-score-results";

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

    // 2. 更新したscoreを取得してorderを再設定
    const gameScores = await trx
      .selectFrom("Score")
      .select(["userId", "score"])
      .where("roomId", "=", roomId)
      .where("gameCount", "=", gameCount)
      .orderBy("score", "desc") // スコア高い順
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

    // 3. scoreResultを計算して更新
    await updateScoreResults(
      trx,
      roomId,
      room.initialPoint,
      room.returnPoint,
      room.bonusPoint,
      { gameCount }
    );
  });

  // Toast通知の都合上遅延を設定
  await new Promise((resolve) => setTimeout(resolve, TOAST_TIME));
  redirect(`/rooms/${roomId}`);
};
